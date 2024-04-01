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

export default forwardRef(function CardNumberInput(
  { changeFocus, setModalOpen },
  ref
) {
  const { cardState, setCardState } = useCardState();
  const { cardNumber } = cardState;

  const onChangeCardNumber = (event) => {
    const { value, name, maxLength } = event.target;
    // FIRST_NUMBER, SECOND_NUMBER, THIRD_NUMBER, FOURTH_NUMBER
    const inputType = name.split("_").pop();

    const onlyNumberValue = getNumberString(value);

    changeFocus(name, onlyNumberValue, maxLength);

    setCardState((prev) => {
      const newCardNumber = {
        ...prev.cardNumber,
        [inputType]: onlyNumberValue,
      };

      return { ...prev, cardNumber: newCardNumber };
    });

    if (inputType === SECOND_NUMBER) {
      if (cardNumber[FIRST_NUMBER].length + onlyNumberValue.length === 8) {
        setModalOpen(true);
        ref.current[THIRD_NUMBER].blur();
      }
    }
  };

  return (
    <InputBox>
      <Input
        value={cardNumber[FIRST_NUMBER]}
        name={`${CARD_NUMBER}_${FIRST_NUMBER}`}
        ref={(el) => (ref.current[FIRST_NUMBER] = el)}
        maxLength="4"
        onChange={onChangeCardNumber}
      />

      <Input
        defaultValue="-"
        isHidden={cardNumber[FIRST_NUMBER].length !== 4}
        disabled
      />

      <Input
        value={cardNumber[SECOND_NUMBER]}
        name={`${CARD_NUMBER}_${SECOND_NUMBER}`}
        ref={(el) => (ref.current[SECOND_NUMBER] = el)}
        type="text"
        maxLength="4"
        onChange={onChangeCardNumber}
      />
      <Input
        defaultValue="-"
        isHidden={cardNumber[SECOND_NUMBER].length !== 4}
        disabled
      />
      <Input
        value={cardNumber[THIRD_NUMBER]}
        name={`${CARD_NUMBER}_${THIRD_NUMBER}`}
        ref={(el) => (ref.current[THIRD_NUMBER] = el)}
        type="password"
        maxLength="4"
        onChange={onChangeCardNumber}
      />
      <Input
        defaultValue="-"
        isHidden={cardNumber[THIRD_NUMBER].length !== 4}
        disabled
      />
      <Input
        value={cardNumber[FOURTH_NUMBER]}
        name={`${CARD_NUMBER}_${FOURTH_NUMBER}`}
        ref={(el) => (ref.current[FOURTH_NUMBER] = el)}
        type="password"
        maxLength="4"
        onChange={onChangeCardNumber}
      />
    </InputBox>
  );
});
