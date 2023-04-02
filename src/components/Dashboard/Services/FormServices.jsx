import axios from "axios";
import React from "react";
import { useState } from "react";

export default function FormService({handleSumbit,handleInput, input}) {
  

  return (
    <>
      <form action="" onSubmit={handleSumbit}>
        <div className="row">
          <div className="col-8">
            <input
              type="text"
              onChange={handleInput}
              value={input.name ? input.name : ""}
              name="name"
              id="name"
              className="form-control input-appointment"
              placeholder="Nombre "
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              onChange={handleInput}
              value={input.price ? input.price : ""}
              name="price"
              id="price"
              className="form-control input-appointment"
              placeholder="Precio "
            />
          </div>
          <div className="col-12">
            <textarea
              class="form-control input-appointment mt-2"
              onChange={handleInput}
              value={input.description ? input.description : ""}
              id="description"
              name="description"
              rows="3"
            ></textarea>
          </div>

          <div className="col-12 mt-2">
            <button
              type="button"
              class="btn btn-danger rounded-0"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="submit" class="btn btn-success rounded-0">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
