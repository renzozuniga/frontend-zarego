import React, { createContext, useEffect, useState } from "react";
import CountryService from "../services/CountryService";
import { handleErrors } from "../utils/handlerFunctions";

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
  const [countries, setCountries] = useState();
  const [countriesOptions, setCountriesOptions] = useState();
  const [countryAlert, setCountryAlert] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const countries = await CountryService.getCountries(1, 10);
        setCountries(countries.data);
        const countriesOptions = await CountryService.getCountriesOptions();
        setCountriesOptions(countriesOptions.data);
      } catch (error) {
        handleErrors(error, setCountryAlert);
      }
    })();
  }, []);

  const getCountries = async (page, rows, list) => {
    try {
      const res = await CountryService.getCountries(page, rows, list);
      return res.data;
    } catch (error) {
      handleErrors(error, setCountryAlert);
    }
  };

  const getAllCountries = async (list) => {
    try {
      const res = await CountryService.getAllCountries(list);
      return res.data;
    } catch (error) {
      handleErrors(error, setCountryAlert);
    }
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        countriesOptions,
        getCountries,
        getAllCountries,
        countryAlert,
      }}
    >
      {props.children}
    </CountryContext.Provider>
  );
};

export default CountryContextProvider;
