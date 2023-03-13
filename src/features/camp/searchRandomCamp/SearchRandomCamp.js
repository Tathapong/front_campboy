import InputTextIcon from "../../../components/inputTextIcon/InputTextIcon";

function SearchRandomCamp() {
  return (
    <div className="search-random-camp-group">
      <InputTextIcon placeholder="Where do you want to camp?">
        <i class="fa-solid fa-magnifying-glass"></i>
      </InputTextIcon>
      <div className="random-group">
        <span className="text">or random camp</span>
        <span className="icon">
          <i class="fa-solid fa-dice-three"></i>
        </span>
      </div>
    </div>
  );
}

export default SearchRandomCamp;
