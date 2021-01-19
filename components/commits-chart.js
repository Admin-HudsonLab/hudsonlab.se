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
    Chart.defaults.elements.line.tension = 0.35;
    Chart.defaults.plugins.tooltip.enabled = false;
    Chart.defaults.elements.point.radius = 0;
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
            backgroundColor: "#211F43",
            pointBackgroundColor: "#F87171",
            data: commitsActivity.commitsActivityRedmagpie.allTotal,
          },
          {
            label: "2019_CRISPRi_library",
            backgroundColor: "#F77034",
            pointBackgroundColor: "black",
            data: commitsActivity.commitsActivity2019_CRISPRi_library.allTotal,
          },
          {
            label: "genome-scale-models",
            backgroundColor: "#2F818B",
            pointBackgroundColor: "#BAD2DC",
            data: commitsActivity.commitsActivityGenomeScaleModels.allTotal,
          },
          {
            label: "FUREE",
            backgroundColor: "#57914B",
            pointBackgroundColor: "#737D93",
            data: commitsActivity.commitsActivityFUREE.allTotal,
          },
          {
            label: "CBB_Kinetics",
            backgroundColor: "#E0E998",
            pointBackgroundColor: "black",
            data: commitsActivity.commitsActivityCBBKinetics.allTotal,
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
        aspectRatio: 2.85,
        scales: {
          x: {
            type: "time",
            time: {
              displayFormats: {
                month: "MMM yyyy",
              },
              minUnit: "month",
            },
            display: true,
          },
          y: {
            scaleLabel: {
              display: true,
              labelString: "Commits",
              padding: 1,
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section id="chart-container-section">
      <div id="chart-container" className="w-screen-xl -mx-24">
        <canvas id="myChart"></canvas>
      </div>
    </section>
  );
}
