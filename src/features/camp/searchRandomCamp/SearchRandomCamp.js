import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/button/Button";
import InputTextIcon from "../../../components/inputTextIcon/InputTextIcon";

import { thunk_getRandomCamp, selectRandomCamp, actions } from "../../../stores/homeSlice";

function SearchRandomCamp() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const camp = useSelector(selectRandomCamp) ?? "";

  useEffect(() => {
    dispatch(actions.deleteRandomCamp());
  }, []);

  useEffect(() => {
    setInput(camp.name ?? "");
  }, [camp]);

  async function handleOnClickRandom() {
    try {
      await dispatch(thunk_getRandomCamp());
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnClickSubmit() {
    navigate("/findacamp", { state: { randomCamp: input } });
  }
  return (
    <div className="search-random-camp-group">
      <InputTextIcon placeholder="Where do you want to camp?" value={input} setValue={setInput}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </InputTextIcon>
      <div className="random-group">
        <span className="text">or random camp</span>
        <span className="icon" onClick={handleOnClickRandom}>
          <i class="fa-solid fa-dice-three"></i>
        </span>
      </div>
      <Button name="Go" onClick={handleOnClickSubmit} />
    </div>
  );
}

export default SearchRandomCamp;
