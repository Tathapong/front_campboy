import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as informationService from "../../api/informationApi";
import * as joincampService from "../../api/joincampApi";

import Button from "../../components/button/Button";
import InputText from "../../components/inputText/InputText";
import SelectBox from "../../components/selectBox/SelectBox";
import CheckBoxList from "../../components/checkBoxList/CheckBoxList";
import { isNotEmpty } from "../../validation/validation";

function JoinCamp() {
  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [property, setProperty] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [line, setLine] = useState("");

  const initialError = { name: "", province: "", property: "", phone: "", email: "" };
  const [errorInput, setErrorInput] = useState(initialError);
  const [provinceList, setProvinceList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    async function fetch() {
      const provinces = await informationService.getProvince();
      const properties = await informationService.getPropertyList();

      setProvinceList((prev) => provinces);
      setPropertyList((prev) => properties);
    }
    fetch();
  }, []);

  function handleOnChangeCampName(ev) {
    setName(ev.target.value);
  }
  function handleOnChangePhone(ev) {
    setPhone(ev.target.value);
  }
  function handleOnChangeEmail(ev) {
    setEmail(ev.target.value);
  }
  function handleOnChangeFacebook(ev) {
    setFacebook(ev.target.value);
  }
  function handleOnChangeLine(ev) {
    setLine(ev.target.value);
  }

  function handleOnClickJoinMore() {
    setComplete(false);
  }

  async function handleOnSubmitForm(ev) {
    ev.preventDefault();

    try {
      //+ Validation
      const error = { ...initialError };
      setErrorInput({ ...initialError });

      //- Camp name
      if (!isNotEmpty(name)) error.name = "Camp name is required";

      //- Province
      if (!isNotEmpty(province)) error.province = "Province is required";

      //- Property type
      if (!property.length) error.property = "Property is required";

      //- Phone
      if (!isNotEmpty(phone)) error.phone = "Telephone is required";

      //- Email
      if (!isNotEmpty(email)) error.email = "Email is required";

      setErrorInput((prev) => ({ ...error }));

      const isError = error.name || error.province || error.property || error.phone || error.email;

      if (!isError) {
        const input = { name, provinceId: province, propertyType: property, phone, email };
        if (facebook) input.facebook = facebook;
        if (line) input.lineId = line;

        await joincampService.createJoincamp(input);
        setComplete(true);
        setName("");
        setProvince("");
        setProperty([]);
        setPhone("");
        setEmail("");
        setFacebook("");
        setLine("");
        toast.success("Form have benn submitted");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <div className="join-camp-group">
      <img
        src="https://res.cloudinary.com/duzw1g3u8/image/upload/v1689547441/Campboy/assets/background3_i2bdb4.jpg"
        alt="background"
        className="image-background"
      />

      {complete ? (
        <div className="submit-confirm">
          <i class="fa-sharp fa-solid fa-circle-check icon"></i>
          <div className="header">Form have been submitted</div>
          <div className="title">Thank you for joining us</div>
          <Button name="Join more" onClick={handleOnClickJoinMore}></Button>
        </div>
      ) : (
        <form className="join-camp-form">
          <div className="header-title">Submit Campsite</div>

          <div className="camp-name-group">
            <div className="title">Camp name</div>
            <InputText
              placeholder="Enter camp name"
              value={name}
              onChange={handleOnChangeCampName}
              errorText={errorInput.name}
              maxLength={100}
            />
          </div>

          <div className="province-group">
            <div className="title">Province</div>
            <SelectBox list={provinceList} selected={province} setValue={setProvince} errorText={errorInput.province} />
            {errorInput.province ? <small className="text-error">{errorInput.province}</small> : ""}
          </div>

          <div className="property-group">
            <CheckBoxList title="Property type" list={propertyList} setValue={setProperty} />
            {errorInput.property ? <small className="text-error">{errorInput.property}</small> : ""}
          </div>

          <div className="contact-group">
            <div className="title">Contact</div>

            <div className="telephone">
              <div className="label">Telephone</div>
              <InputText
                placeholder="Require"
                value={phone}
                onChange={handleOnChangePhone}
                errorText={errorInput.phone}
                maxLength={10}
              />
            </div>
            <div className="email">
              <div className="label">Email</div>
              <InputText
                placeholder="Require"
                value={email}
                onChange={handleOnChangeEmail}
                errorText={errorInput.email}
                maxLength={50}
              />
            </div>
            <div className="facebook">
              <div className="label">Facebook</div>

              <InputText
                placeholder="(Option)"
                value={facebook}
                onChange={handleOnChangeFacebook}
                errorText={errorInput.facebook}
                maxLength={150}
              />
            </div>
            <div className="line">
              <div className="label">Line ID</div>
              <InputText
                placeholder="(Option)"
                value={line}
                onChange={handleOnChangeLine}
                errorText={errorInput.line}
                maxLength={50}
              />
            </div>
          </div>
          <Button name="Submit" onClick={handleOnSubmitForm} />
        </form>
      )}
    </div>
  );
}

export default JoinCamp;
