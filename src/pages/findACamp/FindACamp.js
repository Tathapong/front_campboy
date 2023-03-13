import camp from "../../assets/data/data.json";

import background from "../../assets/images/background2.jpg";
import SearchCamp from "../../features/findACamp/searchCamp/SearchCamp";
import Filter from "../../features/findACamp/filterCamp/FilterCamp";
import CampRowCardList from "../../features/camp/campRowCardList/CampRowCardList";
import SelectBox from "../../components/selectBox/SelectBox";
import Map from "../../components/map/Map";
import Button from "../../components/button/Button";

function FindACamp() {
  const filter = [
    { title: "Newest", value: "newest" },
    { title: "Oldest", value: "oldest" },
    { title: "Highest rating", value: "highest-rating" },
    { title: "Lowest rating", value: "lowest-rating" },
    { title: "Top review", value: "top-review" }
  ];

  const campList = Array.from(camp);
  return (
    <div className="find-a-camp col-11">
      <img src={background} alt="background" className="image-background" />

      <form className="search-filter-group">
        <SearchCamp />
        <Filter />
        <Button name="Search" type="submit" />
      </form>

      <div className="result-group">
        <div className="filter-group">
          <div className="title">Result Found : 78</div>
          <SelectBox list={filter} />
        </div>
        <CampRowCardList campList={campList} />
      </div>

      <div className="map">
        <Map campList={campList} />
      </div>
    </div>
  );
}

export default FindACamp;
