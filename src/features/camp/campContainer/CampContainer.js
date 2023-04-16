import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as constant from "../../../config/constant";
import {
  thunk_getCampById,
  selectCamp,
  selectCampImage,
  selectProvince,
  selectCampName,
  selectOverview,
  selectLocation,
  selectContact,
  selectReviewList
} from "../../../stores/campSlice";
import { selectMe } from "../../../stores/myUserSlice";
import { reviewSortItem } from "../../../constants/constant";

import Carousel from "../../../components/carousel/Carousel";
import IconText from "../../../components/iconText/IconText";
import ShareSocial from "../../../components/shareSocial/ShareSocial";
import InformationCard from "../../../components/infomationCard/InformationCard";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";
import Map from "../../../components/map/Map";
import Button from "../../../components/button/Button";
import CampReviewCard from "../campReviewCard/CampReviewCard";
import SelectBox from "../../../components/selectBox/SelectBox";
import Modal from "../../../components/modal/Modal";
import WriteAReview from "../writeAReview/WriteAReview";

function Camp() {
  const { campId } = useParams();
  const dispatch = useDispatch();

  const [modalReviewIsOpen, setModalReviewIsOpen] = useState(false);
  const [sortItem, setSortItem] = useState("");

  const myUser = useSelector(selectMe);

  const camp = useSelector(selectCamp);
  const imageList = useSelector(selectCampImage);
  const province = useSelector(selectProvince);
  const campName = useSelector(selectCampName);
  const overview = useSelector(selectOverview);
  const location = useSelector(selectLocation);
  const contact = useSelector(selectContact);
  const reviewList = useSelector((state) => selectReviewList(state, sortItem));

  const general = filterInformation(constant.GENERAL);
  const service = filterInformation(constant.SERVICE);
  const activity = filterInformation(constant.ACTIVITY);
  const rule = filterInformation(constant.RULE);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getCampById(campId));
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [campId, dispatch]);

  function filterInformation(type) {
    return camp.CampInformations ? camp.CampInformations.filter((item) => item.InformationItem.type === type) : [];
  }

  function informationContent(list) {
    return (
      <>
        {list.map((item) => (
          <IconTextInfo
            iconImage={item.InformationItem.iconImage}
            title={item.InformationItem.title}
            subTitle1={item.subTitle1}
            subTitle2={item.subTitle2}
            key={item.id}
          />
        ))}
      </>
    );
  }

  function handleOpenMap() {
    window.open(
      `https://www.google.com/maps/@?api=1&map_action=map&center=${location.lat}%2c${location.lng}&zoom=17`,
      "_blank"
    );
  }

  function handleOpenContact(item) {
    if (item.type === constant.PHONE) window.location.assign(`tel:${item.contact}`);
    if (item.type === constant.FACEBOOK || item.type === constant.WEBSITE || item.type === constant.LINE)
      window.open(item.contact);
  }

  const openModalReview = () => setModalReviewIsOpen(true);
  const closeModalReview = () => setModalReviewIsOpen(false);

  return (
    <div className="camp-container col-8">
      <div className="header-background" />
      <Carousel list={imageList} />

      <div className="location-share">
        <IconText name={province} type="location" to="/findacamp" state={{ provinceFilter: camp.Province?.id }} />
        <ShareSocial />
      </div>

      <div className="camp-name">{campName}</div>
      <div className="information-group">
        <div className="group-1 col-8">
          {overview ? (
            <InformationCard title="Overview" className="overview">
              <div className="content" dangerouslySetInnerHTML={{ __html: overview }}></div>
            </InformationCard>
          ) : (
            ""
          )}

          {general ? (
            <InformationCard title="General Information" className="general-information">
              <div className="content">{informationContent(general)}</div>
            </InformationCard>
          ) : (
            ""
          )}

          {service.length ? (
            <InformationCard title="Services" className="service">
              <div className="content">{informationContent(service)}</div>
            </InformationCard>
          ) : (
            ""
          )}

          {activity.length ? (
            <InformationCard title="Activities" className="activity">
              <div className="content">{informationContent(activity)}</div>
            </InformationCard>
          ) : (
            ""
          )}

          {rule.length ? (
            <InformationCard title="Rule" className="rule">
              <div className="content">{informationContent(rule)}</div>
            </InformationCard>
          ) : (
            ""
          )}
        </div>

        <div className="group-2 col-4">
          <InformationCard title="Map" className="map">
            <div className="content">
              <Map locationList={[location]} zoom="13" />
              <Button name="Open on Google map" onClick={handleOpenMap} />
            </div>
          </InformationCard>
          <InformationCard title="Contact" className="contact">
            <div className="content">
              {contact.map((item) => (
                <Button
                  key={item.id}
                  contact={item}
                  className={`btn-contact-${item.type.toLowerCase()}`}
                  onClick={() => handleOpenContact(item)}
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
        <SelectBox list={reviewSortItem} setValue={setSortItem} selected={sortItem} />
        <div className="review-list">
          {reviewList.map((item) => {
            return <CampReviewCard review={item} key={item.id} />;
          })}
        </div>
      </div>
      <Modal header="Write a review" isOpen={modalReviewIsOpen} closeModal={closeModalReview}>
        <WriteAReview closeModalReview={closeModalReview} />
      </Modal>
    </div>
  );
}

export default Camp;
