import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function CountryDetailsPage() {
  const { countryId } = useParams();

  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries`)
      .then((countries) => {
        const filtered = countries.data.filter((country) => {
          return `:${country.alpha3Code}` === countryId;
        });
        console.log("filtered", filtered);
        if (filtered.length > 0) {
          setCountry(filtered[0]);
        } else {
          setCountry(null);
        }
      })

      .catch((err) => console.log(err));
  }, [countryId]);

  return (
    <div>
      <div className="container">
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Country Details
        </h2>

        <h1>{country.name ? country.name.common : "Loading..."}</h1>

        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area}
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {country && country.borders ? (
                    country.borders.map((border, index) => (
                      <Link
                        key={index}
                        to={`/:${border}`}
                        style={{ fontWeight: "bold", color: "blue" }}
                        className="list-group-item list-group-item-action"
                      >
                        {border}
                      </Link>
                    ))
                  ) : (
                    <li>No border information available</li>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryDetailsPage;
