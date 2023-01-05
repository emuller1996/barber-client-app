import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import TemplateApp from "./layouts/TemplateApp";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <div className="App">
        <TemplateApp />
        <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
      </div>


      
    </Router>
  );
}

export default App;
