import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Api from "../../PlanPlateApi";
import React, { useEffect, useState } from "react";
import WelcomePanel from "./panels/panel-content/welcome-panel/WelcomePanel";
import "./MealPlanContainer.css";
import MealPlanPanel from "./panels/panel-content/meal-plan-panel/MealPlanPanel";
import { activeMealPlan } from "../../types/meal-plans/activeMealPlan";
import { inactiveMealPlan } from "../../types/meal-plans/inactiveMealPlan";
import { useAppDispatch } from "../../redux/hooks";
import { pushModalStack } from "../../redux/mealPlanReducer";
import ModalManager from "./modal/ModalManager";

export default function MealPlanContainer() {
  const [activeMealPlan, setActiveMealPlan] = useState<activeMealPlan>(null);
  const [inactiveMealPlans, setInactiveMealPlans] = useState<
    inactiveMealPlan[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchMealPlans() {
      const { active, inactive } = await Api.fetchMealPlans();
      setActiveMealPlan(active);
      setInactiveMealPlans(inactive);
    }

    fetchMealPlans();
  }, []);

  function triggerModal(e: React.MouseEvent<HTMLButtonElement>) {
    const { dataset } = e.currentTarget;
    dispatch(pushModalStack({ id: dataset.id || null, type: dataset.type }));
  }

  return (
    <>
      <ModalManager />
      <Tabs className="tab-container">
        <TabList className="tab-header">
          {!activeMealPlan && inactiveMealPlans.length === 0 && (
            <Tab>Welcome!</Tab>
          )}
          {inactiveMealPlans.map((mealPlan: { id: number; name: string }) => {
            return <Tab>{mealPlan.name}</Tab>;
          })}
          <button
            onClick={triggerModal}
            id="add-new-plan-btn"
            data-type="add-new"
          >
            + Add New
          </button>
        </TabList>
        {!activeMealPlan && inactiveMealPlans.length === 0 && (
          <TabPanel>
            <WelcomePanel />
          </TabPanel>
        )}
        {inactiveMealPlans.map((mealPlan: { id: number; name: string }) => {
          return (
            <TabPanel>
              <MealPlanPanel mealPlanId={mealPlan.id} />
            </TabPanel>
          );
        })}
      </Tabs>
    </>
  );
}
