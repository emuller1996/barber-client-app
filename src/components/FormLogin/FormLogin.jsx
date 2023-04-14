import axios, { Axios } from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { login } from "../../features/User/userSlice";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import FormRegisterClient from "../Appointment/FormRegisterClient";
import { validateLoginAdmin } from "../../utils/formsValidadores";

export default function FormLogin() {
  const [input, setInput] = useState({});
  const [error, setError] = useState(undefined);
  const [errorInputAdmin, setErrorInputAdmin] = useState({})
  const dispacht = useDispatch();
  const history = useHistory();
  const [token, setToken] = useLocalStorage("token", undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined)

  const handleInput = function (e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrorInputAdmin(validateLoginAdmin({ ...input, [e.target.name]: e.target.value }) )
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log("handleSumbit");
    console.log(input);
    setError(undefined);
    try {
      const result = await axios.post("/auth/signin", input, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result.data);
      setToken(result.data.token);
      history.push("/Dashboard/");
      console.log(token);
      dispacht(login(token));
    } catch (error) {
      console.log(error);

      setError(error.message);
    }
  };

  const handleSubmitClient = async(e) =>{
    e.preventDefault();
    setError(undefined)
    try {
      const result = await axios.get(`/client/${phoneNumber}`);
      console.log(result);
      history.push(`/MiPerfil/${phoneNumber}`)
    } catch (error) {
      setError('CLIENTE NO REGISTRADO')
    }

  }

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="Cliente">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className="btn btn-dark rounded-0" eventKey="Cliente">
                  <small>ingresar como</small> Cliente
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="btn btn-dark rounded-0" eventKey="second">
                  <small>ingresar como</small> Admin
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="Cliente">
                <form onSubmit={handleSubmitClient}  className="w-50 mx-auto my-4">
                  <p className="text-center">Nuestros Clientes estan registador por su numero telefonico.</p>
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control input-appointment"
                      id="phone"
                      name="phone"
                      placeholder="Numero Telefonico"
                      onChange={ e => setPhoneNumber(e.target.value)}
                    />
                  </div>
                    {
                     error && (<p>{error}</p>)          
                    }

                  <button type="submit" class="btn btn-dark rounded-0">
                    Ingresar
                  </button>
                  <div className="container mt-2">
                    <span className=" btn btn-registrame text-dark"
                    type="button"
                    data-toggle="modal"
                    data-target="#ModalRegister">Registrame</span>
                  </div>
                </form>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <form
                  action=""
                  className=" p-4"
                  autoComplete="off"
                  onSubmit={handleSumbit}
                >
                  <div className="row justify-content-md-center">
                    <div className="col-md-8">
                      <div className="login">
                        <p>Ingrese sus credenciales</p>
                        <div class="form-group">
                          <input
                            type="email"
                            class={
                              !errorInputAdmin.email
                                ? "form-control input-appointment"
                                : "form-control input-error"
                            }
                            onChange={handleInput}
                            value={input.email}
                            id="email"
                            name="email"
                            placeholder="Correo"
                          />
                          <small id="emailHelp" class="form-text text-danger">
                            {errorInputAdmin.email ? errorInputAdmin.email : false}{" "}
                          </small>
                        </div>

                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control input-appointment"
                            onChange={handleInput}
                            value={input.password}
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                          />
                        </div>

                        {error && (
                          <div
                            class="alert alert-danger rounded-0 shadow-md"
                            role="alert"
                          >
                            <strong>{error}</strong>
                          </div>
                        )}

                        <button type="submit" class="btn btn-dark rounded-0"
                        disabled={Object.values(errorInputAdmin).length !== 0}>
                          Ingresar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <div
          class="modal fade"
          id="ModalRegister"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content bg-cafe rounded-0">
              <div class="modal-header bg-dark rounded-0">
                <h5 class="modal-title text-white" id="exampleModalLabel">
                  Registarme{" "}
                </h5>
                <button
                  type="button"
                  class="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <FormRegisterClient />
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
