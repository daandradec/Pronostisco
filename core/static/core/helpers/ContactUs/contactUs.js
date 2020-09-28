function contactUs(){

    document.getElementById("form-contact").addEventListener("submit", function(e){
        e.preventDefault();
        form = e.target;
        email = $(form).find("input[name='email']")[0].value;
        message = $(form).find("textarea")[0].value;
        if(email === ""){
          alert("El correo no puede ser vacio");
        }else if(email.indexOf("@") === -1 || email.indexOf(".") === -1){
          alert("No es un correo correcto");
        }else if(email.indexOf("@") > email.indexOf(".")){
          alert("No es un correo correcto");
        }else
          requestEmail(email, message)
    })
}

function requestEmail(email, message){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/email", true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {} else {
        alert("ERROR: Envio de correo no realizado, Hubo un Fallo en la entrada de datos, o la red");
      }
    }
  };
  xhr.onerror = function (e) {
    alert("Hubo un error en la conexión, intentelo de nuevo")
  };

  var data = new FormData();
  data.append('data', JSON.stringify({"email":email,"message":message})  );
  data.append("csrfmiddlewaretoken", TOKEN);
  alert("CORREO ENVIADO EXITOSAMENTE");
  xhr.send(data);
}

window.addEventListener("load", contactUs, false);