function validateLoginAdmin(input) {
    console.log(input);
    let errors = {};
    if (!input.email) {
      errors.email = "Correo es requerido.";
    }else if (!/\S+@\S+\.\S+/.test(input.email)){
      errors.email = "Debe ingresar un correo";
    }

    if (!input.password) {
      errors.password = "Contraseña es requerida.";
    }

    return errors;
  }


module.exports = {
    validateLoginAdmin
}