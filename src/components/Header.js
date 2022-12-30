import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <div className="title">Djplaythatsong</div>
        </div>
        <div className="menu-items">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
