import { useState, useEffect } from "react";

import * as informationService from "../../../api/informationApi";
import { selectboxFromArray } from "../../../utilities/selectboxFromArray";

import InputTextIcon from "../../../components/inputTextIcon/InputTextIcon";
import SelectBox from "../../../components/selectBox/SelectBox";

function SearchCamp(props) {
  const { setProvince, setDestination, province } = props;
  const [provinceList, setProvinceList] = useState([]);

  useEffect(() => {
    async function fetchProvince() {
      try {
        const provinceList = await informationService.getProvince();
        const province = selectboxFromArray(provinceList);
        setProvinceList(province);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProvince();
  }, []);

  function onChangeDestination(ev) {
    setDestination(ev.target.value);
  }

  return (
    <div className="search-camp-group">
      <div className="header">Search</div>
      <div className="destination">
        <div className="title">Destination/ Camp name</div>
        <InputTextIcon placeholder="Where do you want to camp?" onChange={onChangeDestination}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </InputTextIcon>
      </div>
      <div className="province">
        <div className="title">Province</div>
        <SelectBox list={provinceList} setValue={setProvince} selected={province} />
      </div>
    </div>
  );
}

export default SearchCamp;
