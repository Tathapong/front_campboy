import "./camp.css";

import { useParams } from "react-router-dom";

import camp from "../../assets/data/data.json";

import React from "react";
import Carousel from "../../components/carousel/Carousel";
import IconText from "../../components/iconText/IconText";
import PriceTag from "../../components/priceTage/PriceTag";
import ShareSocial from "../../components/shareSocial/ShareSocial";
import InformationCard from "../../components/infomationCard/InformationCard";
import IconTextInfo from "../../components/iconTextInfo/IconTextInfo";
import Map from "../../components/map/Map";
import Button from "../../components/button/Button";

function Camp() {
  const { campId } = useParams();
  const campList = Array.from(camp)[campId - 1];

  return (
    <div className="camp-container col-11">
      <div className="header-background" />
      <Carousel list={campList.images} />
      <IconText name={campList.province} type="location" />
      <PriceTag price="200" />
      <div className="title-share">
        <div className="title">{campList.camp}</div>
        <ShareSocial />
      </div>
      <div className="information-group">
        <div className="group-1 col-8">
          {campList.information["รายละเอียด"] ? (
            <InformationCard title="Overview" className="overview">
              <div className="content" dangerouslySetInnerHTML={{ __html: campList.information["รายละเอียด"] }}></div>
            </InformationCard>
          ) : (
            ""
          )}

          {campList.information["ข้อมูลสำคัญ"]?.length > 0 ? (
            <InformationCard title="General Information" className="general-information">
              <div className="content">
                {campList.information["ข้อมูลสำคัญ"].map((item, index) => {
                  return <IconTextInfo iconImage={item.src} title={item.title} sub={item.sub} key={index} />;
                })}
              </div>
            </InformationCard>
          ) : (
            ""
          )}

          {campList.information["สิ่งอำนวยความสะดวก"]?.length > 0 ? (
            <InformationCard title="Services" className="service">
              <div className="content">
                {campList.information["สิ่งอำนวยความสะดวก"].map((item, index) => {
                  return <IconTextInfo iconImage={item.src} title={item.title} sub={item.sub} key={index} />;
                })}
              </div>
            </InformationCard>
          ) : (
            ""
          )}

          {campList.information["กิจกรรม"]?.length > 0 ? (
            <InformationCard title="Activities" className="activity">
              <div className="content">
                {campList.information["กิจกรรม"].map((item, index) => {
                  return <IconTextInfo iconImage={item.src} title={item.title} sub={item.sub} key={index} />;
                })}
              </div>
            </InformationCard>
          ) : (
            ""
          )}

          {campList.information["กฎระเบียบ/ข้อบังคับ"]?.length > 0 ? (
            <InformationCard title="Rule" className="rule">
              <div className="content">
                {campList.information["กฎระเบียบ/ข้อบังคับ"].map((item, index) => {
                  return <IconTextInfo iconImage={item.src} title={item.title} sub={item.sub} key={index} />;
                })}
              </div>
            </InformationCard>
          ) : (
            ""
          )}
        </div>
        <div className="group-2 col-4">
          <InformationCard title="Map" className="map">
            <div className="content">
              <Map campList={[campList]} zoom="13" />
              <Button name="Open on Google map" />
            </div>
          </InformationCard>
          <InformationCard title="Contact" className="contact">
            <div className="content">
              {campList.contact.tel.map((item, index) => {
                return <Button name={item} className="btn-contact-tel h-40-px my-0" key={index}></Button>;
              })}
              {campList.contact.fb.map((item, index) => {
                return <Button name="Facebook" className="btn-contact-facebook h-40-px my-0" key={index} />;
              })}

              {campList.contact.line.map((item, index) => {
                return <Button name="Line" className="btn-contact-line h-40-px my-0" key={index} />;
              })}
              {campList.contact.web.map((item, index) => {
                return <Button name="Website" className="btn-contact-website h-40-px my-0" key={index} />;
              })}
            </div>
          </InformationCard>
        </div>
      </div>
    </div>
  );
}

export default Camp;
