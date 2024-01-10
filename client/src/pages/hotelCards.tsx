import React, { FunctionComponent } from "react";
import { HotelCardsOptions } from "../interfaces/hotelCards";

type HotelCardsProps = {
    options: HotelCardsOptions
}

const hotelCard: FunctionComponent<any> = (hotel) => (
    <div className="card col-3" key={hotel.id}>
        <img src={hotel.image_url} alt={`Location at ${hotel.name}`}></img>
        <h5>{hotel.name}</h5>
        <h6>{hotel.price}</h6>
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
        <div className="container card py-5 mx-auto w-100">
            <div className="row">
              {options.hotels.map((hotel: any) => hotelCard(hotel))}
            </div>
        </div>
    )
}

export default hotelCards;