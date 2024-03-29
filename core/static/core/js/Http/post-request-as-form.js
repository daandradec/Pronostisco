/* CREACION DE UN POST REQUEST SIMULANDO UN FORMULARIO */
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    var hiddenField = document.createElement("input")
    hiddenField.type = 'hidden';
    hiddenField.name = 'csrfmiddlewaretoken';
    hiddenField.value = TOKEN;
    form.appendChild(hiddenField)

    document.body.appendChild(form);
    form.submit();
}

function postNewTab(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    form.setAttribute("target","_blank");

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    var hiddenField = document.createElement("input")
    hiddenField.type = 'hidden';
    hiddenField.name = 'csrfmiddlewaretoken';
    hiddenField.value = TOKEN;
    form.appendChild(hiddenField)

    document.body.appendChild(form);
    form.submit();
}