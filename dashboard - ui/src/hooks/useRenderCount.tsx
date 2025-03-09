import { useRef } from "react";

export const useRenderCount = () => {
  //for Debug purpose
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
};
