import React, { FunctionComponent } from "react";
import { yelpStar } from "../services/yelp";

type RowProps = {
    entries: any[],
}

const RowRenderer: FunctionComponent<RowProps> = ({ entries }) => {
    if (!entries) return null;

    return (
        <div>
            {entries.map((entry) => 
                <div className="card container" key={entry.id}>
                    <div className="row">
                        <div className="col-3">
                            <img className="img-fluid" src={entry.image_url} alt={entry.name}></img>
                        </div>
                        <div className="col-9 text-start">
                            <h5>{entry.name}</h5>
                            <div>Price: {entry.price}</div>
                            <div>Phone: {entry.phone}</div>
                            <img className="py-2 hotel-star" src={yelpStar(entry.rating)} alt={`${entry.rating} stars`}></img>
                            <br/>
                            {entry.location.display_address.map((line: string) => 
                                <small key={Math.random()}>{line}</small>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RowRenderer;