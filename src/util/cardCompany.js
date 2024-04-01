import { FIRST_NUMBER } from "../constants/cardNumber";

export function getCardCompanyNameByCardNumber(cardNumber) {
  switch (cardNumber[FIRST_NUMBER]) {
    case "0":
      return "red";
  }
}
