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

  const camps = useSelector(selectCamps);
  const locationList = useSelector(selectLocationList);

  const [desination, setDestination] = useState("");
  const [province, setProvince] = useState("");
  const [rating, setRating] = useState([]);
  const [property, setProperty] = useState([]);
  const [informationItem, setInformationItem] = useState([]);
  const [sortItem, setSortItem] = useState("");

  useEffect(() => {
    let query = "";
    if (provinceFilter) {
      query = `?province=${provinceFilter}`;
      setProvince(provinceFilter);
      window.history.replaceState({}, ""); // Clear state (that from previous page) because Refresh page that remain
    }

    const fetchCamps = async () => {
      try {
        await dispatch(thunk_getAllCamp(query));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCamps();
  }, [dispatch, provinceFilter]);

  function handleSubmitFilterForm(ev) {
    ev.preventDefault();
    const destinationQuery = desination ? `destination=${desination}` : "";
    const provinceQuery = province ? `province=${province}` : "";
    const ratingQuery = queryFromArray("rating", rating);
    const propertyQuery = queryFromArray("property", property);
    const informationItemQuery = queryFromArray("informationItem", informationItem);

    const query = "?" + [destinationQuery, provinceQuery, ratingQuery, propertyQuery, informationItemQuery].join("&");

    const fetchCamps = async () => {
      await dispatch(thunk_getAllCamp(query));
    };
    fetchCamps();
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
        <Link className="clear-filter" onClick={() => window.location.reload()}>
          Clear filters
        </Link>
        <Button name="Search" type="submit" />
      </form>

      <div className="result-group">
        <div className="sort-group">
          <div className="title">Result Found : {camps.length}</div>
          <SelectBox list={resultSortItem} setValue={setSortItem} />
        </div>
        <CampRowCardList campList={camps} />
      </div>

      <div className="map">
        <Map locationList={locationList} />
      </div>
    </div>
  );
}

export default FindACamp;
