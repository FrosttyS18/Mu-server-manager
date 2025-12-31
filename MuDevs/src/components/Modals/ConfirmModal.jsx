import React from 'react';

export function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText,
  tone = "danger",
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center px-6">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onCancel}
        className="absolute inset-0 bg-black/65"
      />

      {/* modal */}
      <div className="relative w-full max-w-[420px] rounded-[22px] bg-[#111111] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.70)] p-6 sm-glass-card">
        {/* Header com ícone e textos alinhados à esquerda */}
        <div className="flex items-center gap-2">
          {/* Ícone de alerta */}
          <svg 
            className="flex-shrink-0 w-10 h-10 text-[#0056B9]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>

          {/* Textos */}
          <div className="flex-1">
            <div className="text-[16px] font-semibold text-white">{title}</div>
            <div className="mt-1 text-[13px] text-white/70 leading-relaxed">
              {message}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-[38px] px-5 rounded-[10px] bg-black/40 backdrop-blur-sm border border-white/10 text-white/90 text-[13px] font-medium hover:bg-black/50 hover:border-white/20 transition-all"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-[38px] px-5 rounded-[10px] bg-[#0056B9] text-white text-[13px] font-medium hover:bg-[#0066D9] transition-all shadow-[0_0_20px_rgba(0,86,185,0.3)]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

