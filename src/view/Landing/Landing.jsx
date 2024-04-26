import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import useApiRequest from "../../utils/hooks/useApiRequest";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import CenterModal from "../../components/Modal/CenterModal";

const Landing = () => {
  // hooks
  const makeRequest = useApiRequest();
  const [countries, setCountries] = useState();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [modal, toggleModal] = useState(false);
  const [details, setDetails] = useState({});
  const [searchParams, setSearchParams] = useState("");

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // function to get list of countries
  const getCountries = async () => {
    try {
      const response = await makeRequest.get("all");
      if (response?.status === 200) {
        setCountries(response?.data);
      }
    } catch (error) {
      ToastNotify({
        type: "error",
        message: "An error occured, try again later",
        position: "top-right",
      });
    }
  };

  // trigger function on load
  useEffect(() => {
    getCountries();
  }, []);

  // function to filter list based on country official name
  const filteredList = countries?.filter((x) =>
    x?.name.official.toLowerCase().includes(searchParams.toLowerCase())
  );

  return (
    <>
      <div className="relative bg-white text-black font-jarkata w-full h-screen overflow-scroll">
        <Navbar setSearchParams={setSearchParams} />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {/* map country items */}
          {filteredList?.map((x, index) => (
            <div key={index}>
              <div
                className="relative w-full h-full cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={() => {
                  setDetails(x);
                  toggleModal(true);
                }}
              >
                <img
                  className="w-90 h-full object-cover"
                  src={x?.flags.svg}
                  alt={x?.flags.alt}
                />
                <div
                  className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                    hoverIndex === index ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="bg-black h-full w-full flex items-center justify-center bg-opacity-50 p-2">
                    <p className="text-white text-lg font-bold text-center">
                      {x?.name.official}
                    </p>
                  </div>
                </div>
                <div
                  className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                    hoverIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="bg-black h-full w-full flex items-center justify-center bg-opacity-50 p-2">
                    <p className="text-white text-md font-light text-center">
                      Click to view Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pop up modal */}
      {modal && (
        <CenterModal
          title={"Country Details"}
          handleClose={() => toggleModal(false)}
        >
          <div className="w-full flex flex-col text-center items-center space-y-5 text-white">
            <img
              className="w-[90%] md:w-[60%] object-cover"
              src={details?.flags.svg}
              alt=""
            />
            <div className="w-[90%] md:w-[60%] mx-auto border p-4 rounded-xl space-y-3">
              <div className="text-xl text-center font-bold">
                {details?.name.official}
              </div>
              <div className="text-md text-center font-regular">
                <span className="font-bold">Capital: </span>
                {details?.capital.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <div>
                <span className="font-bold">Continent: </span>
                {details?.continents.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <div>
                <span className="font-bold"> Sub-Region: </span>
                {details?.subregion}
              </div>
              <div className="text-md  font-regular">
                <span className="font-bold">Languages:</span>
                {Object.keys(details?.languages).map((lang) => (
                  <div key={lang}>
                    ● {lang}: {details?.languages[lang]}
                  </div>
                ))}
              </div>
              <div>
                <span className="font-bold">Population: </span>
                {details?.population.toLocaleString()}
              </div>
              <div className="p-3 bg-[#3d3c3c] text-center rounded-xl">
                <span className="font-bold">All Time Zones</span> <br />
                <div className="grid text-left grid-cols-3 gap-1">
                  {details?.timezones.map((x) => (
                    <span key={x}>● {x}</span>
                  ))}
                </div>
              </div>
              <div className="text-md font-regular">
                <span className="font-bold">Currencies:</span>
                {Object.keys(details?.currencies).map((currency) => (
                  <div key={currency}>
                    ● {currency}: {details?.currencies[currency].name} (
                    {details?.currencies[currency].symbol})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CenterModal>
      )}
    </>
  );
};

export default Landing;
