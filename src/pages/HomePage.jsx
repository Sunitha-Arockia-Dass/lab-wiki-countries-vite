import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")

      .then((country) => {
        setCountries(country.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div
        className="container"
        style={{ maxHeight: "90vh", overflow: "scroll" }}
      >
        <h2 style={{ fontSize: "24px" }}>
          WikiCountries: Your Guide to the World
        </h2>

        <div className="list-group">
          {countries.map((country) => {
            return (
              <div key={country._id}>
                <Link
                  to={`/:${country.alpha3Code}`}
                  style={{ fontWeight: "bold" }}
                  className="list-group-item list-group-item-action"
                >
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt="country flag"
                    width="auto"
                    height="36"
                  ></img>
                  <br />
                  {country.name.common}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
