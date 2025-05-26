import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTickets, setLoading, setError } from "../../store/actions";
import { fetchTickets } from "../../api/tickets";
import Ticket from "../Ticket";
import classes from "./TicketsLists.module.scss";

const TicketsList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const sort = useSelector((state) => state.sort);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  const [displayCount, setDisplayCount] = useState(5);
  const hasFetched = useRef(false); // Флаг для отслеживания выполнения запроса

  // Загрузка билетов (только один раз)
  useEffect(() => {
    if (hasFetched.current || tickets.length > 0) return;

    const loadTickets = async () => {
      hasFetched.current = true;
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data = await fetchTickets();
        dispatch(setTickets(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTickets();
  }, [dispatch, tickets.length]);

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
    return <div className={classes.loading}>Загрузка билетов...</div>;
  }

  if (error) {
    return <div className={classes.error}>Ошибка: {error}</div>;
  }

  if (tickets.length === 0) {
    return <div className={classes.empty}>Билеты не найдены</div>;
  }

  if (filteredTickets.length === 0) {
    return (
      <div className={classes.empty}>Нет билетов по выбранным фильтрам</div>
    );
  }

  return (
    <div className={classes.container}>
      {displayedTickets.map((ticket) => (
        <Ticket
          key={`${ticket.price}-${ticket.carrier}-${ticket.segments[0].date}`}
          ticket={ticket}
        />
      ))}

      {displayedTickets.length < sortedTickets.length && (
        <button className={classes.loadMore} onClick={handleLoadMore}>
          Показать ещё 5 билетов
        </button>
      )}
    </div>
  );
};

export default TicketsList;
