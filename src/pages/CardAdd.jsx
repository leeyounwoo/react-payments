import { useContext, useState } from "react";
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
import { THIRD_NUMBER } from "../constants/cardNumber";
import Dot from "../components/atomic-design-pattern/atom/Dot";
import ModalItem from "../components/atomic-design-pattern/molecule/ModalItem";
import Text from "../components/atomic-design-pattern/atom/Text";
import { CARD_COMPANY_THEME_MAP } from "../constants/cardCompany";

export default function CardAdd({
  goToListPage,
  goToCompletePage,
  setCardInfoList,
}) {
  const { cardState, setCardState } = useContext(CardContext);
  const {
    cardNumber,
    expirationDate,
    securityCode,
    cardOwnerName,
    password,
    alias,
    cardCompany,
  } = cardState;

  // 카드번호 유효한지
  const [isValidCardNumber, setIsValidCardNumber] = useState(true);
  // 만료일 유효한지
  const [isValidExpirationDate, setIsValidExpirationDate] = useState(true);
  // 보안코드 유효한지
  const [isValidSecurityCode, setIsValidSecurityCode] = useState(true);
  // 비밀번호 2자리
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const {
    cardNumberRef,
    expirationDateRef,
    cardOwnerRef,
    securityCodeRef,
    passwordRef,
    changeFocus,
  } = useAutoFocus();

  const onSubmitCardAdd = (event) => {
    event.preventDefault();

    // 카드 번호 16자리
    const isCardNumberValidLength =
      Object.values(cardNumber).join("").length === 16;
    setIsValidCardNumber(isCardNumberValidLength);

    // 만료일 2자리 + 2자리
    const isExpirationDateValidLength =
      Object.values(expirationDate).join("").length === 4;
    setIsValidExpirationDate(isExpirationDateValidLength);

    // 보안코드 3자리
    const isSecurityCodeValidLength = securityCode.length === 3;
    setIsValidSecurityCode(isSecurityCodeValidLength);

    // 카드 비밀번호 2자리
    const isPasswordValidLength = Object.values(password).join("").length === 2;
    setIsValidPassword(isPasswordValidLength);

    if (
      isCardNumberValidLength &&
      isExpirationDateValidLength &&
      isSecurityCodeValidLength &&
      isPasswordValidLength
    ) {
      setCardInfoList((prev) => {
        return [...prev, cardState];
      });

      goToCompletePage();
    }
  };

  const onClickCardCompanyModal = (event) => {
    const { id } = event.target;

    cardNumberRef.current[THIRD_NUMBER].focus();
    setModalOpen(false);
    setCardState((prevCardState) => {
      return { ...prevCardState, cardCompany: id };
    });
  };

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
        cardCompany={cardCompany}
      />
      {/* 카드 번호 */}
      <InputContainer>
        <InputTitle>카드 번호</InputTitle>
        <CardNumberInput
          ref={cardNumberRef}
          changeFocus={changeFocus}
          setModalOpen={setModalOpen}
        />
        <InputError condition={isValidCardNumber}>
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
        <InputError condition={isValidExpirationDate}>
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
        <InputError condition={isValidSecurityCode}>
          보안코드를 모두 입력해주세요.
        </InputError>
      </InputContainer>
      {/* 카드 비밀번호 */}
      <InputContainer>
        <InputTitle>카드 비밀번호</InputTitle>
        <PasswordInput ref={passwordRef} changeFocus={changeFocus} />
        <InputError condition={isValidPassword}>
          카드 비밀번호를 모두 입력해주세요.
        </InputError>
      </InputContainer>
      <div className="button-box">
        <Button variant="link" type="submit">
          다음
        </Button>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="modal-grid">
          {Object.keys(CARD_COMPANY_THEME_MAP).map((company) => {
            return (
              <ModalItem key={company}>
                <Dot
                  variant={company}
                  id={company}
                  onClick={onClickCardCompanyModal}
                />
                <Text className="modal-item-name">{company}</Text>
              </ModalItem>
            );
          })}
        </div>
      </Modal>
    </form>
  );
}
