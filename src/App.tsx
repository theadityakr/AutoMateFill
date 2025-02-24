import "./App.css";
import Data from "./Components/Data/Data";
import Header from "./Components/Header/Header";
import FormAutoFill from "./Components/AutoFill/FormAutoFill";


function App() {
  return (
    <div className="App flex-column">
      <Header />
      <FormAutoFill/>
      <Data />
    </div>
  );
}

export default App;
