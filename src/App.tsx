import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import Search from "./pages/search";
import { SearchOptions } from './interfaces/search';
import * as Utility from "./services/util";

function App() {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const searchOptions: SearchOptions = {
    query,
    startDate,
    endDate,
    setQuery,
    setEndDate,
    setStartDate,
    submit: () => console.log(Utility.dayOutputter(startDate, endDate))
  }

  return (
    <div className="App app-background py-5">
      <Search options={searchOptions} />
    </div>
  );
}

export default App;
