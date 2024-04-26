import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../routes/constants";
import { TextInput } from "../reusables/TextInput";

const Navbar = ({ setSearchParams }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky top-0 z-50 bg-black text-white px-10 py-3 flex justify-between items-center">
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
