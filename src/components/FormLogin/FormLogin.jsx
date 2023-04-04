import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { login } from "../../features/User/userSlice";
export default function FormLogin() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(undefined);
  const dispacht = useDispatch()
  const history = useHistory();
  const [token, setToken] = useLocalStorage("token", undefined);

  const handleInput = function (e) {
    setInput({ ...input, [e.target.name]: e.target.value });
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
      dispacht(login(token))
    } catch (error) {
      console.log(error);

      setError(error.message);
    }
  };

  return (
    <>
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
                  class="form-control input-appointment"
                  onChange={handleInput}
                  value={input.email}
                  id="email"
                  name="email"
                  placeholder="Correo"
                />
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

              <button type="submit" class="btn btn-dark rounded-0">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
