import classes from "./TicketsLists.module.scss";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../store/actions";

import Ticket from "../Ticket";
import ProgressBar from "../ProgressBar";

const TicketsList = () => {
  const initialized = useRef(false);
  const dispatch = useDispatch();
  const { tickets, isLoading, isComplete, progress, error } = useSelector(
    (state) => state.tickets
  );
  const filters = useSelector((state) => state.filters);
  const sort = useSelector((state) => state.sort);

  const [displayCount, setDisplayCount] = useState(5);

  // Загрузка билетов
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      dispatch(fetchTickets());
    }
  }, [dispatch]);

  // Фильтрация и сортировка
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (filters.all) return true;
      const stopsCount = Math.min(
        ...ticket.segments.map((s) => s.stops.length)
      );
      return (
        (filters.nonStop && stopsCount === 0) ||
        (filters.oneStop && stopsCount === 1) ||
        (filters.twoStop && stopsCount === 2) ||
        (filters.threeStop && stopsCount === 3)
      );
    });
  }, [tickets, filters]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
      switch (sort) {
        case "price":
          return a.price - b.price;
        case "duration":
          return (
            Math.min(...a.segments.map((s) => s.duration)) -
            Math.min(...b.segments.map((s) => s.duration))
          );
        case "optimal":
          return (
            a.price * 0.7 +
            Math.min(...a.segments.map((s) => s.duration)) -
            (b.price * 0.7 + Math.min(...b.segments.map((s) => s.duration)))
          );
        default:
          return 0;
      }
    });
  }, [filteredTickets, sort]);

  const displayedTickets = sortedTickets.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  // Состояния загрузки
  if (isLoading && tickets.length === 0) {
    return <div className={`${classes.loading}`}>Загрузка билетов...</div>;
  }

  if (tickets.error) {
    return <div className={classes.error}>Ошибка: {error}</div>;
  }

  if (tickets.length === 0) {
    return <div className={classes.empty}>Билеты не найдены</div>;
  }

  if (filteredTickets.length === 0) {
    return (
      <div className={classes.empty}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {!isComplete && (
        <div className={classes.progress}>
          <ProgressBar propsProgress={progress} />
        </div>
      )}
      {displayedTickets.map((ticket) => (
        <Ticket
          key={`${ticket.price}-${ticket.carrier}-${ticket.segments[0].origin}-${ticket.segments[0].destination}`}
          ticket={ticket}
        />
      ))}
      {displayedTickets.length < sortedTickets.length && (
        <button className={classes["load-more"]} onClick={handleLoadMore}>
          Показать ещё 5 билетов
        </button>
      )}
    </div>
  );
};

export default TicketsList;
