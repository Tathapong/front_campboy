import "./campSearch.css";

import InputTextIcon from "../../../components/inputTextIcon/InputTextIcon";

function CampSearch() {
  return (
    <div className="camp-search-group">
      <InputTextIcon placeholder="Where do you want to camp?">
        <i class="fa-solid fa-magnifying-glass"></i>
      </InputTextIcon>
      <div className="random-group">
        <span>or random camp</span>
        <span>
          <i class="fa-solid fa-dice-three"></i>
        </span>
      </div>
    </div>
  );
}

export default CampSearch;
