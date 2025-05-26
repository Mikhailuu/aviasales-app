import { combineReducers } from "redux";

const initialIsLoading = false;
const initialError = null;
const initialStopFetching = false;
const initialTicketState = [];
const initialFiltersState = {
  all: true,
  nonStop: true,
  oneStop: true,
  twoStop: true,
  treeStop: true,
};
const initialSortState = "price";

const isLoadingReducer = (state = initialIsLoading, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload;
    default:
      return state;
  }
};

const errorReducer = (state = initialError, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    default:
      return state;
  }
};

const stopFetchingReducer = (state = initialStopFetching, action) => {
  switch (action.type) {
    case "SET_STOP_FETCHING":
      return action.payload;
    default:
      return state;
  }
};

const ticketsReducer = (state = initialTicketState, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return action.payload;
    default:
      return state;
  }
};

const filtersReducer = (state = initialFiltersState, action) => {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const sortReducer = (state = initialSortState, action) => {
  switch (action.type) {
    case "SET_SORT":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tickets: ticketsReducer,
  filters: filtersReducer,
  sort: sortReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
  stopFetching: stopFetchingReducer,
});

export default rootReducer;
