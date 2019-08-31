function switchOffForms(){
    var forms = document.querySelectorAll("form[noSubmit]");
    for(var i = 0; i < forms.length; ++i)
        forms[i].addEventListener("submit", function(e){e.preventDefault();}, false)
}

window.addEventListener("load", switchOffForms, false);