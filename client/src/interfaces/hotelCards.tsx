import { Dispatch, SetStateAction } from "react";

export interface HotelCardsOptions {
    hotels: any,
    errMsg: string|undefined,
    setHotel: Dispatch<SetStateAction<any>>,
}