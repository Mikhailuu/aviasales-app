export const SET_TICKETS = "SET_TICKETS";
export const SET_FILTERS = "SET_FILTERS";
export const SET_SORT = "SET_SORT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_STOP_FETCHING = "SET_STOP_FETCHING";

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setStopFetching = (value) => ({
  type: SET_STOP_FETCHING,
  payload: value,
});

export const setTickets = (tickets) => ({
  type: SET_TICKETS,
  payload: tickets,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});
export const setSort = (sortBy) => ({
  type: SET_SORT,
  payload: sortBy,
});
