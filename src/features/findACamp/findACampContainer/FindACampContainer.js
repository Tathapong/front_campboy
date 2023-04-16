import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunk_getAllCamp, selectCamps, selectLocationList } from "../../../stores/campsSlice";
import { resultSortItem } from "../../../constants/constant";
import { queryFromArray } from "../../../utilities/queryFromArray";

import SearchCamp from "../../../features/findACamp/searchCamp/SearchCamp";
import FilterCamp from "../../../features/findACamp/filterCamp/FilterCamp";
import CampRowCardList from "../../../features/camp/campRowCardList/CampRowCardList";
import SelectBox from "../../../components/selectBox/SelectBox";
import Map from "../../../components/map/Map";
import Button from "../../../components/button/Button";

function FindACamp() {
  const dispatch = useDispatch();

  const { state } = useLocation(); // get province Id from click at location iconText
  const provinceFilter = state?.provinceFilter;

  const [desination, setDestination] = useState("");
  const [province, setProvince] = useState("");
  const [rating, setRating] = useState([]);
  const [property, setProperty] = useState([]);
  const [informationItem, setInformationItem] = useState([]);
  const [sortItem, setSortItem] = useState("");
  const [mapItem, setMapItem] = useState([]);

  const camps = useSelector((state) => selectCamps(state, sortItem));
  const locationList = useSelector(selectLocationList);

  useEffect(() => {
    let query = provinceFilter ? `?province=${provinceFilter}` : "";
    if (provinceFilter) {
      setProvince(provinceFilter);
      window.history.replaceState({ ...window.history.state, usr: null }, ""); // Clear state (that from previous page) because Refresh page that remain
    }
    fetchCamps(query);
  }, []);

  async function fetchCamps(query) {
    try {
      await dispatch(thunk_getAllCamp(query));
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearFilter() {
    window.location.reload();
  }

  function handleSubmitFilterForm(ev) {
    ev.preventDefault();
    const destinationQuery = desination.trim() ? `destination=${desination.trim()}` : "";
    const provinceQuery = province ? `province=${province}` : "";
    const ratingQuery = queryFromArray("rating", rating);
    const propertyQuery = queryFromArray("property", property);
    const informationItemQuery = queryFromArray("informationItem", informationItem);

    const query = "?" + [destinationQuery, provinceQuery, ratingQuery, propertyQuery, informationItemQuery].join("&");
    fetchCamps(query);

    setMapItem([]);
  }

  return (
    <div className="find-a-camp-container col-11">
      <img
        src="https://res.cloudinary.com/duzw1g3u8/image/upload/v1679642103/Campboy/assets/background2_dzux4x.jpg"
        alt="background"
        className="image-background"
      />

      <form className="search-filter-group" onSubmit={handleSubmitFilterForm}>
        <SearchCamp setDestination={setDestination} setProvince={setProvince} province={province} />
        <FilterCamp setRating={setRating} setProperty={setProperty} setInformationItem={setInformationItem} />
        <Link className="clear-filter" onClick={handleClearFilter}>
          Clear filters
        </Link>
        <Button name="Search" type="submit" />
      </form>

      <div className="result-group">
        <div className="sort-group">
          <div className="title">Result Found : {camps.length}</div>
          <SelectBox list={resultSortItem} setValue={setSortItem} selected={sortItem} />
        </div>
        <CampRowCardList campList={camps} setMapItem={setMapItem} mapItem={mapItem} />
      </div>

      <div className="map">
        <Map locationList={mapItem.length ? mapItem : locationList} />
      </div>
    </div>
  );
}

export default FindACamp;
