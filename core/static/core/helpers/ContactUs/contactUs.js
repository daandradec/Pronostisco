function contactUs(){

    document.getElementById("form-contact").addEventListener("submit", function(e){
        e.preventDefault();
        form = e.target;
        email = $(form).find("input[name='email']")[0].value;
        message = $(form).find("textarea")[0].value;
        alert("En la proxima version Se enviara un email a: "+email+" con mensaje: "+message);
    })
    
    /*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/bar/foo.txt", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          
        } else {
          alert("Error en la solicitud")
        }
      }
    };
    xhr.onerror = function (e) {
      alert("Hubo un error en la conexión, intentelo de nuevo")
    };
    xhr.send(JSON.stringify({"email":arguments,"message":})); */
}

window.addEventListener("load", contactUs, false);