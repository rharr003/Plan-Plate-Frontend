import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Api from "../../PlanPlateApi";
import { useEffect, useState } from "react";
import WelcomePanel from "./panels/panel-content/welcome-panel/WelcomePanel";
import "./MealPlans.css";
import MealPlanPanel from "./panels/panel-content/meal-plan-panel/MealPlanPanel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openModal } from "../../redux/modalReducer";
import { setMealPlans, selectTab } from "../../redux/mealPlanReducer";
export default function MealPlans() {
  const allMealPlans = useAppSelector((state) => state.mealPlan.all);
  const currTab = useAppSelector((state) => state.mealPlan.currTab);
  const hasNoPlans = allMealPlans.length === 0;
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchMealPlans() {
      const { plans } = await Api.fetchMealPlans();
      dispatch(setMealPlans({ plans }));
      setLoading(false);
    }

    fetchMealPlans();
  }, []);

  function triggerAddNewPlanModal() {
    dispatch(openModal({ type: "add-new" }));
  }

  function handleTabSelect(index: number) {
    dispatch(selectTab({ index }));
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <Tabs
        className="tab-container"
        selectedIndex={currTab}
        onSelect={handleTabSelect}
      >
        <TabList className="tab-header">
          {hasNoPlans && <Tab>Welcome!</Tab>}
          {allMealPlans.map(
            (
              mealPlan: { id: number; name: string; active: boolean },
              index
            ) => {
              return (
                <Tab
                  className={
                    mealPlan.active
                      ? "active-plan react-tabs__tab"
                      : "react-tabs__tab"
                  }
                  key={mealPlan.id + mealPlan.name}
                >
                  {mealPlan.name}
                </Tab>
              );
            }
          )}
          <button onClick={triggerAddNewPlanModal} id="add-new-plan-btn">
            + Add New
          </button>
        </TabList>
        {hasNoPlans && (
          <TabPanel>
            <WelcomePanel />
          </TabPanel>
        )}
        {allMealPlans.map((mealPlan: { id: number; name: string }) => {
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
