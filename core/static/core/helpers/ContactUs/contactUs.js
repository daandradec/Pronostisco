function contactUs(){

    document.getElementById("form-contact").addEventListener("submit", function(e){
        e.preventDefault();
        form = e.target;
        email = $(form).find("input[name='email']")[0].value;
        message = $(form).find("textarea")[0].value;
        requestEmail(email, message)
    })
}

function requestEmail(email, message){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/email", true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("respondio correcto")
      } else {
        alert("Error en la solicitud")
      }
    }
  };
  xhr.onerror = function (e) {
    alert("Hubo un error en la conexión, intentelo de nuevo")
  };

  var data = new FormData();
  data.append('data', JSON.stringify({"email":email,"message":message})  );
  data.append("csrfmiddlewaretoken", TOKEN)
  xhr.send(data);
}

window.addEventListener("load", contactUs, false);