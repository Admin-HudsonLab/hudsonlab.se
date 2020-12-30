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
            label: "RedMAGPIE",
            backgroundColor: "#EC4899",
            borderColor: "#EC4899",
            data: commitsActivity.allTotal,
          },
        ],
      },

      // Configuration options go here
      options: {
        aspectRatio: 2.5,
        title: {
          display: true,
          fontSize: 16,
          text: "Commits Activity on GitHub",
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  month: "MMMM",
                }
              },
            },
          ],
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section>
      <div id="chart-container" className="w-3/4">
        <canvas id="myChart"></canvas>
      </div>
    </section>
  );
}
