import React from "react";

export default function HoursAppointment({ hoursAvailable,setHours }) {


  if (!hoursAvailable) 
    return (
      <div className="row mt-2">
      
          <div className="col-12">
            <div
              className="border border-secondary  text-dark p-0"
            >
              <p>Seleccione la fecha primero</p>
              
            </div>
          </div>
 
      </div>
    );
  return (
    <div className="row mt-2 align-items-center">
      {hoursAvailable.map((h) => (
        <div className="col-4 col-md-4 col-xl-3  mb-2">
          <div
            className="border border-white bg-dark text-white shadow-sm rounded p-2"
          ><label htmlFor={h.hour} className="w-100 h-100 m-0">
            <input type="radio" name="hour" value={h.hour} id={h.hour} onClick={(e) => { setHours(e.target.value) }} />
            <span> {h.hour} </span>
          </label>
            
          </div>
        </div>
      ))}
    </div>
  );
}
