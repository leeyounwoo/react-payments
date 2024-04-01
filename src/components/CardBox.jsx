import classNames from "classnames";
import { CARD_COMPANY_THEME_MAP } from "../constants/cardCompany";

export default function CardBox({ children, cardCompany = "", ...props }) {
  const themeClassName =
    cardCompany === "" ? "" : `bg-${CARD_COMPANY_THEME_MAP[cardCompany]}`;

  return (
    <div className="card-box" {...props}>
      <div className={classNames(themeClassName, "empty-card")}>{children}</div>
    </div>
  );
}
