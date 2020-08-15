import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, [dailyData]);
  // In useEffect, we have to put an empty array or an array to make it as ComponentDidMount

  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: ["Infected", "Recovered", "Deaths"],
            datasets: [
              {
                label: "People",
                backgroundColor: [
                  "rgba(255, 136, 0, 0.644)",
                  "rgba(9, 255, 0, 0.685)",
                  "rgba(255, 12, 12)",
                ],
                data: [confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      )
      : null
  );

  const lineChart = (
    dailyData.length
      ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "blue",
              fill: true,
            }, {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            }],
          }}
        />
      )
      : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
