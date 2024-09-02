import { Link } from "react-router-dom";

import AccountNavPage from "../AccountNavPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNavPage />

      <div className="text-center">
        <Link
          to={"/account/accommodations/new"}
          className="bg-primary rounded-full px-6 py-2 text-white inline-flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Place
        </Link>
        <div className="mt-4 ">
          {places.length > 0 &&
            places.map((place) => (
              <div
                key={place._id}
                className="bg-gray-300 p-4 rounded-2xl flex gap-2 "
              >
                <div className="bg-gray-500 h-40 w-36 shrink-0 grow rounded-xl">
                  {place.photo.length > 0 && (
                    <img scr={place.photo[0]} alt="image" />
                  )}
                </div>

                <div className="grow">
                  <h1 className="text-2xl ">{place.title}</h1>
                  <p className="text-sm">{place.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
