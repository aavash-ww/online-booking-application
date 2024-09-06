import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PlacesCard() {
  const [places, setPlaces] = useState([]);
  console.log(places);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <>
      {places.length > 0 &&
        places.map((place) => (
          <Link
            key={place._id}
            to={"/account/accommodations/" + place._id}
            className="bg-gray-200 rounded-2xl p-4 flex cursor-pointer"
          >
            <div className="h-32 w-32 shrink-0 grow bg-gray-500 mr-4">
              {place.photo.length > 0 && (
                <img src={"http://localhost:8080/uploads/" + place.photo[0]} />
              )}
            </div>
            <div className="grow-0 shrink ">
              <div className="flex gap-1">
                <h1 className="text-2xl">{place.title}</h1>
                <span className="text-xs italic mt-3">{place.address}</span>
              </div>
              <p className="text-sm ">{place.description}</p>
            </div>
          </Link>
        ))}
    </>
  );
}
