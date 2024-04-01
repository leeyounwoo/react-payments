export default function ModalItem({ children, onClick, ...props }) {
  return (
    <div className="modal-item-container" onClick={onClick} {...props}>
      {children}
    </div>
  );
}
