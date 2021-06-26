import { useEffect, useState } from "react";

const BREAKPOINT = 800;

export default function useDesktop() {
  const [desktop, setDesktop] = useState(window.innerWidth > BREAKPOINT);

  useEffect(() => {
    const onResize = () => {
      setDesktop(window.innerWidth > BREAKPOINT);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return desktop;
}
