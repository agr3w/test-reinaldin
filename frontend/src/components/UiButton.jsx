import React from 'react';
import { Button } from 'react-bootstrap';

export default function UiButton({ children, variant = 'primary', size, onClick, className, disabled, type = 'button' }) {
  return (
    <Button variant={variant} size={size} onClick={onClick} className={className} disabled={disabled} type={type}>
      {children}
    </Button>
  );
}