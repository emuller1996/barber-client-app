import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import TemplateApp from "./layouts/TemplateApp";

function App() {
  return (
    <Router>
      <div className="App">
        <TemplateApp />
      </div>
    </Router>
  );
}

export default App;
