import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

import Search from "./pages/search";
import HotelCards from "./pages/hotelCards";
import TripPage from "./pages/tripPage";

import { SearchOptions } from './interfaces/search';
import { HotelCardsOptions } from './interfaces/hotelCards';
import { TripPageOptions } from "./interfaces/tripPage";
import { Waypoint } from './interfaces/googleMaps';

import * as Utility from "./services/util";
import * as Yelp from "./services/yelp";

function App() {
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hotelErr, setHotelErr] = useState<string|undefined>();
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotel, setHotel] = useState<any>();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [entertainments, setEntertainments] = useState<any[]>([]);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

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
      const result = await Yelp.getYelpResult({
        location: query,
        term: "hotels",
      });
      setLoading(false);
      if (result.businesses) {
        setHotels(result.businesses);
      } else {
        setHotelErr(result.error.code)
      }
    }
  }

  const handleHotelSelect = async (hotel:any):Promise<void> => {
    setHotel(hotel);
    const { longitude, latitude } = hotel.coordinates;
    const restaurantResult = await Yelp.getYelpResult({ 
      longitude: longitude,
      latitude: latitude,
      term: "restaurant",
    });
    const entertainmentResult = await Yelp.getYelpResult({ 
      longitude: longitude,
      latitude: latitude,
      term: "entertainment",
    });
    setRestaurants(restaurantResult);
    setEntertainments(entertainmentResult);
  };

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
    errMsg: hotelErr,
    setHotel: handleHotelSelect,
  }

  const tripPageOptions: TripPageOptions = {
    hotel,
    entertainments,
    restaurants,
    waypoints,
    setWaypoints,
  }

  return (
    <div className="App app-background py-5">
      <TripPage options={tripPageOptions} />
      <Search options={searchOptions} />
      <HotelCards options={hotelCardsOptions} />
    </div>
  );
}

export default App;
