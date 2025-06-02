import { combineReducers } from "redux";

const initialTicketState = {
  tickets: [],
  isLoading: false,
  isComplete: false,
  progress: 0,
  error: null,
};
const initialFiltersState = {
  all: true,
  nonStop: true,
  oneStop: true,
  twoStop: true,
  threeStop: true,
};
const initialSortState = "price";

const ticketsReducer = (state = initialTicketState, action) => {
  switch (action.type) {
    case "FETCH_TICKETS-START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_TICKETS_CHUNK":
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
        isLoading: false,
      };
    case "UPDATE_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    case "FETCH_TICKETS_COMPLETE":
      return {
        ...state,
        isComplete: true,
        isLoading: false,
      };
    case "FETCH_TICKETS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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
});

export default rootReducer;
