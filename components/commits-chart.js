import { useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
  Filler,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
  Filler,
  Title,
  Legend,
  Tooltip
);

export default function CommitsChart({ commitsActivity }) {
  useEffect(() => {
    Chart.defaults.elements.line.tension = 0.5;
    Chart.defaults.elements.line.showLine = false;
    Chart.defaults.elements.line.fill = "origin";

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: commitsActivity.commitsActivityRedmagpie.allWeekAsTimeStamp,
        datasets: [
          {
            label: "RedMAGPIE",
            backgroundColor: "#B91C1C",
            pointBackgroundColor: "#F87171",
            data: commitsActivity.commitsActivityRedmagpie.allTotal,
          },
          {
            label: "genome-scale-models",
            backgroundColor: "#1E3A8A",
            pointBackgroundColor: "#F59E0B",
            data: commitsActivity.commitsActivityGenomeScaleModels.allTotal,
          },
          {
            label: "FUREE",
            backgroundColor: "yellow",
            pointBackgroundColor: "black",
            data: commitsActivity.commitsActivityFUREE.allTotal,
          },
          {
            label: "CBB_Kinetics",
            backgroundColor: "pink",
            pointBackgroundColor: "black",
            data: commitsActivity.commitsActivityCBBKinetics.allTotal,
          },
          {
            label: "2019_CRISPRi_library",
            backgroundColor: "lime",
            pointBackgroundColor: "black",
            data: commitsActivity.commitsActivity2019_CRISPRi_library.allTotal,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Commits Activity on GitHub",
          },
        },
        aspectRatio: 4,
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
    <section id="chart-container-section">
      <div id="chart-container" className="w-3/4">
        <canvas id="myChart"></canvas>
      </div>
    </section>
  );
}
