import classNames from "classnames";
import Button from "./Button";
import { CARD_COMPANY_THEME_MAP } from "../../../constants/cardCompany";

export default function Dot({ children, variant, onClick, ...props }) {
  const bgClassName = `bg-${CARD_COMPANY_THEME_MAP[variant]}`;

  return (
    <Button
      variant="link"
      className={classNames(bgClassName, "dot")}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
