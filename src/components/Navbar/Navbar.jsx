import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
                  <p>Abierto  de Lunes - Sabados</p>
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
                  <a href="">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a href="">
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
            Barber<span>Mul</span>
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
              <a href="service.html" class="nav-item nav-link">
                Servicios
              </a>
              <a href="team.html" class="nav-item nav-link">
                Barberos
              </a>
              
              <a href="contact.html" class="nav-item nav-link">
                Contacto
              </a>
              <div class="nav-item dropdown">
                <button
                  
                  class="btn btn-dark dropdown-toggle active"
                  data-toggle="dropdown"
                >
                  Inicio de Session
                </button>
                <div class="dropdown-menu">
                  <a href="blog.html" class="dropdown-item">
                    Blog Page
                  </a>
                  <a href="single.html" class="dropdown-item">
                    Single Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Bar End */}
    </>
  );
}
