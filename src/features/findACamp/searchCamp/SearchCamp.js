import InputTextIcon from "../../../components/inputTextIcon/InputTextIcon";
import SelectBox from "../../../components/selectBox/SelectBox";

function SearchCamp() {
  const province = [
    { title: "Bangkok", value: "bangkok" },
    { title: "Saraburi", value: "saraburi" },
    { title: "Phetburi", value: "phetburi" },
    { title: "Kanchanaburi", value: "kanchanaburi" },
    { title: "Chiangmai", value: "chiangmai" }
  ];
  return (
    <div className="search-camp-group">
      <div className="header">Search</div>
      <div className="destination">
        <div className="title">Destination/ Camp name</div>
        <InputTextIcon placeholder="Where do you want to camp?">
          <i class="fa-solid fa-magnifying-glass"></i>
        </InputTextIcon>
      </div>
      <div className="province">
        <div className="title">Province</div>
        <SelectBox list={province} />
      </div>
    </div>
  );
}

export default SearchCamp;
