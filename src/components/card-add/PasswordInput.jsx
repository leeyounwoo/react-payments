import { FIRST_NUMBER, SECOND_NUMBER } from "../../constants/cardNumber";
import { getNumberString } from "../../util/regExp";
import Input from "../atomic-design-pattern/atom/Input";
import { useCardState } from "../../hook/useCardState";
import { forwardRef } from "react";
import { PASSWORD } from "../../constants/password";

export default forwardRef(function PasswordInput({ changeFocus }, ref) {
  const { cardState, setCardState } = useCardState();
  const onChangePassword = (event) => {
    const { value, name, maxLength } = event.target;

    const onlyNumberValue = getNumberString(value);

    changeFocus(name, onlyNumberValue, maxLength);

    setCardState((prev) => {
      const newPassword = {
        ...prev.password,
        [name.split("_").pop()]: onlyNumberValue,
      };
      return { ...prev, password: newPassword };
    });
  };

  return (
    <>
      <Input
        value={cardState.password[FIRST_NUMBER]}
        name={`${PASSWORD}_${FIRST_NUMBER}`}
        ref={(el) => (ref.current[FIRST_NUMBER] = el)}
        onChange={onChangePassword}
        className="w-15"
        type="password"
        maxLength="1"
      />

      <Input
        value={cardState.password[SECOND_NUMBER]}
        name={`${PASSWORD}_${SECOND_NUMBER}`}
        ref={(el) => (ref.current[SECOND_NUMBER] = el)}
        onChange={onChangePassword}
        className="w-15"
        type="password"
        maxLength="1"
      />
      <Input
        value="*"
        className="input-disabled w-15"
        type="password"
        disabled
        maxLength="1"
      />
      <Input
        value="*"
        className="input-disabled w-15"
        type="password"
        disabled
        maxLength="1"
      />
    </>
  );
});
