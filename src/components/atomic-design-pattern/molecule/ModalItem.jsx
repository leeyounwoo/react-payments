export default function ModalItem({ children, onClick, name, ...props }) {
  return (
    <label
      className="modal-item-container"
      onClick={onClick}
      htmlFor={name}
      {...props}
    >
      {children}
    </label>
  );
}
