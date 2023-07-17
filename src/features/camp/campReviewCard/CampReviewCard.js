import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import IconText from "../../../components/iconText/IconText";
import InputText from "../../../components/inputText/InputText";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import OptionDropdown from "../../../components/optionDropdown/OptionDropdown";
import StarRating from "../../../components/starRating/StarRating";
import StarRatingForm from "../../../components/starRatingForm/StarRatingForm";
import Textarea from "../../../components/textarea/Textarea";

import { selectMe } from "../../../stores/myUserSlice";
import { useClickOutSide } from "../../../hooks/useClickOutside";
import { isNotEmpty } from "../../../validation/validation";
import { thunk_deleteReview, thunk_updateReview } from "../../../stores/campSlice";

function CampReviewCard(props) {
  const { review } = props;

  const [dropdown, setDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const initialValue = { rating: "", summarize: "", reviewText: "" };
  const [reviewInput, setReviewInput] = useState({ ...initialValue });
  const [reviewError, setReviewError] = useState({ ...initialValue });

  const textareaEl = useRef(null);
  const reviewTextEl = useRef(null);
  const dropdownEl = useClickOutSide(useCallback(closeDropdown, []));

  const dispatch = useDispatch();

  useEffect(() => {
    setReviewInput(() => ({
      rating: review.rating,
      summarize: review.summarize,
      reviewText: JSON.parse(review.reviewText)
    }));
    setReviewError({ ...initialValue });
  }, [isEditing]);

  function closeDropdown() {
    setDropdown(false);
  }

  function toggleDropdown() {
    setDropdown((previous) => !previous);
  }

  function handleOnClickEditButton() {
    textareaEl.current.style.height = reviewTextEl.current.scrollHeight + 20 + "px";
    setIsDeleting(false);
    setIsEditing(true);
    closeDropdown();
  }

  function handleOnClickDeleteButton() {
    setIsEditing(false);
    setIsDeleting(true);
    closeDropdown();
  }

  function handleOnClickCancelEdit() {
    setIsEditing(false);
  }

  function handleOnClickCancelDelete() {
    setIsDeleting(false);
  }

  function handleOnChangeSummarize(ev) {
    setReviewInput(() => ({ ...reviewInput, summarize: ev.target.value }));
  }

  function handleOnChangeReviewText(ev) {
    setReviewInput(() => ({ ...reviewInput, reviewText: ev.target.value }));
  }

  function handleOnClickRating(type) {
    setReviewInput((prev) => ({ ...prev, rating: type }));
  }

  async function handleOnClickSaveEditReview(ev) {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialValue };
      setReviewError((prev) => ({ ...initialValue }));

      //- Check summarize
      if (!isNotEmpty(reviewInput.summarize)) error.summarize = "Summarize is required";

      //- Check reviewText
      if (!isNotEmpty(reviewInput.reviewText)) error.reviewText = "Review Text is required";

      setReviewError((prev) => ({ ...error }));

      const isError = error.reviewText || error.summarize;

      if (!isError) {
        const input = {
          rating: +reviewInput.rating,
          summarize: reviewInput.summarize,
          reviewText: JSON.stringify(reviewInput.reviewText.replace(/\n+/g, "\n")),
          reviewId: +review.id
        };
        await dispatch(thunk_updateReview(input));
        setIsEditing(false);
        toast.success("Update review completed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  async function handleOnClickDeleteReview() {
    try {
      await dispatch(thunk_deleteReview(review.id));
      setIsDeleting(false);
      toast.success("Delete review completed");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const myUser = useSelector(selectMe);
  const date = new Date(review.createdAt).toISOString().slice(0, 10);

  return (
    <div className="camp-review-card-group">
      <div className="header-group">
        <ProfileTitle
          type="horizontal"
          name={review.profileName}
          profileImage={review.profileImage}
          to={`/profile/${review.profileId}`}
        />
        {myUser?.id === review.profileId ? (
          isEditing || isDeleting ? (
            ""
          ) : (
            <div ref={dropdownEl}>
              <IconText type="vertical-dot" onClick={toggleDropdown} />
              <ul className={`comment-edit-dropdown-content ${dropdown ? "d-flex" : "d-none"}`}>
                <OptionDropdown title="Edit" onClick={handleOnClickEditButton}>
                  <i class="fa-solid fa-pen"></i>
                </OptionDropdown>
                <OptionDropdown title="Delete" onClick={handleOnClickDeleteButton}>
                  <i class="fa-solid fa-trash"></i>
                </OptionDropdown>
              </ul>
            </div>
          )
        ) : (
          ""
        )}
      </div>

      <form className={`review-input-form ${isEditing ? "d-flex" : "d-none"}`} onSubmit={handleOnClickSaveEditReview}>
        <div className="button-group">
          <Button name="Save" type="submit" />
          <Button name="Cancel" className="btn-cancel" onClick={handleOnClickCancelEdit} />
        </div>
        <StarRatingForm type={reviewInput.rating} onClick={handleOnClickRating} />

        <InputText
          placeholder="Summarize your experience here"
          onChange={handleOnChangeSummarize}
          value={reviewInput.summarize}
          errorText={reviewError.summarize}
          maxLength={100}
        />
        <Textarea
          ref={textareaEl}
          placeholder="Review your experience here"
          value={reviewInput.reviewText}
          onChange={handleOnChangeReviewText}
          errorText={reviewError.reviewText}
          maxLength={2000}
        />
      </form>

      <div className={`info-group ${isDeleting ? "info-group-isDeleting" : ""} ${isEditing ? "d-none" : "d-block"}`}>
        {isDeleting ? (
          <div className="button-group">
            <Button name="Delete" className="btn-delete" onClick={handleOnClickDeleteReview} />
            <Button name="Cancel" className="btn-cancel" onClick={handleOnClickCancelDelete} />
          </div>
        ) : (
          ""
        )}
        <div className="summarize">{review.summarize}</div>
        <div className="date">Reviewed {date}</div>
        <div className="overview-rating">
          <div className="title">Overall rating</div>
          <StarRating type={review.rating} />
        </div>
        <div className="review">
          <div className="title">Review</div>
          <div
            ref={reviewTextEl}
            className="content"
            dangerouslySetInnerHTML={{ __html: JSON.parse(review.reviewText).replace(/\n/g, "<br>") }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CampReviewCard;
