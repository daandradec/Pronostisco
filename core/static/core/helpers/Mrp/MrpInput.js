const state = {
    producto: "",
    componentes: [],
    materia: []
}

var componentes_counter = 1;
var materia_counter = 1;

function startMrpInput(){
    $("#nombre-producto").on("keyup", function(){
        state.producto = this.value;
    })

    $("#compo").on("click", function(){
        document.querySelector("table[mrptrigger=compo] tbody").innerHTML += 
        "<tr>"+
            "<td>Hola"+
            "</td>"+
        "</tr>";
        ++componentes_counter;
    })

    $("#mater").on("click", function(){
        document.querySelector("table[mrptrigger=mater] tbody").innerHTML += 
        "<tr>"+
            "<td>Adios"+
            "</td>"+
        "</tr>";
        ++materia_counter;
    })
}


window.addEventListener("load", startMrpInput, false);