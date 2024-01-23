import React, { FunctionComponent } from "react";
import { SearchOptions } from "../interfaces/search";

type SearchProps = {
    options: SearchOptions;
}

const SearchPage: FunctionComponent<SearchProps> = ({ options }) => {
    const {
        startDate,
        endDate,
        loading,
        idQuery,
        setIdQuery,
        setQuery,
        setStartDate,
        setEndDate,
        submit,
        handleLoad
    } = options;
    return (
        <div className="container card py-5">
            <div className="row">
                <div className="col-12 text-start">
                    <span className='mx-3'>Have a previous trip saved?</span>
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-start">
                    <input value={idQuery} onChange={(e) => setIdQuery(e.target.value)} placeholder="Trip Id..." className="mx-3"/>
                    <button className='btn btn-primary' onClick={handleLoad}>Load Trip</button>
                </div>
            </div>
            <div className="card-body">
                <h1>Where are you going?</h1>
                <div className="row">
                    <div className="col-12">
                        <h2>Destination</h2>
                        <input value={options.query} onChange={(e) => setQuery(e.target.value)}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h2>Start Date</h2>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} 
                            type='date' />
                    </div>
                    <div className="col-6">
                        <h2>End Date</h2>
                        <input 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type='date' />
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-12">
                        <button
                            onClick={submit}
                            disabled={loading}
                            className="btn btn-rounded btn-primary w-100">{options.loading ? "Loading..." : "Submit" }</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;