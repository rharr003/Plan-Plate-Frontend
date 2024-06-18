import { PlanStatsProps } from "./PlanStats.props";
import { Meal } from "../../../../../../types/meal";
import {
  calcTotals,
  createMacroChartData,
  createElectrolyteChartData,
} from "./PlanStats.util";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import "./PlanStats.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function PlanStats(props: PlanStatsProps) {
  const totals = calcTotals(props.meals);
  return (
    <div className="plan-stats">
      <div>
        <p className="calorie-label">Calorie total: {totals.calories}</p>
      </div>
      <div className="chart-container">
        <Doughnut
          data={createMacroChartData(
            totals.fat,
            totals.saturatedFat,
            totals.carbs,
            totals.sugar,
            totals.fiber,
            totals.protein
          )}
          options={{ plugins: { legend: { position: "left" } } }}
        />
      </div>
      <div className="chart-container">
        <Bar
          data={createElectrolyteChartData(totals.sodium, totals.potassium)}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
    </div>
  );
}
