import { useEffect, useState } from 'react';

const DESKTOP_QUERY = '(min-width: 800px)';

export const useBurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((open) => !open);
  const close = () => setIsOpen(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleScreenChange = () => setIsOpen(false);

    document.addEventListener('keyup', handleKeyUp);
    desktop.addEventListener('change', handleScreenChange);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      desktop.removeEventListener('change', handleScreenChange);
    };
  }, []);

  return { isOpen, toggle, close };
};
