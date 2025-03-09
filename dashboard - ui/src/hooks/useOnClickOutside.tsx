import { useEffect, RefObject } from "react";

type EventType = MouseEvent | TouchEvent | PointerEvent;

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: EventType) => void
) => {
  useEffect(() => {
    const listener = (event: EventType) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("pointerdown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler]);
};
