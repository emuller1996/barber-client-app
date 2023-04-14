import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getToken, loguot } from "../../features/User/userSlice";

export default function Navbar() {
  const [token, setToken] = useLocalStorage("token", undefined);
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispacht = useDispatch();

  useEffect(() => {
    validate();
  }, [setToken, isLogin, token]);

  const validate = async () => {
    try {
      const result = await axios.post("/auth/validate", undefined, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      console.log(result.data);
      dispacht(getToken({ token: result.data.token }));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Top Bar Start */}
      <div class="top-bar d-none d-md-block">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="top-bar-left">
                <div class="text">
                  <h2>8:00AM - 8:00PM</h2>
                  <p>Abierto de Lunes - Sabados</p>
                </div>
                <div class="text">
                  <h2>+57 31554895</h2>
                  <p>Llama para una cita</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="top-bar-right">
                <div class="social">
                  <a href="/">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="/">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="/">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a href="/">
                    <i class="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top Bar End */}

      {/* Nav Bar Start */}
      <div class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container-fluid">
          <img src="/img/logo.png" width="50" alt="" />
          <Link to="/" class="navbar-brand ml-2">
            Barber<span>Mül</span>
          </Link>
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div class="navbar-nav ml-auto">
              <Link to="/" class="nav-item nav-link">
                Inicio
              </Link>
              <Link to="/Servicios" class="nav-item nav-link">
                Servicios
              </Link>
              <Link to={"/Barberos"} class="nav-item nav-link">
                Barberos
              </Link>

              <Link to={"/Citas"} class="nav-item nav-link">
                Reservar Cita
              </Link>
              <div class="nav-item ">
                {isLogin ? (
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle rounded-0"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Mi Perfil
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">
                        Mi Informacion
                      </a>
                      <a class="dropdown-item" href="#">
                        Mi Citas
                      </a>
                      <Link  to={'/Dashboard'} class="dropdown-item" >
                        Dasboard
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setToken(undefined);
                          dispacht(loguot());
                        }}
                        class="btn btn-danger rounded-0"
                      >
                        <i class="fas fa-sign-out-alt mr-2"></i>
                        Cerrar Seccion
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to={"/Login"} class="btn btn-secondary">
                    Inicio de Session
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Bar End */}
    </>
  );
}
