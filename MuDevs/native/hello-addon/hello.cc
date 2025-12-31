#include <napi.h>

Napi::String ping(const Napi::CallbackInfo& info) {
  return Napi::String::New(info.Env(), "pong");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("ping", Napi::Function::New(env, ping));
  return exports;
}

NODE_API_MODULE(helloaddon, Init)
