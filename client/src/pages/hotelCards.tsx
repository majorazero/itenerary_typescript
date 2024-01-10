import React, { FunctionComponent } from "react";
import { HotelCardsOptions } from "../interfaces/hotelCards";
import { yelpStar } from "../services/yelp";

type HotelCardsProps = {
    options: HotelCardsOptions
}

const hotelCard: FunctionComponent<any> = (hotel, setHotel) => (
    <div className="card col-3 py-3 hotel-card" key={hotel.id}>
        <img className="hotel-pic mx-auto" src={hotel.image_url} alt={`Location at ${hotel.name}`}></img>
        <h5 className="hotel-name">{hotel.name}</h5>
        <h6 className="hotel-price">{hotel.price}</h6>
        <img className="py-2 hotel-star" src={yelpStar(hotel.rating)}></img>
        <small>Reviews: {hotel.review_count}</small>
        <h6>Phone: {hotel.phone}</h6>
        {hotel.location.display_address.map((line: string) => 
            <small>{line}</small>
        )}
        <button className='mt-3 btn btn-primary' onClick={() => setHotel(hotel)}>Select</button>
    </div>
)

const hotelCards: FunctionComponent<HotelCardsProps> = ({ options }) => {
    if (options.errMsg) {
        return (
            <div className="container card py-5">
                <div className="row">
                    <div className='col-12'>
                        Seems like we can't find any hotels at the location! Try again!
                    </div>
                </div>
            </div>
        )
    }
    if (!options.hotels.length) return null;
    return (
        <div className="container py-5 mw-100">
            <div className="row">
              {options.hotels.map((hotel: any) => hotelCard(hotel, options.setHotel))}
            </div>
        </div>
    )
}

export default hotelCards;