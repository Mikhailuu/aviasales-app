import ticketsService from "../api/ticketsService";

export const SET_FILTERS = "SET_FILTERS";
export const SET_SORT = "SET_SORT";
export const FETCH_TICKETS_START = "FETCH_TICKETS_START";
export const FETCH_TICKETS_CHUNK = "FETCH_TICKETS_CHUNK";
export const FETCH_TICKETS_COMPLETE = "FETCH_TICKETS_COMPLETE";
export const FETCH_TICKETS_ERROR = "FETCH_TICKETS_ERROR";
export const UPDATE_PROGRESS = "UPDATE_PROGRESS";

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const setSort = (sortBy) => ({
  type: SET_SORT,
  payload: sortBy,
});

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_TICKETS_START,
    });

    try {
      const ticketsStream = ticketsService.getTicketsStream();
      let loadedTickets = 0;
      let progress = 0;
      for await (const ticketsChunk of ticketsStream) {
        dispatch({
          type: FETCH_TICKETS_CHUNK,
          payload: ticketsChunk,
        });
        progress = Math.floor(
          ((loadedTickets += ticketsChunk.length) / 11000) * 100
        );
        dispatch({
          type: UPDATE_PROGRESS,
          payload: progress,
        });
      }

      dispatch({
        type: FETCH_TICKETS_COMPLETE,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TICKETS_ERROR,
        payload: error.message,
      });
    }
  };
};
