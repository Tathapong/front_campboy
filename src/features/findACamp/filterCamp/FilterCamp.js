import { useEffect, useState } from "react";

import CheckBoxList from "../../../components/checkBoxList/CheckBoxList";

import * as informationService from "../../../api/informationApi";
import { checkboxFromArray } from "../../../utilities/checkboxFromArray";

function FilterCamp(props) {
  const { setRating, setProperty, setInformationItem } = props;

  const [ratingList, setRatingList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    async function fetchFilterItem() {
      try {
        const { properties, services, activities, rating } = await informationService.getFilterList();

        setRatingList((prev) => checkboxFromArray(rating));
        setPropertyList((prev) => checkboxFromArray(properties));
        setServiceList((prev) => checkboxFromArray(services));
        setActivityList((prev) => checkboxFromArray(activities));
      } catch (error) {
        console.log(error);
      }
    }
    fetchFilterItem();
  }, []);

  return (
    <div className="filter-camp-group">
      <div className="header">Filter by</div>
      <div>
        <CheckBoxList
          title="Star Rating"
          list={ratingList}
          type="rating"
          className="star-rating"
          setValue={setRating}
        />
        <CheckBoxList title="Property type" list={propertyList} className="property-type" setValue={setProperty} />
        <CheckBoxList title="Activities" list={activityList} className="activities" setValue={setInformationItem} />
      </div>
      <CheckBoxList title="Services" list={serviceList} className="facilities" setValue={setInformationItem} />
    </div>
  );
}

export default FilterCamp;
