import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "r2clKv7ItE52lCEbUzAp01k9mdrmvPHa3JC-zBtA0C0",
});

export default function SearchPhotos() {
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
            .photos(query,1, 40)
            .then(toJson)
            .then((json) => {
                setPics(json.results);
            });
    };
    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">Search</label>
                <input type="text" name="query" className="input" placeholder={`Search here`} value={query}
                    onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit" className="button">Search</button>
            </form>
            <div className="card-list">
                {
                    pics.map((pic) =>
                        <div className="card" key={pic.id}>
                            <img className="card--image" src={pic.urls.full} width="50%" height="50%"></img>
                        </div>)
                }
            </div>
        </>
    );
}

