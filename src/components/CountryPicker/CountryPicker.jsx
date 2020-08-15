import React, { useState, useEffect } from "react";
/*useState and useEffect are hooks*/
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountry }) => {
  const [fetchedCountries, setfetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setfetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setfetchedCountries]); /*used trigger to fetch the countries change*/

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountry(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, i) =>
          <option key={i}>{country}</option>
        )}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
