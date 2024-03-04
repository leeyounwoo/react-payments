import { Link } from "react-router-dom";
import CardBox from "../components/CardBox";

export default function CardList() {
  return (
    <div className="root">
      <div className="app flex-column-center">
        <div className="flex-center">
          <h2 className="page-title mb-10">보유 카드</h2>
        </div>
        <Link to="/add" className="button-basic">
          <CardBox>+</CardBox>
        </Link>
      </div>
    </div>
  );
}
