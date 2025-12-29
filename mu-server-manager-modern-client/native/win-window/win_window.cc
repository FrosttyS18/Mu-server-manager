\
  #include <napi.h>
  #include <windows.h>

  struct FindWindowData {
    DWORD pid;
    HWND hwnd;
  };

  static BOOL CALLBACK EnumWindowsProc(HWND hwnd, LPARAM lParam) {
    FindWindowData* data = reinterpret_cast<FindWindowData*>(lParam);

    DWORD windowPid = 0;
    GetWindowThreadProcessId(hwnd, &windowPid);
    if (windowPid != data->pid) return TRUE;

    // skip owned/child windows (try to get the "main" top-level window)
    if (GetWindow(hwnd, GW_OWNER) != NULL) return TRUE;

    // A lot of MU servers create a visible main window; we try visible first,
    // but allow hidden windows too (so we can show them later).
    // Still skip tool windows.
    LONG exStyle = GetWindowLong(hwnd, GWL_EXSTYLE);
    if (exStyle & WS_EX_TOOLWINDOW) return TRUE;

    // If it has no title and not visible, it might be a helper window.
    int titleLen = GetWindowTextLengthW(hwnd);
    BOOL isVisible = IsWindowVisible(hwnd);

    if (!isVisible && titleLen == 0) return TRUE;

    data->hwnd = hwnd;
    return FALSE; // stop enumeration (found)
  }

  static HWND FindMainWindowByPid(DWORD pid) {
    FindWindowData data;
    data.pid = pid;
    data.hwnd = NULL;
    EnumWindows(EnumWindowsProc, reinterpret_cast<LPARAM>(&data));
    return data.hwnd;
  }

  static bool SetVisibleByPid(DWORD pid, bool visible, DWORD timeoutMs) {
    const DWORD start = GetTickCount();
    HWND hwnd = NULL;

    // wait for the process to create a main window
    while (!hwnd) {
      hwnd = FindMainWindowByPid(pid);
      if (hwnd) break;

      if (timeoutMs == 0) break;
      DWORD now = GetTickCount();
      if ((now - start) >= timeoutMs) break;

      Sleep(120);
    }

    if (!hwnd) return false;

    int cmd = visible ? SW_SHOW : SW_HIDE;
    // Use ShowWindowAsync to avoid blocking if the target is busy.
    ShowWindowAsync(hwnd, cmd);
    if (visible) {
      SetForegroundWindow(hwnd);
    }
    return true;
  }

  class SetVisibleWorker : public Napi::AsyncWorker {
   public:
    SetVisibleWorker(Napi::Env env, DWORD pid, bool visible, DWORD timeoutMs, Napi::Promise::Deferred deferred)
        : Napi::AsyncWorker(env), pid_(pid), visible_(visible), timeoutMs_(timeoutMs), deferred_(deferred) {}

    void Execute() override {
      ok_ = SetVisibleByPid(pid_, visible_, timeoutMs_);
    }

    void OnOK() override {
      deferred_.Resolve(Napi::Boolean::New(Env(), ok_));
    }

    void OnError(const Napi::Error& e) override {
      deferred_.Reject(e.Value());
    }

   private:
    DWORD pid_;
    bool visible_;
    DWORD timeoutMs_;
    bool ok_{false};
    Napi::Promise::Deferred deferred_;
  };

  // setWindowVisibleByPid(pid:number, visible:boolean, timeoutMs?:number) => Promise<boolean>
  Napi::Value SetWindowVisibleByPidWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsBoolean()) {
      Napi::TypeError::New(env, "Expected (pid:number, visible:boolean, timeoutMs?:number)").ThrowAsJavaScriptException();
      return env.Null();
    }

    const DWORD pid = static_cast<DWORD>(info[0].As<Napi::Number>().Uint32Value());
    const bool visible = info[1].As<Napi::Boolean>().Value();
    DWORD timeoutMs = 3000;
    if (info.Length() >= 3 && info[2].IsNumber()) {
      timeoutMs = static_cast<DWORD>(info[2].As<Napi::Number>().Uint32Value());
    }

    auto deferred = Napi::Promise::Deferred::New(env);
    auto* worker = new SetVisibleWorker(env, pid, visible, timeoutMs, deferred);
    worker->Queue();
    return deferred.Promise();
  }

  // ===========================
  // AUTO CLICK OK BUTTON
  // ===========================

  struct FindOKButtonData {
    HWND okButton;
  };

  static BOOL CALLBACK EnumChildWindowsProc(HWND hwnd, LPARAM lParam) {
    FindOKButtonData* data = reinterpret_cast<FindOKButtonData*>(lParam);

    // Pega o texto do botão
    wchar_t text[256];
    GetWindowTextW(hwnd, text, sizeof(text) / sizeof(wchar_t));

    // Verifica se o texto é "OK" (case insensitive)
    if (_wcsicmp(text, L"OK") == 0) {
      data->okButton = hwnd;
      return FALSE; // Para a enumeração (encontrou)
    }

    return TRUE; // Continua procurando
  }

  static bool AutoClickOKByPid(DWORD pid, DWORD timeoutMs, DWORD retries) {
    const DWORD start = GetTickCount();
    HWND hwnd = NULL;

    // Aguarda a janela principal aparecer
    while (!hwnd) {
      hwnd = FindMainWindowByPid(pid);
      if (hwnd) break;

      if (timeoutMs == 0) break;
      DWORD now = GetTickCount();
      if ((now - start) >= timeoutMs) break;

      Sleep(100);
    }

    if (!hwnd) return false;

    // Tenta encontrar e clicar no botão OK (com retries)
    for (DWORD attempt = 0; attempt < retries; attempt++) {
      FindOKButtonData data;
      data.okButton = NULL;

      // Enumera janelas filhas para encontrar botão "OK"
      EnumChildWindows(hwnd, EnumChildWindowsProc, reinterpret_cast<LPARAM>(&data));

      if (data.okButton) {
        // Envia mensagem de clique no botão
        SendMessage(data.okButton, BM_CLICK, 0, 0);
        return true;
      }

      // Se não encontrou, aguarda um pouco e tenta novamente
      if (attempt < retries - 1) {
        Sleep(200);
      }
    }

    return false; // Não encontrou o botão OK após todas as tentativas
  }

  class AutoClickOKWorker : public Napi::AsyncWorker {
   public:
    AutoClickOKWorker(Napi::Env env, DWORD pid, DWORD timeoutMs, DWORD retries, Napi::Promise::Deferred deferred)
        : Napi::AsyncWorker(env), pid_(pid), timeoutMs_(timeoutMs), retries_(retries), deferred_(deferred) {}

    void Execute() override {
      ok_ = AutoClickOKByPid(pid_, timeoutMs_, retries_);
    }

    void OnOK() override {
      deferred_.Resolve(Napi::Boolean::New(Env(), ok_));
    }

    void OnError(const Napi::Error& e) override {
      deferred_.Reject(e.Value());
    }

   private:
    DWORD pid_;
    DWORD timeoutMs_;
    DWORD retries_;
    bool ok_{false};
    Napi::Promise::Deferred deferred_;
  };

  // autoClickOK(pid:number, timeoutMs?:number, retries?:number) => Promise<boolean>
  Napi::Value AutoClickOKWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsNumber()) {
      Napi::TypeError::New(env, "Expected (pid:number, timeoutMs?:number, retries?:number)").ThrowAsJavaScriptException();
      return env.Null();
    }

    const DWORD pid = static_cast<DWORD>(info[0].As<Napi::Number>().Uint32Value());
    DWORD timeoutMs = 2000; // 2 segundos padrão
    DWORD retries = 5; // 5 tentativas padrão

    if (info.Length() >= 2 && info[1].IsNumber()) {
      timeoutMs = static_cast<DWORD>(info[1].As<Napi::Number>().Uint32Value());
    }
    if (info.Length() >= 3 && info[2].IsNumber()) {
      retries = static_cast<DWORD>(info[2].As<Napi::Number>().Uint32Value());
    }

    auto deferred = Napi::Promise::Deferred::New(env);
    auto* worker = new AutoClickOKWorker(env, pid, timeoutMs, retries, deferred);
    worker->Queue();
    return deferred.Promise();
  }

  Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("setWindowVisibleByPid", Napi::Function::New(env, SetWindowVisibleByPidWrapped));
    exports.Set("autoClickOK", Napi::Function::New(env, AutoClickOKWrapped));
    return exports;
  }

  NODE_API_MODULE(win_window, Init)
