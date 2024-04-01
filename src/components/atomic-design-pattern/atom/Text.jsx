export default function Text({ children, className, ...props }) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}
