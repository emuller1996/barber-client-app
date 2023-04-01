import axios from "axios";
import React, { useEffect } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Appointment from "../components/Dashboard/Appointment/Appointment";
import BarberDetail from "../components/Dashboard/Barbers/BarberDetail";
import Barbers from "../components/Dashboard/Barbers/Barbers";
import Client from "../components/Dashboard/Client/Clients";
import DetailService from "../components/Dashboard/Services/DetailService";
import Services from "../components/Dashboard/Services/Services";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Dashboard() {
  const history = useHistory();
  const [token, setToken] = useLocalStorage("token", undefined);


  useEffect(() => {
    validate();
    return () => {
      console.log("DESMONTE");
    };
  }, []);

  const validate = async () => {
    try {
      const result = await axios.post("/auth/validate",undefined,{
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error.message);
      history.push("/");
    }
  };

  return (
    <>
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2>Dashboard</h2>
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <Link class="nav-link active" to={"/Dashboard/Barberos"}>
                    Barberos
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to={"/Dashboard/Citas"}>
                    Citas
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to={"/Dashboard/Servicios"}>
                    Servicios
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to={"/Dashboard/Clientes"}>
                    Clientes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="border bg-ligth shadow">
          <Switch>
            <Route exact path={"/Dashboard/Citas"}>
              <Appointment />
            </Route>
            <Route exact path={"/Dashboard/Barberos"}>
              <Barbers />
            </Route>
            <Route exact path={"/Dashboard/Servicios"}>
              <Services />
            </Route>
            <Route exact path={"/Dashboard/Servicios/:idService"}>
              <DetailService />
            </Route>
            <Route exact path={"/Dashboard/Clientes"}>
              <Client />
            </Route>

            <Route exact path={"/Dashboard/Barberos/:idBarber"}>
              <BarberDetail />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
