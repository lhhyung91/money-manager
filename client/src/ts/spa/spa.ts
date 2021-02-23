import { renderDoughnutChart, renderBarChart } from "../chart/chart_render";

interface route {
  "": string;
  chart: string;
  [propsName: string]: any;
}

const root = document.querySelector("main") as HTMLElement;

const routes: route = {
  // hash: url
  "": "./src/ts/html/home.html",
  chart: "./src/ts/html/chart.html",
};

const render = async () => {
  try {
    // url의 hash를 취득
    const hash = location.hash.replace("#", "");
    const url = routes[hash];
    if (!url) {
      root.innerHTML = `${hash} Not Found`;
      return;
    }

    const res = await fetch(url);
    const contentType = res.headers.get("content-type");

    root.innerHTML = await res.text();
    if (window.location.hash === "#chart") {
      renderDoughnutChart();
      renderBarChart();
    }
  } catch (err) {
    console.error(err);
  }
};

export default render;