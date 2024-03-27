import { forwardRef } from "react";
import { useCardState } from "../../hook/useCardState";
import { getNumberString } from "../../util/regExp";
import Input from "../atomic-design-pattern/atom/Input";
import { SECURITY_CODE } from "../../constants/securityCode";

export default forwardRef(function SecurityCodeInput({ changeFocus }, ref) {
  const { cardState, setCardState } = useCardState();
  const onChangeSecurityCode = (event) => {
    const { value, name, maxLength } = event.target;

    const onlyNumberValue = getNumberString(value);

    changeFocus(name, onlyNumberValue, maxLength);

    setCardState((prev) => {
      return { ...prev, securityCode: onlyNumberValue };
    });
  };

  return (
    <Input
      value={cardState.securityCode}
      onChange={onChangeSecurityCode}
      className="w-25"
      type="password"
      maxLength="3"
      name={SECURITY_CODE}
      ref={ref}
    />
  );
});
