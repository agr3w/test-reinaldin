import React from 'react';

export default function UiSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Selecione',
  className = '',
  onKeyDown,
  disabled = false
}) {
  return (
    <div className={className}>
      {label && <label className="form-label">{label}</label>}
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map(opt =>
          typeof opt === 'object' ? (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ) : (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    </div>
  );
}