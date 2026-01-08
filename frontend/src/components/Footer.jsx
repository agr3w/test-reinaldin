import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center text-muted py-4 mt-5 border-top">
      <small>
        &copy; 2026 Catálogo Reinaldin. Desenvolvido por <strong>Weslley Kampa</strong>.
        <br />
        <span style={{ fontSize: '0.8em' }}>
          Ícone por <a href="https://icons8.com" target="_blank" rel="noreferrer" className="text-decoration-none text-secondary">Icons8</a>
        </span>
      </small>
    </footer>
  );
}