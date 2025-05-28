import { useDispatch, useSelector } from "react-redux";
import classes from "./Sort.module.scss";
import { setSort } from "../../store/actions";

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sort);

  const handleSortChange = (sortBy) => {
    dispatch(setSort(sortBy));
  };

  return (
    <div className={classes.sort}>
      <button
        className={
          sort === "price"
            ? `${classes.button} ${classes["button-active"]}`
            : classes.button
        }
      >
        <span
          className={sort === "price" ? classes["text-stroke"] : ""}
          onClick={() => handleSortChange("price")}
        >
          Самый дешевый
        </span>
      </button>
      <button
        className={
          sort === "duration"
            ? `${classes.button} ${classes["button-active"]}`
            : classes.button
        }
      >
        {" "}
        <span
          className={sort === "duration" ? classes["text-stroke"] : ""}
          onClick={() => handleSortChange("duration")}
        >
          Самый быстрый
        </span>
      </button>
      <button
        className={
          sort === "optimal"
            ? `${classes.button} ${classes["button-active"]}`
            : classes.button
        }
      >
        {" "}
        <span
          className={sort === "optimal" ? classes["text-stroke"] : ""}
          onClick={() => handleSortChange("optimal")}
        >
          Оптимальный
        </span>
      </button>
    </div>
  );
};

export default Sort;
