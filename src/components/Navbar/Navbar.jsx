import React from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Navbar() {
  const [token, setToken] = useLocalStorage("token", undefined);

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
          <Link to="/" class="navbar-brand">
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
                {token ? (
                  <button
                    type="button"
                    onClick={() => {
                      setToken(undefined);
                    }}
                    class="btn btn-danger rounded-0"
                  >
                    <i class="fas fa-sign-out-alt mr-2"></i>
                    Cerrar Seccion
                  </button>
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
