import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Countries } from "./pages/Countries/Countries";
import CountryContextProvider from "./contexts/CountryContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CountryContextProvider>
              <Countries />
            </CountryContextProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
