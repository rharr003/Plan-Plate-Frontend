import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Api from "../../PlanPlateApi";
import { useEffect } from "react";
import WelcomePanel from "./panels/panel-content/welcome-panel/WelcomePanel";
import "./MealPlans.css";
import MealPlanPanel from "./panels/panel-content/meal-plan-panel/MealPlanPanel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openModal } from "../../redux/modalReducer";
import { setMealPlans } from "../../redux/mealPlanReducer";
export default function MealPlans() {
  const activeMealPlan = useAppSelector((state) => state.mealPlan.active);
  const inactiveMealPlans = useAppSelector((state) => state.mealPlan.inactive);
  const hasNoPlans = !activeMealPlan && inactiveMealPlans.length === 0;
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchMealPlans() {
      const { active, inactive } = await Api.fetchMealPlans();
      dispatch(setMealPlans({ active, inactive }));
    }

    fetchMealPlans();
  }, []);

  function triggerAddNewPlanModal() {
    dispatch(openModal({ type: "add-new" }));
  }

  return (
    <>
      <Tabs className="tab-container">
        <TabList className="tab-header">
          {hasNoPlans && <Tab>Welcome!</Tab>}
          {inactiveMealPlans.map((mealPlan: { id: number; name: string }) => {
            return <Tab key={mealPlan.id + mealPlan.name}>{mealPlan.name}</Tab>;
          })}
          <button onClick={triggerAddNewPlanModal} id="add-new-plan-btn">
            + Add New
          </button>
        </TabList>
        {hasNoPlans && (
          <TabPanel>
            <WelcomePanel />
          </TabPanel>
        )}
        {inactiveMealPlans.map((mealPlan: { id: number; name: string }) => {
          return (
            <TabPanel key={mealPlan.id + mealPlan.name + "content"}>
              <MealPlanPanel mealPlanId={mealPlan.id} />
            </TabPanel>
          );
        })}
      </Tabs>
    </>
  );
}
