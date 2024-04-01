import { useContext, useState, useEffect } from "react";
import Card from "../components/atomic-design-pattern/molecule/Card";
import CardNumberInput from "../components/card-add/CardNumberInput";
import { MONTH, YEAR } from "../constants/expirationDate";
import ExpirationDateInput from "../components/card-add/ExpirationDateInput";
import CardOwnerNameInput from "../components/card-add/CardOwnerInput";
import { CARD_OWNER_NAME_MAX_LENGTH } from "../constants/cardOwnerName";
import SecurityCodeInput from "../components/card-add/SecurityCodeInput";
import PasswordInput from "../components/card-add/PasswordInput";
import Button from "../components/atomic-design-pattern/atom/Button";
import InputContainer from "../components/atomic-design-pattern/organism/InputContainer";
import InputTitle from "../components/atomic-design-pattern/atom/InputTitle";
import InputGroup from "../components/atomic-design-pattern/molecule/InputGroup";
import { CardContext } from "../../providers/CardState/CardStateProvider";
import { useAutoFocus } from "../hook/useAutoFocus";
import InputError from "../components/atomic-design-pattern/atom/InputError";
import Modal from "../components/atomic-design-pattern/molecule/Modal";
import {
  FIRST_NUMBER,
  SECOND_NUMBER,
  THIRD_NUMBER,
} from "../constants/cardNumber";
import Dot from "../components/atomic-design-pattern/atom/Dot";

export default function CardAdd({
  goToListPage,
  goToCompletePage,
  setCardInfoList,
}) {
  const { cardState } = useContext(CardContext);
  const {
    cardNumber,
    expirationDate,
    securityCode,
    cardOwnerName,
    password,
    alias,
  } = cardState;
  const [cardCompany, setCardCompany] = useState(-1);

  const [modalOpen, setModalOpen] = useState(false);

  const {
    cardNumberRef,
    expirationDateRef,
    cardOwnerRef,
    securityCodeRef,
    passwordRef,
    changeFocus,
  } = useAutoFocus();

  // 카드 번호 16자리
  const isCardNumberValidate = Object.values(cardNumber).join("").length === 16;

  // 만료일 2자리 + 2자리
  const isExpirationDateValidate =
    Object.values(expirationDate).join("").length === 4;

  // 보안코드 3자리
  const isSecurityCodeValidate = securityCode.length === 3;
  // 카드 비밀번호 2자리
  const isPasswordValidate = Object.values(password).join("").length === 2;

  // 다음 버튼 보여줄지
  const isShowNextButton =
    isCardNumberValidate &&
    isExpirationDateValidate &&
    isSecurityCodeValidate &&
    isPasswordValidate;

  const onSubmitCardAdd = (event) => {
    event.preventDefault();

    setCardInfoList((prev) => {
      return [...prev, cardState];
    });

    goToCompletePage();
  };

  useEffect(() => {
    const isOpen =
      cardNumber[FIRST_NUMBER].length + cardNumber[SECOND_NUMBER].length ===
        8 && cardCompany === -1;
    setModalOpen(isOpen);
    if (isOpen) {
      cardNumberRef.current[THIRD_NUMBER].blur();
    }
  }, [cardNumber, cardCompany, cardNumberRef]);

  return (
    <form onSubmit={onSubmitCardAdd}>
      <h2 className="page-title">
        <Button variant="link" onClick={goToListPage}>
          {"<"}
        </Button>
        <span className="ml-10">카드 추가</span>
      </h2>
      {/* 카드 */}
      <Card
        alias={alias}
        cardNumber={cardNumber}
        expirationDateMM={expirationDate[MONTH]}
        expirationDateYY={expirationDate[YEAR]}
        cardOwnerName={cardOwnerName}
      />
      {/* 카드 번호 */}
      <InputContainer>
        <InputTitle>카드 번호</InputTitle>
        <CardNumberInput ref={cardNumberRef} changeFocus={changeFocus} />
        <InputError condition={isCardNumberValidate}>
          카드 번호를 모두 입력해주세요.
        </InputError>
      </InputContainer>
      {/* 만료일 */}
      <InputContainer>
        <InputTitle>만료일</InputTitle>

        <ExpirationDateInput
          ref={expirationDateRef}
          changeFocus={changeFocus}
        />
        <InputError condition={isExpirationDateValidate}>
          만료일을 모두 입력해주세요.
        </InputError>
      </InputContainer>
      {/* 카드 소유자 이름 */}
      <InputContainer>
        <InputGroup>
          <InputTitle>카드 소유자 이름(선택)</InputTitle>
          <InputTitle>
            {cardOwnerName.length} / {CARD_OWNER_NAME_MAX_LENGTH}
          </InputTitle>
        </InputGroup>
        <CardOwnerNameInput ref={cardOwnerRef} changeFocus={changeFocus} />
      </InputContainer>
      {/* 보안 코드 */}
      <InputContainer>
        <InputTitle>보안코드(CVC/CVV)</InputTitle>
        <SecurityCodeInput ref={securityCodeRef} changeFocus={changeFocus} />
        <InputError condition={isSecurityCodeValidate}>
          보안코드를 모두 입력해주세요.
        </InputError>
      </InputContainer>
      {/* 카드 비밀번호 */}
      <InputContainer>
        <InputTitle>카드 비밀번호</InputTitle>
        <PasswordInput ref={passwordRef} changeFocus={changeFocus} />
        <InputError condition={isPasswordValidate}>
          카드 비밀번호를 모두 입력해주세요.
        </InputError>
      </InputContainer>
      {isShowNextButton && (
        <div className="button-box">
          <Button variant="link" type="submit">
            다음
          </Button>
        </div>
      )}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="flex-center">
          <div
            className="modal-item-container"
            onClick={() => {
              cardNumberRef.current[THIRD_NUMBER].focus();
              setModalOpen(false);
              setCardCompany(2);
            }}
          >
            <Dot variant="red" />
            <span className="modal-item-name">클린 카드</span>
          </div>
          <div className="modal-item-container">
            <Dot variant="green" />
            <span className="modal-item-name">클린 카드</span>
          </div>
          <div className="modal-item-container">
            <Dot variant="blue" />
            <span className="modal-item-name">클린 카드</span>
          </div>
          <div className="modal-item-container">
            <Dot variant="pink" />
            <span className="modal-item-name">클린 카드</span>
          </div>
        </div>
        <div className="flex-center">
          <div className="modal-item-container">
            <Dot variant="aqua" />
            <span className="modal-item-name">클린 카드</span>
          </div>
          <div className="modal-item-container">
            <Dot variant="orange" />
            <span className="modal-item-name">클린 카드</span>
          </div>
          <div className="modal-item-container">
            <Dot variant="yellow" />
            <span className="modal-item-name">클린 카드</span>
          </div>
          <div className="modal-item-container">
            <Dot variant="blueberry" />
            <span className="modal-item-name">클린 카드</span>
          </div>
        </div>
      </Modal>
    </form>
  );
}
