import React from "react";
import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhoto, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  async function handlePhotoLink(e) {
    e.preventDefault();
    // destructuring the server data
    const { data: filename } = await axios.post("/upload-photo-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function handlePhotoUpload(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const response = await axios.post("/photo-upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { filenames } = response.data; //since we are destructuring the array
    onChange((prev) => {
      return [...prev, ...filenames];
    });
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using link of the photo"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />{" "}
        <button
          className="bg-gray-400 rounded-2xl px-2 h-10  
               text-sm"
          onClick={handlePhotoLink}
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className=" grid grid-cols-3 md:grid-clos-4 lg:grid-cols-6 gap-2">
        {addedPhoto.length > 0 &&
          addedPhoto.map((photo) => (
            <div className="flex h-32 w-full">
              <img
                key={photo}
                src={`http://localhost:8080/uploads/${photo}`}
                className="rounded-2xl object-cover "
              />
            </div>
          ))}
        <label className="cursor-pointer items-center flex text-gray-500 px-4 py-10 h-32 border border-gray-300 rounded-2xl gap-1 mb-2 bg-transparent">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handlePhotoUpload}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
