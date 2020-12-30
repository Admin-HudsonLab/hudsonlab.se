import { useEffect } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Filler, Title, Legend, Tooltip } from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Filler, Title, Legend, Tooltip);

export default function CommitsChart({ commitsActivity }) {
  useEffect(() => {
    console.log(typeof commitsActivity.allWeekAsTimeStamp[0]);
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
            fill: 'origin',
            backgroundColor: "#B91C1C",
            borderColor: "#B91C1C",
            pointBackgroundColor: "#F87171",
            tension: 0.4,
            data: commitsActivity.allTotal,
          },
        ],
      },

      // Configuration options go here
      options: {
        plugins: {
          title: {
            display: true,
            text: "Commits Activity on GitHub",
          },
        },
        aspectRatio: 2.5,
        scales: {
          x: {
            type: "time",
            ticks: {
              padding: 2,
            },
            time: {
              displayFormats: {
                month: "MMMM yyyy",
              },
              minUnit: "month",
            },
            display: true,
          },
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
