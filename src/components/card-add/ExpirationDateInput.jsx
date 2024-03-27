import { forwardRef } from "react";
import {
  EXPIRATION_DATE,
  MONTH,
  MONTH_MAX_LENGTH,
  YEAR,
  YEAR_MAX_LENGTH,
} from "../../constants/expirationDate";
import { useCardState } from "../../hook/useCardState";
import { getNumberString } from "../../util/regExp";
import Input from "../atomic-design-pattern/atom/Input";
import InputBox from "../atomic-design-pattern/molecule/InputBox";

export default forwardRef(function ExpirationDateInput({ changeFocus }, ref) {
  const { cardState, setCardState } = useCardState();

  const onChangeExpirationDate = (event) => {
    const { name, value, maxLength } = event.target;
    const inputKey = name.split("_").pop();
    const onlyNumberValue = getNumberString(value);

    // 유효하지 않은 월
    if (inputKey === MONTH && +onlyNumberValue > 12) {
      return;
    }

    changeFocus(name, onlyNumberValue, maxLength);
    setCardState((prev) => {
      const newExpirationDate = {
        ...prev.expirationDate,
        [inputKey]: onlyNumberValue,
      };

      return { ...prev, expirationDate: newExpirationDate };
    });
  };

  return (
    <InputBox className="w-50">
      <Input
        value={cardState.expirationDate[MONTH]}
        onChange={onChangeExpirationDate}
        name={`${EXPIRATION_DATE}_${MONTH}`}
        ref={(el) => (ref.current[MONTH] = el)}
        type="text"
        placeholder="MM"
        maxLength={MONTH_MAX_LENGTH}
      />
      <Input
        value={cardState.expirationDate[YEAR]}
        name={`${EXPIRATION_DATE}_${YEAR}`}
        ref={(el) => (ref.current[YEAR] = el)}
        onChange={onChangeExpirationDate}
        type="text"
        placeholder="YY"
        maxLength={YEAR_MAX_LENGTH}
      />
    </InputBox>
  );
});
