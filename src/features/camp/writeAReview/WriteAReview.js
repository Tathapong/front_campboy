import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../../components/button/Button";
import InputText from "../../../components/inputText/InputText";
import StarRatingForm from "../../../components/starRatingForm/StarRatingForm";
import Textarea from "../../../components/textarea/Textarea";

import { toast } from "react-toastify";
import { thunk_writeReview } from "../../../stores/campSlice";
import { isNotEmpty } from "../../../validation/validation";

function WriteAReview(props) {
  const { closeModalReview } = props;

  const dispatch = useDispatch();
  const inputEl = useRef([]);
  const { campId } = useParams();

  const initialValue = { rating: "", summarize: "", reviewText: "" };

  const [inputValue, setInputValue] = useState({ ...initialValue, rating: 5 });
  const [errorInput, setErrorInput] = useState({ ...initialValue });

  useEffect(() => {
    setErrorInput({ ...initialValue });
  }, [closeModalReview]);

  function handleOnClickRating(type) {
    setInputValue((prev) => ({ ...prev, rating: type }));
  }
  function handleOnChangeSummarize(ev) {
    setInputValue((prev) => ({ ...prev, summarize: ev.target.value }));
  }
  function handleOnChangeReviewText(ev) {
    setInputValue((prev) => ({ ...prev, reviewText: ev.target.value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      //+ Validation
      const error = { ...initialValue };
      setErrorInput((prev) => ({ ...initialValue }));

      //- Check summarize
      if (!isNotEmpty(inputValue.summarize)) error.summarize = "Summarize is required";

      //- Check reviewText
      if (!isNotEmpty(inputValue.reviewText)) error.reviewText = "Review Text is required";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.reviewText || error.summarize;
      if (!isError) {
        const input = {
          rating: inputValue.rating,
          summarize: inputValue.summarize,
          reviewText: JSON.stringify(inputValue.reviewText.replace(/\n+/g, "\n")),
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
        <StarRatingForm onClick={handleOnClickRating} type={inputValue.rating} />
        <InputText
          ref={(el) => (inputEl.current[0] = el)}
          className="summarize-input"
          placeholder="Summarize your experience here"
          onChange={handleOnChangeSummarize}
          value={inputValue.summarize}
          errorText={errorInput.summarize}
          maxLength={100}
        />

        <Textarea
          ref={(el) => (inputEl.current[1] = el)}
          placeholder="Review your experience here"
          value={inputValue.reviewText}
          onChange={handleOnChangeReviewText}
          errorText={errorInput.reviewText}
          maxLength={2000}
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
