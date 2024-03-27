import { forwardRef } from "react";
import {
  CARD_NUMBER,
  FIRST_NUMBER,
  FOURTH_NUMBER,
  SECOND_NUMBER,
  THIRD_NUMBER,
} from "../../constants/cardNumber";
import { useCardState } from "../../hook/useCardState";
import { getNumberString } from "../../util/regExp";
import Input from "../atomic-design-pattern/atom/Input";
import InputBox from "../atomic-design-pattern/molecule/InputBox";

export default forwardRef(function CardNumberInput({ changeFocus }, ref) {
  const { cardState, setCardState } = useCardState();

  const onChangeCardNumber = (event) => {
    const { value, name, maxLength } = event.target;

    const onlyNumberValue = getNumberString(value);

    changeFocus(name, onlyNumberValue, maxLength);

    setCardState((prev) => {
      const newCardNumber = {
        ...prev.cardNumber,
        [name.split("_").pop()]: onlyNumberValue,
      };

      return { ...prev, cardNumber: newCardNumber };
    });
  };

  return (
    <InputBox>
      <Input
        value={cardState.cardNumber[FIRST_NUMBER]}
        name={`${CARD_NUMBER}_${FIRST_NUMBER}`}
        ref={(el) => (ref.current[FIRST_NUMBER] = el)}
        maxLength="4"
        onChange={onChangeCardNumber}
      />

      <Input
        defaultValue="-"
        isHidden={cardState.cardNumber[FIRST_NUMBER].length !== 4}
        disabled
      />

      <Input
        value={cardState.cardNumber[SECOND_NUMBER]}
        name={`${CARD_NUMBER}_${SECOND_NUMBER}`}
        ref={(el) => (ref.current[SECOND_NUMBER] = el)}
        type="text"
        maxLength="4"
        onChange={onChangeCardNumber}
      />
      <Input
        defaultValue="-"
        isHidden={cardState.cardNumber[SECOND_NUMBER].length !== 4}
        disabled
      />
      <Input
        value={cardState.cardNumber[THIRD_NUMBER]}
        name={`${CARD_NUMBER}_${THIRD_NUMBER}`}
        ref={(el) => (ref.current[THIRD_NUMBER] = el)}
        type="password"
        maxLength="4"
        onChange={onChangeCardNumber}
      />
      <Input
        defaultValue="-"
        isHidden={cardState.cardNumber[THIRD_NUMBER].length !== 4}
        disabled
      />
      <Input
        value={cardState.cardNumber[FOURTH_NUMBER]}
        name={`${CARD_NUMBER}_${FOURTH_NUMBER}`}
        ref={(el) => (ref.current[FOURTH_NUMBER] = el)}
        type="password"
        maxLength="4"
        onChange={onChangeCardNumber}
      />
    </InputBox>
  );
});
