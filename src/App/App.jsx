import "./App.scss";
import { Provider } from "react-redux";
import store from "./store/store";

import TicketsList from "./components/TicketsList";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Sort from "./components/Sort";

function App() {
  return (
    <Provider store={store}>
      <div className={"aviasales-app"}>
        <Header />
        <div className={"wrapper"}>
          <Filter />
          <main className={"main"}>
            <Sort />
            <TicketsList />
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
