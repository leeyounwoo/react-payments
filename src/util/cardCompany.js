import {
  BC_CARD,
  HYUNDAI_CARD,
  KOOKMIN_CARD,
  NH_CARD,
  SAMSUNG_CARD,
  TOSS_CARD,
  WOORI_ÇARD,
} from "../constants/cardCompany";
import { FIRST_NUMBER } from "../constants/cardNumber";

export function getCardCompanyNameByCardNumber(cardNumber) {
  switch (cardNumber[FIRST_NUMBER][0]) {
    case "0":
      return BC_CARD;
    case "1":
      return TOSS_CARD;
    case "2":
      return NH_CARD;
    case "3":
      return SAMSUNG_CARD;
    case "4":
      return HYUNDAI_CARD;
    case "5":
      return KOOKMIN_CARD;
    default:
      return WOORI_ÇARD;
  }
}
