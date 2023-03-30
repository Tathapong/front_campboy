import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as constant from "../../../config/constant";
import { thunk_getCampById, selectCamp } from "../../../stores/campSlice";

import Carousel from "../../../components/carousel/Carousel";
import IconText from "../../../components/iconText/IconText";
import ShareSocial from "../../../components/shareSocial/ShareSocial";
import InformationCard from "../../../components/infomationCard/InformationCard";
import IconTextInfo from "../../../components/iconTextInfo/IconTextInfo";
import Map from "../../../components/map/Map";
import Button from "../../../components/button/Button";

function Camp() {
  const { campId } = useParams();
  const dispatch = useDispatch();

  const camp = useSelector(selectCamp);
  const imageList = camp.CampImages ? camp.CampImages.map((item) => item.image) : [];
  const province = camp.Province ? camp.Province.name[0].toUpperCase() + camp.Province.name.slice(1).toLowerCase() : "";
  const campName = camp.name;
  const overview = camp.overview;
  const location = { lat: +camp.locationLat, lng: +camp.locationLng, name: camp.name, id: camp.id };
  const contact = camp.CampContacts ? camp.CampContacts : [];

  const general = filterInformation(constant.GENERAL);
  const service = filterInformation(constant.SERVICE);
  const activity = filterInformation(constant.ACTIVITY);
  const rule = filterInformation(constant.RULE);

  function filterInformation(type) {
    return camp.CampInformations
      ? camp.CampInformations.filter((item) => {
          if (item.InformationItem.type === type) return item;
        })
      : [];
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

  const handleOpenMap = () => {
    window.open(
      `https://www.google.com/maps/@?api=1&map_action=map&center=${location.lat}%2c${location.lng}&zoom=17`,
      "_blank"
    );
  };

  const handleOpenContact = (item) => {
    if (item.type === constant.PHONE) window.location.assign(`tel:${item.contact}`);
    if (item.type === constant.FACEBOOK || item.type === constant.WEBSITE || item.type === constant.LINE)
      window.open(item.contact);
  };

  return (
    <div className="camp-container col-11">
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
    </div>
  );
}

export default Camp;
