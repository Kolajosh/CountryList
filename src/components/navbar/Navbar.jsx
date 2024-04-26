import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../routes/constants";
import { TextInput } from "../reusables/TextInput";

const Navbar = ({ setSearchParams }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky text-white px-10 flex justify-between items-center top-0 py-3 bg-black w-full">
        <div
          onClick={() => navigate(APP_PATHS.LANDING)}
          className="z-50 cursor-pointer w-full font-bold"
        >
          Country List
        </div>
        <div className="w-full">
          <TextInput
            placeHolder="Search Country"
            handleChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
