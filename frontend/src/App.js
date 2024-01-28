import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './screens/login';
import EmployeeList from './screens/employeeList';
import AddEmployee from './screens/addEmployee';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route
            path="employeeList"
            element={<EmployeeList />}
          />
        <Route
            path="addEmployee"
            element={<AddEmployee />}
          />
          <Route
            path="editEmployee/:employeeId"
            element={<AddEmployee />}
          />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
