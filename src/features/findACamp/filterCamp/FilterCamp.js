import CheckBoxList from "../../../components/checkBoxList/CheckBoxList";

function FilterCamp() {
  const rating = [
    { label: "5", value: "5", id: "rate-star-5" },
    { label: "4", value: "4", id: "rate-star-4" },
    { label: "3", value: "3", id: "rate-star-3" },
    { label: "2", value: "2", id: "rate-star-2" },
    { label: "1", value: "1", id: "rate-star-1" }
  ];
  const propertyType = [
    { label: "Tent camp", value: "tent-camp", id: "tent-camp" },
    { label: "Glamping", value: "glamping", id: "glamping" },
    { label: "RV / Car camp", value: "rv-car-camp", id: "rv-car-camp" },
    { label: "Homestay", value: "homestay", id: "homestay" }
  ];
  const facilities = [
    { label: "Tent for rent", value: "tent-for-rent", id: "tent-for-rent" },
    { label: "Camping gear for rent", value: "camping-gear-for-rent", id: "camping-gear-for-rent" },
    { label: "Pet allowed", value: "pet-allowed", id: "pet-allowed" },
    { label: "Free WiFi", value: "free-wifi", id: "free-wifi" },
    { label: "Restaurant", value: "restaurant", id: "restaurant" },
    { label: "Store", value: "store", id: "store" },
    { label: "Electric hook up", value: "electric-hook-up", id: "electric-hook-up" },
    { label: "Toilet", value: "toilet", id: "toilet" },
    { label: "Breakfast", value: "breakfast", id: "breakfast" },
    { label: "Cafe", value: "cafe", id: "cafe" },
    { label: "Grills & BBQ Equipment", value: "grills", id: "grills" }
  ];

  const activities = [
    { label: "Live music / Performance", value: "live-music", id: "live-music" },
    { label: "Horse riding", value: "horse-riding", id: "horse-riding" },
    { label: "Walking tours", value: "walking-tours", id: "walking-tours" },
    { label: "Spa", value: "spa", id: "spa" },
    { label: "Fishing", value: "fishing", id: "fishing" },
    { label: "Animals feed", value: "animals-feed", id: "animals-feed" }
  ];

  return (
    <div className="filter-camp-group">
      <div className="header">Filter by</div>
      <div>
        <CheckBoxList title="Star Rating" list={rating} type="star-rating" className="star-rating" />
        <CheckBoxList title="Property type" list={propertyType} className="property-type" />
      </div>
      <CheckBoxList title="Facilities" list={facilities} className="facilities" />
      <CheckBoxList title="Activities" list={activities} className="activities" />
    </div>
  );
}

export default FilterCamp;
