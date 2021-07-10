import { KeyboardEvent } from "react";

export default function checkEnter<T extends HTMLElement = HTMLElement>(
  cb: (ev: KeyboardEvent<T>) => void
) {
  return function (ev: KeyboardEvent<T>) {
    if (ev.key === "Enter") {
      cb(ev);
    }
  };
}
