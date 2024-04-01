import classNames from "classnames";
import Button from "./Button";

export default function Dot({ children, variant, onClick, ...props }) {
  return (
    <Button
      variant="link"
      className={classNames(`bg-${variant}`, "dot")}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
