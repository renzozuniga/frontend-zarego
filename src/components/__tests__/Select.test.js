import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Select from "../Select";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

const selected = [];

const countriesOptions = {
  data: [
    {
      label: "England",
      value: 1,
    },
    {
      label: "Costa Rica",
      value: 2,
    },
    {
      label: "Italy",
      value: 3,
    },
    {
      label: "India",
      value: 4,
    },
    {
      label: "Namibia",
      value: 5,
    },
    {
      label: "Czech Republic",
      value: 6,
    },
    {
      label: "Venezuela",
      value: 7,
    },
    {
      label: "Taiwan",
      value: 8,
    },
    {
      label: "Singapore",
      value: 9,
    },
    {
      label: "Hong Kong",
      value: 10,
    },
    {
      label: "Ecuador",
      value: 11,
    },
    {
      label: "Iran",
      value: 12,
    },
    {
      label: "Mexico",
      value: 13,
    },
    {
      label: "El Salvador",
      value: 14,
    },
    {
      label: "Israel",
      value: 15,
    },
    {
      label: "Hungary",
      value: 16,
    },
    {
      label: "Russia",
      value: 17,
    },
    {
      label: "Zambia",
      value: 18,
    },
    {
      label: "Indonesia",
      value: 19,
    },
    {
      label: "Kazakhstan",
      value: 20,
    },
    {
      label: "Zimbabwe",
      value: 21,
    },
    {
      label: "Qatar",
      value: 22,
    },
    {
      label: "South Korea",
      value: 23,
    },
    {
      label: "Morocco",
      value: 24,
    },
    {
      label: "Portugal",
      value: 25,
    },
    {
      label: "China",
      value: 26,
    },
    {
      label: "Japan",
      value: 27,
    },
    {
      label: "Colombia",
      value: 28,
    },
    {
      label: "Albania",
      value: 29,
    },
    {
      label: "Turkey",
      value: 30,
    },
    {
      label: "Finland",
      value: 31,
    },
    {
      label: "Poland",
      value: 32,
    },
    {
      label: "Egypt",
      value: 33,
    },
    {
      label: "Spain",
      value: 34,
    },
    {
      label: "South Africa (Black Sample)",
      value: 35,
    },
    {
      label: "Guatemala",
      value: 36,
    },
    {
      label: "Ireland",
      value: 37,
    },
    {
      label: "Bolivia",
      value: 38,
    },
    {
      label: "Austria",
      value: 39,
    },
    {
      label: "Switzerland",
      value: 40,
    },
    {
      label: "Netherlands",
      value: 41,
    },
    {
      label: "France",
      value: 42,
    },
    {
      label: "French Switzerland",
      value: 43,
    },
    {
      label: "Australia",
      value: 44,
    },
    {
      label: "Greece",
      value: 45,
    },
    {
      label: "Sweden",
      value: 46,
    },
    {
      label: "South Africa (White Sample)",
      value: 47,
    },
    {
      label: "Canada (English-speaking)",
      value: 48,
    },
    {
      label: "Brazil",
      value: 49,
    },
    {
      label: "Kuwait",
      value: 50,
    },
    {
      label: "Philippines",
      value: 51,
    },
    {
      label: "Argentina",
      value: 52,
    },
    {
      label: "Nigeria",
      value: 53,
    },
    {
      label: "New Zealand",
      value: 54,
    },
    {
      label: "Slovenia",
      value: 55,
    },
    {
      label: "Malaysia",
      value: 56,
    },
    {
      label: "Germany (EAST)",
      value: 57,
    },
    {
      label: "Germany (WEST)",
      value: 58,
    },
    {
      label: "Denmark",
      value: 59,
    },
    {
      label: "Georgia",
      value: 60,
    },
    {
      label: "Thailand",
      value: 61,
    },
    {
      label: "USA",
      value: 62,
    },
  ],
};

describe("Select component", () => {
  const setSelected = jest.fn();

  describe("actions", () => {
    it("should handle selection button", async () => {
      render(
        <Select
          countriesOptions={countriesOptions}
          selected={selected}
          setSelected={setSelected}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByText("CHOOSE COUNTRY").length).toBe(1);
        const selectionButton = screen.getAllByTestId("selection-button");
        fireEvent.click(selectionButton[0]);
      });
    });
  });
});
