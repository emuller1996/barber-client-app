function validateLoginAdmin(input) {
    console.log(input);
    let errors = {};
    if (!input.email) {
      errors.email = "Correo es requerido.";
    }

    if (!input.password) {
      errors.password = "Contraseña es requerida.";
    }

    return errors;
  }


module.exports = {
    validateLoginAdmin
}