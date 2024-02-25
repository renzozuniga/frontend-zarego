import React, { useEffect, useState } from "react";
import "./components.css";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import MyDocument from "./MyDocument";

const Table = (props) => {
  const { getCountries, getAllCountries, selected } = props;

  const [items, setItems] = useState();
  const [metadata, setMetadata] = useState();
  const [postPerPage, SetPostPerPage] = useState(10);
  const [currentPage, SetCurrentPage] = useState(1);
  const [selectedFormatted, setSelectedFormatted] = useState();

  useEffect(() => {
    (async () => {
      const data = await getCountries(
        currentPage,
        postPerPage,
        selected.join(",")
      );
      setItems(data.data);
      setMetadata(data.metadata);
      setSelectedFormatted(selected.join(","));
    })();
  }, [selected]);

  const handleItemPerPage = (e) => {
    SetPostPerPage(e.target.value);
    SetCurrentPage(1);
  };

  const handlePDF = async () => {
    const data = await getAllCountries(
      selected.length > 0 ? selected.join(",") : null
    );
    const blob = await pdf(<MyDocument data={data.data} />).toBlob();
    saveAs(blob, "countries_information.pdf");
  };

  const numOfPages = metadata
    ? Math.ceil(metadata.total_registers / postPerPage)
    : 0;

  const numOfButtons = [];
  for (let i = 1; i <= numOfPages; i++) {
    numOfButtons.push(i);
  }

  const prevPageClick = () => {
    if (currentPage === 1) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage + 1);
    }
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    (async () => {
      let tempNumberOfButtons = [...arrOfCurrButtons];

      let dotsInitial = "...";
      let dotsLeft = "... ";
      let dotsRight = " ...";

      if (numOfButtons.length < 6) {
        tempNumberOfButtons = numOfButtons;
      } else if (currentPage >= 1 && currentPage <= 3) {
        tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length];
      } else if (currentPage === 4) {
        const sliced = numOfButtons.slice(0, 5);
        tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
      } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
        const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
        const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
        tempNumberOfButtons = [
          1,
          dotsLeft,
          ...sliced1,
          ...sliced2,
          dotsRight,
          numOfButtons.length,
        ];
      } else if (currentPage > numOfButtons.length - 3) {
        const sliced = numOfButtons.slice(numOfButtons.length - 4);
        tempNumberOfButtons = [1, dotsLeft, ...sliced];
      } else if (currentPage === dotsInitial) {
        SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
      } else if (currentPage === dotsRight) {
        SetCurrentPage(arrOfCurrButtons[3] + 2);
      } else if (currentPage === dotsLeft) {
        SetCurrentPage(arrOfCurrButtons[3] - 2);
      }

      setArrOfCurrButtons(tempNumberOfButtons);

      if (typeof currentPage === "number") {
        const data = await getCountries(
          currentPage,
          postPerPage,
          selectedFormatted
        );
        setItems(data.data);
      }
    })();
  }, [currentPage, postPerPage, numOfPages]);

  return items && items.length > 0 ? (
    <div className="container-fluid mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body p-0">
              <div className="custom-container">
                <div className="custom-dropdown">
                  <select data-testid="select-perpage" value={postPerPage} onChange={handleItemPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div>
                <div className="custom-button">
                  <button data-testid="button-download" onClick={handlePDF}>Download PDF</button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-text-small mb-0">
                  <thead className="thead-primary table-sorting">
                    <tr>
                      <th>Country</th>
                      <th>Performance</th>
                      <th>Autocratic</th>
                      <th>Modesty</th>
                      <th>Charisma</th>
                      <th>Decisive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((data, index) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.country_name}</td>
                          <td>{data.performance_oriented}</td>
                          <td>{data.autocratic}</td>
                          <td>{data.modesty}</td>
                          <td>{data.charisma}</td>
                          <td>{data.decisive}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="table-filter-info">
                <div className="dt-pagination">
                  <ul className="dt-pagination-ul">
                    <li
                      className={`dt-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a className="dt-link" data-testid="button-prev" onClick={prevPageClick}>
                        Prev
                      </a>
                    </li>
                    {arrOfCurrButtons.map((data, index) => {
                      return (
                        <li
                          key={index}
                          className={`dt-item ${
                            currentPage === data ? "active" : ""
                          }`}
                        >
                          <a
                            className="dt-link"
                            data-testid="button-arr"
                            onClick={() => SetCurrentPage(data)}
                          >
                            {data}
                          </a>
                        </li>
                      );
                    })}
                    <li
                      className={`dt-item ${
                        currentPage === numOfButtons.length ? "disabled" : ""
                      }`}
                    >
                      <a className="dt-link" data-testid="button-next" onClick={nextPageClick}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>NO SELECTION</div>
  );
};

export default Table;
