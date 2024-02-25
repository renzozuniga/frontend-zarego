import CountryService from "../CountryService";
import axios from "axios";

jest.mock("axios");

describe("Country service", () => {
  const page = 1;
  const rows = 10;
  const list = "1,2,3,4,5";

  describe("Get Countries", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("with success", () => {
      const url = `${process.env.REACT_APP_BACKEND_ZAREGO}api/countries?page=${page}&rows=${rows}`;

      const data = {};

      beforeEach(() => {
        axios.get.mockResolvedValue(data);
      });

      it("should call axios get with given url", async () => {
        await CountryService.getCountries(page, rows);
        const headers = {
          "Content-Type": "application/json",
          accept: " */*",
        };
        expect(axios.get).toHaveBeenCalledWith(url, { headers: headers });
      });

      it("should call axios get with given url and list", async () => {
        await CountryService.getCountries(page, rows, list);
        const headers = {
          "Content-Type": "application/json",
          accept: " */*",
        };
        expect(axios.get).toHaveBeenCalledWith(`${url}&list=${list}`, {
          headers: headers,
        });
      });
    });

    describe("with error", () => {
      it("should get status code 500 and an error message", async () => {
        const mError = new Error("api");
        mError.response = {};
        mError.response.data = { key: "Error network" };
        mError.response.status = 500;
        mError.response.statusText = "Error";
        axios.get.mockRejectedValueOnce(mError);
        try {
          await CountryService.getCountries(page, rows);
        } catch (err) {
          expect(err.response.status).toEqual(500);
          expect(err.response.statusText).toEqual("Error");
        }
      });

      it("should get network error", async () => {
        const mError = new Error("Error network");
        axios.get.mockRejectedValueOnce(mError);
        try {
          await CountryService.getCountries(page, rows);
        } catch (err) {
          expect(err.message).toEqual("Error network");
        }
      });
    });
  });

  describe("Get All Countries", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("with success", () => {
      const url = `${process.env.REACT_APP_BACKEND_ZAREGO}api/countries/all?list=${list}`;

      const data = {};

      beforeEach(() => {
        axios.get.mockResolvedValue(data);
      });

      it("should call axios get with given url", async () => {
        await CountryService.getAllCountries(list);
        const headers = {
          "Content-Type": "application/json",
          accept: " */*",
        };
        expect(axios.get).toHaveBeenCalledWith(url, { headers: headers });
      });
    });

    describe("with error", () => {
      it("should get status code 500 and an error message", async () => {
        const mError = new Error("api");
        mError.response = {};
        mError.response.data = { key: "Error network" };
        mError.response.status = 500;
        mError.response.statusText = "Error";
        axios.get.mockRejectedValueOnce(mError);
        try {
          await CountryService.getAllCountries(list);
        } catch (err) {
          expect(err.response.status).toEqual(500);
          expect(err.response.statusText).toEqual("Error");
        }
      });

      it("should get network error", async () => {
        const mError = new Error("Error network");
        axios.get.mockRejectedValueOnce(mError);
        try {
          await CountryService.getAllCountries(list);
        } catch (err) {
          expect(err.message).toEqual("Error network");
        }
      });
    });
  });

  describe("Get All Countries", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("with success", () => {
      const url = `${process.env.REACT_APP_BACKEND_ZAREGO}api/countries/options`;

      const data = {};

      beforeEach(() => {
        axios.get.mockResolvedValue(data);
      });

      it("should call axios get with given url", async () => {
        await CountryService.getCountriesOptions();
        const headers = {
          "Content-Type": "application/json",
          accept: " */*",
        };
        expect(axios.get).toHaveBeenCalledWith(url, { headers: headers });
      });
    });

    describe("with error", () => {
      it("should get status code 500 and an error message", async () => {
        const mError = new Error("api");
        mError.response = {};
        mError.response.data = { key: "Error network" };
        mError.response.status = 500;
        mError.response.statusText = "Error";
        axios.get.mockRejectedValueOnce(mError);
        try {
          await CountryService.getCountriesOptions();
        } catch (err) {
          expect(err.response.status).toEqual(500);
          expect(err.response.statusText).toEqual("Error");
        }
      });

      it("should get network error", async () => {
        const mError = new Error("Error network");
        axios.get.mockRejectedValueOnce(mError);
        try {
          await CountryService.getCountriesOptions();
        } catch (err) {
          expect(err.message).toEqual("Error network");
        }
      });
    });
  });
});
