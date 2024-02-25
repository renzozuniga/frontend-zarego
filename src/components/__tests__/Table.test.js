import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Table from "../Table";
import * as FileSaver from "file-saver";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

const selected = [];

const mockCountriesEmpty = {
  metadata: {
    page: 1,
    rows: 10,
    total_registers: 0,
  },
  data: [],
};

const mockCountries = {
  metadata: {
    page: 1,
    rows: 10,
    total_registers: 2,
  },
  data: [
    {
      id: 1,
      country_name: "England",
      performance_oriented: 6.38,
      autocratic: 2.55,
      modesty: 4.91,
      country_cluster: "Anglo",
      charisma: 6.01,
      decisive: 6,
      date_added: "02-25-2024",
    },
    {
      id: 2,
      country_name: "Costa Rica",
      performance_oriented: 6.15,
      autocratic: 2.46,
      modesty: 5.48,
      country_cluster: "Latin America",
      charisma: 5.95,
      decisive: 5.66,
      date_added: "02-25-2024",
    },
  ],
};

const mockCountriesAll = {
  metadata: {
    page: 5,
    rows: 10,
    total_registers: 62,
  },
  data: [
    {
      id: 41,
      country_name: "Netherlands",
      performance_oriented: 5.95,
      autocratic: 2.08,
      modesty: 4.71,
      country_cluster: "Germanic Europe",
      charisma: 5.98,
      decisive: 5.87,
      date_added: "02-25-2024",
    },
    {
      id: 42,
      country_name: "France",
      performance_oriented: 5.1,
      autocratic: 2.36,
      modesty: 4.27,
      country_cluster: "Latin Europe",
      charisma: 4.93,
      decisive: 5.06,
      date_added: "02-25-2024",
    },
    {
      id: 43,
      country_name: "French Switzerland",
      performance_oriented: 5.82,
      autocratic: 2.91,
      modesty: 4.52,
      country_cluster: "Latin Europe",
      charisma: 5.9,
      decisive: 5.79,
      date_added: "02-25-2024",
    },
    {
      id: 44,
      country_name: "Australia",
      performance_oriented: 6.35,
      autocratic: 2.28,
      modesty: 5.09,
      country_cluster: "Anglo",
      charisma: 6.09,
      decisive: 6.02,
      date_added: "02-25-2024",
    },
    {
      id: 45,
      country_name: "Greece",
      performance_oriented: 5.82,
      autocratic: 2.14,
      modesty: 5.28,
      country_cluster: "Eastern Europe",
      charisma: 6.01,
      decisive: 6.18,
      date_added: "02-25-2024",
    },
    {
      id: 46,
      country_name: "Sweden",
      performance_oriented: 5.96,
      autocratic: 2.41,
      modesty: 4.59,
      country_cluster: "Nordic Europe",
      charisma: 5.84,
      decisive: 5.59,
      date_added: "02-25-2024",
    },
    {
      id: 47,
      country_name: "South Africa (White Sample)",
      performance_oriented: 6.01,
      autocratic: 2.3,
      modesty: 5.33,
      country_cluster: "Anglo",
      charisma: 5.99,
      decisive: 6.07,
      date_added: "02-25-2024",
    },
    {
      id: 48,
      country_name: "Canada (English-speaking)",
      performance_oriented: 6.43,
      autocratic: 1.89,
      modesty: 5.21,
      country_cluster: "Anglo",
      charisma: 6.15,
      decisive: 6.03,
      date_added: "02-25-2024",
    },
    {
      id: 49,
      country_name: "Brazil",
      performance_oriented: 6.36,
      autocratic: 1.93,
      modesty: 5.44,
      country_cluster: "Latin America",
      charisma: 6,
      decisive: 5.7,
      date_added: "02-25-2024",
    },
    {
      id: 50,
      country_name: "Kuwait",
      performance_oriented: 6.08,
      autocratic: 2.96,
      modesty: 5.33,
      country_cluster: "Middle East",
      charisma: 5.9,
      decisive: 5.58,
      date_added: "02-25-2024",
    },
  ],
};

describe("Table component", () => {
  const getCountries = jest.fn();
  const getAllCountries = jest.fn();

  describe("defaults", () => {
    it("should show title", async () => {
      getCountries.mockReturnValue(mockCountriesEmpty);
      render(
        <Table
          getCountries={getCountries}
          getAllCountries={getAllCountries}
          selected={selected}
        />
      );

      await waitFor(() =>
        expect(screen.getAllByText("NO SELECTION").length).toBe(1)
      );
    });
  });

  describe("actions", () => {
    it("should handle post per page", async () => {
      getCountries.mockReturnValue(mockCountries);
      render(
        <Table
          getCountries={getCountries}
          getAllCountries={getAllCountries}
          selected={selected}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByText("Download PDF").length).toBe(1);
        const selectButton = screen.getByTestId("select-perpage");
        fireEvent.change(selectButton);
      });
    });

    it("should handle pdf button", async () => {
      getCountries.mockReturnValue(mockCountries);
      getAllCountries.mockReturnValue(mockCountries);
      render(
        <Table
          getCountries={getCountries}
          getAllCountries={getAllCountries}
          selected={selected}
        />
      );

      await waitFor(() => {
        const downloadButton = screen.getByTestId("button-download");
        fireEvent.click(downloadButton);
        expect(FileSaver.saveAs).toHaveBeenCalled();
      });
    });

    it("should handle previous button", async () => {
      getCountries.mockReturnValue(mockCountries);
      getAllCountries.mockReturnValue(mockCountries);
      render(
        <Table
          getCountries={getCountries}
          getAllCountries={getAllCountries}
          selected={selected}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByText("Download PDF").length).toBe(1);
        const prevButton = screen.getByTestId("button-prev");
        fireEvent.click(prevButton);
      });
    });

    it("should handle next button", async () => {
      getCountries.mockReturnValue(mockCountries);
      getAllCountries.mockReturnValue(mockCountries);
      render(
        <Table
          getCountries={getCountries}
          getAllCountries={getAllCountries}
          selected={selected}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByText("Download PDF").length).toBe(1);
        const nextButton = screen.getByTestId("button-next");
        fireEvent.click(nextButton);
      });
    });

    it("should handle arr button", async () => {
      getCountries.mockReturnValue(mockCountriesAll);
      render(
        <Table
          getCountries={getCountries}
          getAllCountries={getAllCountries}
          selected={selected}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByText("Download PDF").length).toBe(1);
        const arrButton = screen.getAllByTestId("button-arr");
        console.log("arrButton: ", arrButton.length);
        for (let btn of arrButton) {
          fireEvent.click(btn);
        }
      });
    });
  });
});
