import React, { useEffect, useState } from 'react';

export default function NavBar() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const linkClass = (target) => (hash === target ? 'nav-link active' : 'nav-link');

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <a className={linkClass('#/')} href="#/">Home</a>
        <a className={linkClass('#/general-info')} href="#/general-info">Introduction</a>
        <a className={linkClass('#/history')} href="#/history">History</a>
        <a className={linkClass('#/stars')} href="#/stars">Stars</a>
        <a className={linkClass('#/constellations')} href="#/constellations">Constellations</a>
        <a className={linkClass('#/bookmarks')} href="#/bookmarks">Bookmarks</a>
      </div>
    </nav>
  );
}
