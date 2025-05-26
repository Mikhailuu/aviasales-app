import classes from "./Ticket.module.scss";

const Ticket = ({ ticket }) => {
  const formatPrice = (price) => new Intl.NumberFormat("ru-RU").format(price);
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={classes.ticket}>
      <header className={classes.header}>
        <span className={classes.price}>{formatPrice(ticket.price)} Р</span>
        <div className={classes["ticket-airline"]}>
          <img
            src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
            alt={ticket.carrier}
          />
        </div>
      </header>
      <div className={classes.details}>
        {ticket.segments.map((segment, i) => (
          <div key={i} className={classes.segment}>
            <div className={classes["segment-info"]}>
              <span className={classes["segment-route"]}>
                {segment.origin} - {segment.destination}
              </span>
              <span className={classes["segment-time"]}>
                {formatTime(segment.date)} -
                {formatTime(
                  new Date(segment.date).getTime() + segment.duration * 60000
                )}
              </span>
            </div>
            <div className={classes["segment-info"]}>
              <span className={classes["segment-label"]}>В ПУТИ</span>
              <span className={classes["segment-value"]}>
                {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
              </span>
            </div>
            <div className={classes["segment-info"]}>
              <span className={classes["segment-label"]}>
                {segment.stops.length > 1
                  ? segment.stops.length + " ПЕРЕСАДКИ"
                  : segment.stops.length === 0
                  ? "БЕЗ ПЕРЕСАДОК"
                  : "1 ПЕРЕСАДКА"}
              </span>
              <span className={classes["segment-value"]}>
                {segment.stops.length === 0
                  ? "ПРЯМОЙ"
                  : segment.stops.join(", ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
