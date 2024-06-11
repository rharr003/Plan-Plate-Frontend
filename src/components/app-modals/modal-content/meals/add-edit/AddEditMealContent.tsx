import "./AddEditMealContent.css";
import { AddEditMealContentProps } from "./AddEditMealContent.props";
import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import { useAppDispatch } from "../../../../../redux/hooks";
import { openModal } from "../../../../../redux/modalReducer";
import ModalHeader from "../../shared/ModalHeader";

export default function AddEditMealContent(props: AddEditMealContentProps) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  function triggerModal() {
    const context = {};
    dispatch(
      openModal({
        type: "create-meal",
        context,
        height: "75%",
        width: "75%",
      })
    );
  }

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchMeals();
      setMeals(result.data);
      console.log(result.data);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <ModalHeader title="Meals" closeModal={props.closeModal} />
      <button className="btn btn-info" onClick={triggerModal}>
        Create new meal
      </button>
      {!meals.length && <p>You haven't created any meals yet</p>}
    </div>
  );
}
