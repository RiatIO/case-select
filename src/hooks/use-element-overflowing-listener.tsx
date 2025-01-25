import { useEffect, useState } from "react";

export const useElementOverflowingListener = (
  elementRef: React.RefObject<HTMLElement>
) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const handleResize = () => {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elementRef]);

  return isOverflowing;
};
