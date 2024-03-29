import { Dispatch, SetStateAction } from "react";

export interface SearchOptions {
    query: string,
    startDate: string,
    endDate: string,
    loading: boolean,
    idQuery: string,
    setIdQuery:  Dispatch<SetStateAction<string>>,
    setQuery: Dispatch<SetStateAction<string>>,
    setStartDate: Dispatch<SetStateAction<string>>,
    setEndDate: Dispatch<SetStateAction<string>>,
    submit: () => void,
    handleLoad: () => void,
}