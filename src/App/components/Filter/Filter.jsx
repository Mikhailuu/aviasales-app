import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/actions";
import classes from "./Filter.module.scss";

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleFilterChange = (filterName) => {
    if (filterName === "all") {
      dispatch(
        setFilters({
          all: !filters.all,
          nonStop: !filters.all,
          oneStop: !filters.all,
          twoStop: !filters.all,
          threeStop: !filters.all,
        })
      );
    } else {
      const newFilters = {
        ...filters,
        [filterName]: !filters[filterName],
        all: false,
      };

      if (
        Object.keys(newFilters)
          .filter((k) => k !== "all")
          .every((k) => newFilters[k])
      ) {
        newFilters.all = true;
      }

      dispatch(setFilters(newFilters));
    }
  };
  return (
    <aside className={classes.filter}>
      <h6>Количество пересадок</h6>
      <ul className={classes.list}>
        <li>
          <label>
            <input
              type="checkbox"
              checked={filters.all}
              onChange={() => handleFilterChange("all")}
            />
            Все
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={filters.nonStop || filters.all}
              onChange={() => handleFilterChange("nonStop")}
            />
            Без пересадок
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={filters.oneStop || filters.all}
              onChange={() => handleFilterChange("oneStop")}
            />
            1 пересадка
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={filters.twoStop || filters.all}
              onChange={() => handleFilterChange("twoStop")}
            />
            2 пересадки
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={filters.threeStop || filters.all}
              onChange={() => handleFilterChange("threeStop")}
            />
            3 пересадки
          </label>
        </li>
      </ul>
    </aside>
  );
};

export default Filter;
