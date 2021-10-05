import { useReducer } from "react";
import { StartGame } from "./components/StartGame";
import { AddUsers } from "./components/AddUsers";
import { PageVisContext } from "./context/PageVisContext";
import "./style.css";

const pageVis: PageVisibility = {
  startGame: true,
  addUsers: false,
};

function reducer(state: PageVisibility, action: Action): PageVisibility {
  switch (action.type) {
    case "StartGame":
      return { startGame: true, addUsers: false };
    case "AddUsers":
      return { startGame: false, addUsers: true };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, pageVis);
  const reducerValue: ReducerValue = { state, dispatch };
  return (
    <div className="App">
      <PageVisContext.Provider value={reducerValue}>
        {state.startGame ? <StartGame /> : null}
        {state.addUsers ? <AddUsers /> : null}
      </PageVisContext.Provider>
    </div>
  );
}

export default App;
