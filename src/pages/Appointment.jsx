import React from "react";
import { Link } from "react-router-dom";
import FormAppointment from "../components/Appointment/FormAppointment";

export default function Appointment() {
  return (
    <>
      {/* <!-- Page Header Start --> */}
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2>Agendar Cita</h2>
            </div>
            <div class="col-12">
              <Link to="/">Inicio</Link>
              <Link to="/Citas">Citas</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Page Header End --> */}

      <div class="about">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-4">
              <div class="about-img">
                <img src={"img/about.jpg"} alt="Image" />
              </div>
            </div>
            <div class="col-lg-7 col-md-8">
              <FormAppointment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
