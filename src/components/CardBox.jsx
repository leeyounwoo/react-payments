import classNames from "classnames";

export default function CardBox({ children, theme = "", ...props }) {
  const themeClassName = theme === "" ? "" : `bg-${theme}`;
  console.log(themeClassName);

  return (
    <div className="card-box" {...props}>
      <div className={classNames(themeClassName, "empty-card")}>{children}</div>
    </div>
  );
}
