import React, { useState, useEffect } from 'react';
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
import * as Trips from "./services/trips";

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
  const [preventReroute, setPreventReroute] = useState<boolean>(false);
  const [days, setDays] = useState<Waypoint[][]>([]);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [idQuery, setIdQuery] = useState<string>("");
  const [tripId, setTripId] = useState<string|undefined>();

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
        setDays(new Array(dayStaying))
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

  const handleLoad = async ():Promise<void> => {
    const query = {
      id: idQuery,
      // id: "65aefe9b71ff1d603c7c251d", // dummy for now
    };

    const response = await Trips.getTrip(query);

    if (response[0] === 200) {
      const result = response[1];

      setStartDate(result.startDate);
      setEndDate(result.endDate);
      await handleHotelSelect(result.hotel)
      setTripId(result._id)
      setDays(result.days);
      setCurrentDay(0);
      setWaypoints(result.days[currentDay] || [])
    } else {
      alert("Sorry can't find a trip with that trip id!")
      setIdQuery("");
    }
  }

  const handleSave = async():Promise<void> => {
    const query = {
      name: "Test Trip",
      days: days,
      hotel: hotel,
      startDate,
      endDate,
      tripId,
    }

    const result = await Trips.saveTrip(query);
    setTripId(result._id)
  }

  useEffect(():void => {
    console.log("am i firing?")
    setWaypoints(days[currentDay] || [])
}, [currentDay])

  const searchOptions: SearchOptions = {
    query,
    startDate,
    endDate,
    loading,
    idQuery,
    setIdQuery,
    setQuery,
    setEndDate,
    setStartDate,
    submit: handleSubmit,
    handleLoad: handleLoad,
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
    preventReroute,
    currentDay,
    days,
    tripId,
    setDays,
    setCurrentDay,
    setPreventReroute,
    setWaypoints,
    handleSave: handleSave,
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
