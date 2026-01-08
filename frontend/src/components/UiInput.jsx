import React from 'react';

export default function UiInput({ label, value, onChange, placeholder, type = 'text', onKeyDown, smallText, className }) {
  return (
    <div className={className}>
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {smallText && <small className="text-muted" style={{ fontSize: '0.8rem' }}>{smallText}</small>}
    </div>
  );
}