import "./SearchBar.css";
import { SearchBarProps } from "./SearchBar.props";
import FlexibleInput from "../../../../../form/flexible-input/FlexibleInput";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { openModal } from "../../../../../../redux/modalReducer";
import { setSearch } from "../../../../../../redux/foodItemListReducer";

export default function SearchBar(props: SearchBarProps) {
  const dispatch = useAppDispatch();
  function triggerModal() {
    const context = {};
    dispatch(
      openModal({
        type: "create-food-item",
        context,
        height: "70%",
      })
    );
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(e.target.value));
  }
  return (
    <div className="search-bar">
      <FlexibleInput
        labelText=""
        value={props.search}
        handleChange={handleSearch}
        name="search"
        placeholder="Search food items..."
      />
      <button className="btn btn-info" onClick={triggerModal}>
        + Add New
      </button>
    </div>
  );
}
