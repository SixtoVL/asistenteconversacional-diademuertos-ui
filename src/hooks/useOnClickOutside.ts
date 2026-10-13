import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  active = true,
): void {
  useEffect(() => {
    if (!active) {
      return;
    }
    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target;
      if (target instanceof Node && ref.current && !ref.current.contains(target)) {
        onOutsideClick();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, onOutsideClick, active]);
}
