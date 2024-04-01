import classNames from "classnames";

export default function Dot({ children, variant, ...props }) {
  return (
    <div className={classNames(`bg-${variant}`, "dot")} {...props}>
      {children}
    </div>
  );
}
