import React, { FunctionComponent } from "react";
import { SearchOptions } from "../interfaces/search";

type SearchProps = {
    options: SearchOptions;
}

const SearchPage: FunctionComponent<SearchProps> = ({ options }) => {
    return (
        <div className="container card py-5">
            <div className="card-body">
                <h1>Where are you going?</h1>
                <div className="row">
                    <div className="col-12">
                        <h2>Destination</h2>
                        <input value={options.query} onChange={(e) => options.setQuery(e.target.value)}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h2>Start Date</h2>
                        <input
                            value={options.startDate}
                            onChange={(e) => options.setStartDate(e.target.value)} 
                            type='date' />
                    </div>
                    <div className="col-6">
                        <h2>End Date</h2>
                        <input 
                            value={options.endDate}
                            onChange={(e) => options.setEndDate(e.target.value)}
                            type='date' />
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-12">
                        <button
                            onClick={() => console.log(options)}
                            className="btn btn-rounded btn-primary w-100">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;