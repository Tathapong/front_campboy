import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { thunk_writeReview } from "../../../stores/campSlice";
import * as customValidator from "../../../validation/validation";

import InputText from "../../../components/inputText/InputText";
import Button from "../../../components/button/Button";
import StarRatingForm from "../../../components/starRatingForm/StarRatingForm";

function WriteAReview(props) {
  const { closeModalReview } = props;

  const dispatch = useDispatch();
  const inputEl = useRef([]);
  const { campId } = useParams();

  const initialValue = { rating: "", summarize: "", reviewText: "" };

  const [inputValue, setInputValue] = useState({ ...initialValue, rating: 5 });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  function onClickRating(type) {
    setInputValue((prev) => ({ ...prev, rating: type }));
  }
  function onChangeSummarize(ev) {
    setInputValue((prev) => ({ ...prev, summarize: ev.target.value }));
  }
  function onChangeReviewText(ev) {
    setInputValue((prev) => ({ ...prev, reviewText: ev.target.value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue }));

      //- Check summarize
      if (!customValidator.isNotEmpty(inputValue.summarize)) error.summarize = "Summarize is required";

      //- Check reviewText
      if (!customValidator.isNotEmpty(inputValue.reviewText)) error.reviewText = "Review Text is required";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.rating || error.reviewText || error.summarize;
      if (!isError) {
        const input = {
          rating: inputValue.rating,
          summarize: inputValue.summarize,
          reviewText: inputValue.reviewText,
          campId: +campId
        };
        await dispatch(thunk_writeReview(input));
        inputEl.current.map((item) => (item.value = ""));

        setInputValue({ ...initialValue, rating: 5 });
        closeModalReview();
        toast.success("review successful");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <form className="write-a-review-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <StarRatingForm onClick={onClickRating} type={inputValue.rating} />
        <InputText
          ref={(el) => (inputEl.current[0] = el)}
          placeholder="Summarize your experience here"
          className="summarize-input"
          onChange={onChangeSummarize}
          errorText={errorInput.summarize}
        />
        <InputText
          ref={(el) => (inputEl.current[1] = el)}
          placeholder="Review your experience here"
          className="review-input"
          onChange={onChangeReviewText}
          errorText={errorInput.reviewText}
        />
      </div>
      <div className="button-group">
        <Button type="submit" className="btn-submit">
          Submit
        </Button>
        <Button className="btn-cancel" onClick={closeModalReview}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default WriteAReview;
