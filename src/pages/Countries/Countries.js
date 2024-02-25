import React, { useState, useContext } from "react";
import { CountryContext } from "../../contexts/CountryContext";
import "./Countries.css";
import Table from "../../components/Table";
import Select from "../../components/Select";

export const Countries = () => {
  const { countriesOptions, getCountries, getAllCountries } =
    useContext(CountryContext);
  const [selected, setSelected] = useState([]);

  return (
    countriesOptions && (
      <div className="split-container">
        <div className="split-left">
          <Select
            countriesOptions={countriesOptions}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="split-right">
          <Table
            getCountries={getCountries}
            getAllCountries={getAllCountries}
            selected={selected}
          />
        </div>
      </div>
    )
  );
};
