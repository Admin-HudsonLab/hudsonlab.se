import { useEffect } from "react";
import { Chart } from "chart.js";


export default function CommitsChart({ commitsActivity }) {

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: commitsActivity.allWeekAsTimeStamp,
        datasets: [
          {
            label: "Commit Activity",
            backgroundColor: "#EC4899",
            borderColor: "#EC4899",
            data: commitsActivity.allTotal,
          },
        ],
      },

      // Configuration options go here
      options: {},
    });
    return () => chart.destroy();
  }, []);


  return (
    <div className="chartjs-wrapper w-3/4">
      <canvas id="myChart"></canvas>
    </div>
  );
}
