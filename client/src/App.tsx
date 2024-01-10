import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

import Search from "./pages/search";
import HotelCards from "./pages/hotelCards";

import { SearchOptions } from './interfaces/search';
import * as Utility from "./services/util";
import * as Yelp from "./services/yelp";
import { HotelCardsOptions } from './interfaces/hotelCards';

function App() {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hotelErr, setHotelErr] = useState<string|undefined>();
  const [hotels, setHotels] = useState<any[]>([]);

  const handleSubmit = async ():Promise<void> => {
    const dayStaying: number|null = Utility.dayOutputter(startDate, endDate);
    setHotelErr(undefined);
    setLoading(true);

    if (dayStaying === null) {
      alert("Please fill in some dates.");
    } else if (dayStaying <= 0) {
      alert("You can't go back in time. Sorry.")
    } else if (query === "") {
      alert("You need to input a destination");
    } else {
      const result = await Yelp.myHotel(query);
      setLoading(false);
      if (result.businesses) {
        setHotels(result.businesses);
      } else {
        setHotelErr(result.error.code)
      }
    }
  }

  const searchOptions: SearchOptions = {
    query,
    startDate,
    endDate,
    loading,
    setQuery,
    setEndDate,
    setStartDate,
    submit: handleSubmit,
  }

  const hotelCardsOptions: HotelCardsOptions = {
    hotels: hotels,
    errMsg: hotelErr
  }

  return (
    <div className="App app-background py-5">
      <Search options={searchOptions} />
      <HotelCards options={hotelCardsOptions} />
    </div>
  );
}

export default App;
