import StarRating from "../../../components/starRating/StarRating";
import CheckBox from "../../../components/checkBox/CheckBox";
import "./filterCamp.css";

function FilterCamp() {
  return (
    <div className="filter-camp-group">
      <div className="header">Filter by</div>
      <div className="sub-rating">
        <div className="title">Star Rating</div>
        <CheckBox label="5" value="5" id="rate-star-5">
          <StarRating type="5" />
        </CheckBox>
        <CheckBox label="4" value="4" id="rate-star-4">
          <StarRating type="4" />
        </CheckBox>
        <CheckBox label="3" value="3" id="rate-star-3">
          <StarRating type="3" />
        </CheckBox>
        <CheckBox label="2" value="2" id="rate-star-2">
          <StarRating type="2" />
        </CheckBox>
        <CheckBox label="1" value="1" id="rate-star-1">
          <StarRating type="1" />
        </CheckBox>
      </div>
      <div className="sub-property-type">
        <div className="title">Property type</div>
        <CheckBox label="Tent camp" value="tent-camp" id="tent-camp" />
        <CheckBox label="Glamping" value="glamping" id="glamping" />
        <CheckBox label="RV / Car camp" value="rv-car-camp" id="rv-car-camp" />
        <CheckBox label="Homestay" value="homestay" id="homestay" />
      </div>
      <div className="sub-facility">
        <div className="title">Facilities</div>
        <CheckBox label="Tent for rent" value="tent-for-rent" id="tent-for-rent" />
        <CheckBox label="Camping gear for rent" value="camping-gear-for-rent" id="camping-gear-for-rent" />
        <CheckBox label="Pet allowed" value="pet-allowed" id="pet-allowed" />
        <CheckBox label="Free WiFi" value="free-wifi" id="free-wifi" />
        <CheckBox label="Restaurant" value="restaurant" id="restaurant" />
        <CheckBox label="Store" value="store" id="store" />
        <CheckBox label="Electric hook up" value="electric-hook-up" id="electric-hook-up" />
        <CheckBox label="Toilet" value="toilet" id="toilet" />
        <CheckBox label="Breakfast" value="breakfast" id="breakfast" />
        <CheckBox label="Cafe" value="cafe" id="cafe" />
        <CheckBox label="Grills & BBQ Equipment" value="grills" id="grills" />
      </div>

      <div className="sub-activity">
        <div className="title">Fun things to do</div>
        <CheckBox label="Live music / Performance" value="live-music" id="live-music" />
        <CheckBox label="Horse riding" value="horse-riding" id="horse-riding" />
        <CheckBox label="Walking tours" value="walking-tours" id="walking-tours" />
        <CheckBox label="Spa" value="spa" id="spa" />
        <CheckBox label="Fishing" value="fishing" id="fishing" />
        <CheckBox label="Animals feed" value="animals-feed" id="animals-feed" />
      </div>
    </div>
  );
}

export default FilterCamp;
