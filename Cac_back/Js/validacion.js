function validarFormulario(event) {
    event.preventDefault();

    let formulario = document.getElementById('miFormulario');
    let nombre = formulario.elements['nombre'].value;
    let telefono = formulario.elements['telefono'].value;
    let email = formulario.elements['email'].value;
    let sugerencias = formulario.elements['sugerencias'].value;

    if (!nombre || !email || !telefono || !sugerencias) {
        alert("Por favor, complete todos los campos.");
    }
    else {
        if (nombre.length < 3) {
            alert("El nombre debe tener mas de 3 caracteres.");
        }
        if (sugerencias.length < 10) {
            alert("Por favor escribenos mas de 10 caracteres.");
        }

        // Validar el formato del mail utilizando una expresión regular
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(emailRegex)) {
            alert("Por favor, ingrese un correo electrónico válido.");
        }

        // Validar el formato del número de teléfono utilizando una expresión regular
        let telefonoRegex = /^[0-9]{10}$/;
        if (!telefono.match(telefonoRegex)) {
            alert("Por favor, ingrese un número de teléfono válido de 10 dígitos.");
        }
    }

   /*  var feedback = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        sugerencias: sugerencias,
    } */
}

/* localStorage.setItem('feedback', JSON.stringify(feedback)) */

var form = document.getElementById("miFormulario");
async function handleSubmit(event) {
event.preventDefault();
var status = document.getElementById("my-form-status");
var data = new FormData(event.target);
fetch(event.target.action, {
  method: form.method,
  body: data,
  headers: {
    'Accept': 'application/json'
}
}).then(response => {
  if (response.ok) {
    status.innerHTML = "Thanks for your submission!";
    form.reset()
  } else {
    response.json().then(data => {
    if (Object.hasOwn(data, 'errors')) {
      status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
    } else {
      status.innerHTML = "Oops! There was a problem submitting your form"
    }
  })
}
}).catch(error => {
  status.innerHTML = "Oops! There was a problem submitting your form"
});
}
form.addEventListener("submit", handleSubmit)