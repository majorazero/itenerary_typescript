import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import Search from "./pages/search";
import { SearchOptions } from './interfaces/search';

function App() {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const searchOptions: SearchOptions = {
    query,
    setQuery,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
  }

  return (
    <div className="App app-background py-5">
      <Search options={searchOptions} />
    </div>
  );
}

export default App;
