import { useRef } from "react";

export default function Modal({ open, setOpen, children, ...props }) {
  const modalBackground = useRef(null);
  const onClickModalContainer = (event) => {
    if (event.target === modalBackground.current) {
      setOpen(false);
    }
  };

  return (
    open && (
      <div
        className="modal-dimmed"
        ref={modalBackground}
        onClick={onClickModalContainer}
        {...props}
      >
        <div className="modal">{children}</div>
      </div>
    )
  );
}
