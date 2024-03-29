import { forwardRef } from "react";

export default forwardRef(function Modal(
  { open, onClick, children, ...props },
  ref
) {
  return (
    open && (
      <div className="modal-dimmed" ref={ref} onClick={onClick} {...props}>
        <div className="modal">{children}</div>
      </div>
    )
  );
});
