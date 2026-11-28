import { useEffect, useRef, useState } from 'react';
import { DESKTOP_BREAKPOINT } from '../../constants';

const DESKTOP_QUERY = `(min-width: ${DESKTOP_BREAKPOINT}px)`;
const OUTSIDE_MENU = 'main, footer, .header__logo-wrapper, .header__search-bar';

export const useBurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  const toggle = () => setIsOpen((open) => !open);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const outside = document.querySelectorAll(OUTSIDE_MENU);
    document.body.classList.toggle('no-scroll', isOpen);
    outside.forEach((el) => el.toggleAttribute('inert', isOpen));

    if (isOpen) menuRef.current?.querySelector('a')?.focus();
    else if (wasOpen.current) burgerRef.current?.focus();
    wasOpen.current = isOpen;

    return () => {
      document.body.classList.remove('no-scroll');
      outside.forEach((el) => el.removeAttribute('inert'));
    };
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

  return { isOpen, toggle, close, burgerRef, menuRef };
};
