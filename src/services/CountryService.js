import axios from "axios";

const getCountries = async (page, rows, list) => {
  try {
    let url = `${process.env.REACT_APP_BACKEND_ZAREGO}api/countries?page=${page}&rows=${rows}`;
    if (list) {
      url += `&list=${list}`;
    }

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        accept: " */*",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllCountries = async (list) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ZAREGO}api/countries/all?list=${list}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: " */*",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const getCountriesOptions = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ZAREGO}api/countries/options`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: " */*",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const CountryService = {
  getCountries,
  getAllCountries,
  getCountriesOptions,
};

export default CountryService;
