import React, { useState } from "react";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useNavigate } from "react-router-dom";
import AccountNavPage from "../AccountNavPage";

export default function PlacesFromPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    await axios.post("/places", {
      title,
      address,
      description,
      addedPhoto,
      checkInTime,
      checkOutTime,
      maxGuests,
      extraInfo,
      perks,
    });
    navigate("/account/accommodations");
  }
  function inputHeader(text) {
    return <h5 className="text-2xl mt-2 ">{text}</h5>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm mb-1">{text}</p>;
  }
  function inputPara(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  return (
    <>
      <AccountNavPage />
      <form onSubmit={handleFormSubmit}>
        {inputPara("Title", "Title should be short and catchy.")}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {inputPara("Address", "Enter your geolocation.")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {inputPara("Photos", "More is better.")}

        <PhotosUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />

        {inputPara("Description", "Enter Interesting Details.")}
        <textarea
          className=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Perks selected={perks} onChange={setPerks} />
        {inputPara("CheckIn CheckOut", "More addon to the the information")}
        <div className="flex gap-2 mt-2">
          <div>
            <h4>CheckIn Time</h4>
            <input
              type="text"
              placeholder="14:00"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </div>
          <div>
            <h4>CheckOut Time</h4>
            <input
              type="text"
              placeholder="1:00"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </div>
          <div>
            <h4>Max Number of guests</h4>
            <input
              type="number"
              placeholder=""
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        {inputPara("Extra Info", "What you have more?")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <button className="primary">Save</button>
      </form>
    </>
  );
}
