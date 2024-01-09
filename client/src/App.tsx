import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import Search from "./pages/search";
import { SearchOptions } from './interfaces/search';
import * as Utility from "./services/util";
import * as Yelp from "./services/yelp";

function App() {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSubmit = ():void => {
    const dayStaying: number|null = Utility.dayOutputter(startDate, endDate);

    if (dayStaying === null) {
      alert("Please fill in some dates.");
    } else if (dayStaying <= 0) {
      alert("You can't go back in time. Sorry.")
    } else if (query === "") {
      alert("You need to input a destination");
    } else {
      console.log('were finding a hotel')
      Yelp.myHotel(query);
    }
  }

  const searchOptions: SearchOptions = {
    query,
    startDate,
    endDate,
    setQuery,
    setEndDate,
    setStartDate,
    submit: handleSubmit,
  }

  return (
    <div className="App app-background py-5">
      <Search options={searchOptions} />
    </div>
  );
}

export default App;
