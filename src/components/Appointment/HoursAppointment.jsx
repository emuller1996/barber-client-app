import React from "react";

export default function HoursAppointment({ hoursAvailable,setHours,dateAppointment, setDateAppointment, hours }) {


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
    <div className="row mx-1 mt-2 align-items-center">
      
      {hoursAvailable.map((h) => (
        <div key={h.hour} className="col-4 col-md-4 col-xl-3  mb-2">
          
          <div
            className={hours===h.hour ? "card-service-selected " : "card-service "}
          ><label htmlFor={h.hour} className="w-100 h-100 m-0 p-2">
            <input  type="radio" name="hour" value={h.hour} id={h.hour} onClick={(e) => { setHours(`${e.target.value}`) }} />
            <span> {h.view} </span>
          </label>
            
          </div>
        </div>
      ))}
    </div>
  );
}
