import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/button/Button";
import Carousel from "../../../components/carousel/Carousel";
import IconText from "../../../components/iconText/IconText";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";
import InformationCard from "../../../components/infomationCard/InformationCard";
import Map from "../../../components/map/Map";
import Modal from "../../../components/modal/Modal";
import SelectBox from "../../../components/selectBox/SelectBox";
import ShareSocial from "../../../components/shareSocial/ShareSocial";
import StarRating from "../../../components/starRating/StarRating";

import CampReviewCard from "../campReviewCard/CampReviewCard";
import WriteAReview from "../writeAReview/WriteAReview";

import * as constant from "../../../config/constant";
import {
  thunk_getCampById,
  selectCamp,
  selectCampImages,
  selectLocation,
  selectContact,
  selectReviewList,
  selectInformation
} from "../../../stores/campSlice";
import { selectMe } from "../../../stores/myUserSlice";
import { reviewSortItem } from "../../../constants/constant";
import NotFound from "../../../pages/notFound/NotFound";

function Camp() {
  const { campId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [modalReviewIsOpen, setModalReviewIsOpen] = useState(false);
  const [sortItem, setSortItem] = useState("");

  const myUser = useSelector(selectMe);

  const camp = useSelector(selectCamp);
  const campImages = useSelector(selectCampImages);
  const location = useSelector(selectLocation);
  const contact = useSelector(selectContact);
  const reviewList = useSelector((state) => selectReviewList(state, sortItem));

  const general = useSelector((state) => selectInformation(state, constant.GENERAL));
  const service = useSelector((state) => selectInformation(state, constant.SERVICE));
  const activity = useSelector((state) => selectInformation(state, constant.ACTIVITY));
  const rule = useSelector((state) => selectInformation(state, constant.RULE));

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getCampById(campId));
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) navigate("/*");
      }
    };
    fetch();
  }, [campId, dispatch]);

  function openModalReview() {
    setModalReviewIsOpen(true);
  }
  function closeModalReview() {
    setModalReviewIsOpen(false);
  }

  function InformationContent(list) {
    return (
      <>
        {list.map((item) => (
          <IconTextInfo
            iconImage={item.iconImage}
            title={item.title}
            subTitle1={item.subTitle1}
            subTitle2={item.subTitle2}
            key={item.id}
          />
        ))}
      </>
    );
  }

  function handleOnClickOpenMap() {
    window.open(
      `https://www.google.com/maps/@?api=1&map_action=map&center=${location.lat}%2c${location.lng}&zoom=17`,
      "_blank"
    );
  }

  function handleOnClickOpenContact(item) {
    if (item.type === constant.PHONE) window.location.assign(`tel:${item.contact}`);
    if (item.type === constant.FACEBOOK || item.type === constant.WEBSITE || item.type === constant.LINE)
      window.open(item.contact);
  }

  return (
    <div className="camp-container col-8">
      <div className="header-background-camp" />
      <Carousel images={campImages} />

      <div className="location-share">
        <IconText
          name={camp.provinceName ?? "Province"}
          type="location"
          to="/findacamp"
          state={{ provinceFilter: camp.provinceId ?? null }}
        />

        <ShareSocial />
      </div>

      <StarRating type={camp.scores} />
      <div className="camp-name">{camp.name ?? "Camp name"}</div>
      <div className="information-group">
        <div className="group-1 col-8">
          {camp.overview ? (
            <InformationCard title="Overview" className="overview">
              <div className="content" dangerouslySetInnerHTML={{ __html: camp.overview ?? undefined }}></div>
            </InformationCard>
          ) : (
            ""
          )}

          {general ? (
            <InformationCard title="General Information" className="general-information">
              <div className="content">{InformationContent(general)}</div>
            </InformationCard>
          ) : (
            ""
          )}

          {service.length ? (
            <InformationCard title="Services" className="service">
              <div className="content">{InformationContent(service)}</div>
            </InformationCard>
          ) : (
            ""
          )}

          {activity.length ? (
            <InformationCard title="Activities" className="activity">
              <div className="content">{InformationContent(activity)}</div>
            </InformationCard>
          ) : (
            ""
          )}

          {rule.length ? (
            <InformationCard title="Rule" className="rule">
              <div className="content">{InformationContent(rule)}</div>
            </InformationCard>
          ) : (
            ""
          )}
        </div>

        <div className="group-2 col-4">
          <InformationCard title="Map" className="map">
            <div className="content">
              <Map locationList={[location]} zoom="13" />
              <Button name="Open on Google map" onClick={handleOnClickOpenMap} />
            </div>
          </InformationCard>
          <InformationCard title="Contact" className="contact">
            <div className="content">
              {contact.map((item) => (
                <Button
                  key={item.id}
                  contact={item}
                  className={`btn-contact-${item.type.toLowerCase()}`}
                  onClick={() => handleOnClickOpenContact(item)}
                ></Button>
              ))}
            </div>
          </InformationCard>
        </div>
      </div>
      <div className="review-group">
        <div className="header">
          <div className="title">Reviews ({reviewList.length ? reviewList.length : 0})</div>
          {myUser ? <Button onClick={openModalReview}>Write a review</Button> : ""}
        </div>
        {reviewList.length ? (
          <>
            <SelectBox list={reviewSortItem} setValue={setSortItem} selected={sortItem} />
            <div className="review-list">
              {reviewList.map((item) => (
                <CampReviewCard review={item} key={item.id} />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Modal header="Write a review" className="modal-review" isOpen={modalReviewIsOpen} closeModal={closeModalReview}>
        <WriteAReview closeModalReview={closeModalReview} />
      </Modal>
    </div>
  );
}

export default Camp;
