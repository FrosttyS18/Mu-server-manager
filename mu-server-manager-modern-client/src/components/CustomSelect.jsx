import React from 'react';

export function CustomSelect({ value, onChange, options = [], placeholder = 'Selecione...', className = '', disabled = false }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openUpward, setOpenUpward] = React.useState(false);
  const selectRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  // Detecta se deve abrir para cima ou para baixo
  React.useEffect(() => {
    if (!isOpen || !selectRef.current) return;

    const selectRect = selectRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;
    const dropdownHeight = 200; // altura estimada do dropdown

    // Se não tem espaço embaixo mas tem em cima, abre pra cima
    setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
  }, [isOpen]);

  // Fecha ao clicar fora
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedOption = Array.isArray(options) ? options.find(opt => opt.value === value) : null;

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Botão Select */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full h-[42px] px-4 rounded-[10px] bg-black/25 border border-white/10 text-[13px] text-white focus:outline-none transition-all flex items-center justify-between ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-white/20 cursor-pointer'
        }`}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/50'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 z-[9999] mt-2 rounded-[10px] bg-[#1a1a1a] backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in ${
            openUpward ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          style={{
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {Array.isArray(options) && options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-[13px] transition-colors ${
                value === option.value
                  ? 'bg-[#0056B9] text-white font-medium'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

