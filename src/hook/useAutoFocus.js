import { useRef } from "react";
import {
  CARD_NUMBER,
  FIRST_NUMBER,
  FOURTH_NUMBER,
  SECOND_NUMBER,
  THIRD_NUMBER,
} from "../constants/cardNumber";
import { EXPIRATION_DATE, MONTH, YEAR } from "../constants/expirationDate";
import { CARD_OWNER } from "../constants/cardOwnerName";
import { SECURITY_CODE } from "../constants/securityCode";
import { PASSWORD } from "../constants/password";

export const useAutoFocus = () => {
  const cardNumberRef = useRef({});
  const expirationDateRef = useRef({});
  const cardOwnerRef = useRef(null);
  const securityCodeRef = useRef(null);
  const passwordRef = useRef({});

  const cardNumberMap = {
    [FIRST_NUMBER]: cardNumberRef.current[SECOND_NUMBER],
    [SECOND_NUMBER]: cardNumberRef.current[THIRD_NUMBER],
    [THIRD_NUMBER]: cardNumberRef.current[FOURTH_NUMBER],
    [FOURTH_NUMBER]: expirationDateRef.current[MONTH],
  };

  const expirationDateMap = {
    [MONTH]: expirationDateRef.current[YEAR],
    [YEAR]: cardOwnerRef.current,
  };

  const passwordMap = {
    [FIRST_NUMBER]: passwordRef.current[SECOND_NUMBER],
    [SECOND_NUMBER]: null,
  };

  const changeFocus = (name, inputLength, maxLength) => {
    const [inputType, inputKey] = name.split("_");

    if (maxLength && inputLength.length === maxLength) {
      const nextRef = (() => {
        switch (inputType) {
          case CARD_NUMBER:
            return cardNumberMap[inputKey];
          case EXPIRATION_DATE:
            return expirationDateMap[inputKey];
          case CARD_OWNER:
            return securityCodeRef.current;
          case SECURITY_CODE:
            return passwordRef.current[FIRST_NUMBER];
          case PASSWORD:
            return passwordMap[inputKey];
          default:
            return null;
        }
      })();
      if (nextRef) {
        nextRef.focus();
      }
    }
  };

  return {
    cardNumberRef,
    expirationDateRef,
    cardOwnerRef,
    securityCodeRef,
    passwordRef,
    changeFocus,
  };
};
