import { useContext, useRef } from "react";
import Card from "../components/Card";
import { CardContext } from "../../providers/CardState/CardStateProvider";
import { MONTH, YEAR } from "../constants/expirationDate";
import Input from "../components/atomic-design-pattern/atom/Input";
import Button from "../components/atomic-design-pattern/atom/Button";
import { CardStorage } from "../util/cardStorage";

export default function CardComplete({ onNext }) {
  const { cardState } = useContext(CardContext);
  const { cardNumber, expirationDate, cardOwnerName } = cardState;
  const aliasInputRef = useRef(null);

  const onSubmitCardComplete = (event) => {
    event.preventDefault();
    const alias = aliasInputRef.current.value;
    if (alias) {
      CardStorage.changeCardInfo(cardNumber, "alias", alias);
    }

    onNext();
  };

  return (
    <form onSubmit={onSubmitCardComplete} className="flex-column-center">
      <div className="flex-center">
        <h2 className="page-title mb-10">카드등록이 완료되었습니다.</h2>
      </div>
      <Card
        cardNumber={cardNumber}
        expirationDateMM={expirationDate[MONTH]}
        expirationDateYY={expirationDate[YEAR]}
        cardOwnerName={cardOwnerName}
      />
      <Input
        className="input-underline w-75"
        placeholder="카드 별칭 (선택)"
        maxLength={10}
        ref={aliasInputRef}
      />

      <div className="button-box">
        <Button variant="link" type="submit">
          다음
        </Button>
      </div>
    </form>
  );
}
