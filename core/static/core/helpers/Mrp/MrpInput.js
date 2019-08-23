const state = {
    producto: {id:0, title: "Producto", key: "prod_0"},
    componentes: [],
    materia: [],
}

var componentes_counter = 1;
var materia_counter = 1;

function startMrpInput(){
    $("#nombre-producto").on("keyup", function(){
        state.producto.title = this.value;
    })

    $("#compo").on("click", function(){
        var title = "Componente "+componentes_counter;
        var key = "compo_"+componentes_counter+"_1";
        saveSelectsStates();
        document.querySelector("table[mrptrigger=compo] tbody").innerHTML += 
        "<tr componente_id='"+componentes_counter+"' flag_component='true' >"+
            "<td class='w-20'>"+componentes_counter+"</td>"+
            "<td class='w-40' cell-excel='true'>"+title+"</td>"+
            "<td class='w-40'>"+
                last_tr +
                "<select class='w-55-100-md' select-mrp key='"+key+"' >"+
                    generateOptions(componentes_counter) +
                "</select>"+
                last_tr_footer +
                last_tr_button_footer_compo +
            "</td>"+
        "</tr>";
        selectAllTdQuery();
        createComponent(key, componentes_counter, title, state.producto.key);
        selectAllSelectsAndSetOptions();
        initializeMrpParentEvents();
        ++componentes_counter; 
    })

    $("#mater").on("click", function(){
        var title = "Materia Prima "+materia_counter;
        var key = "mater_"+materia_counter+"_1";
        saveSelectsStates();
        document.querySelector("table[mrptrigger=mater] tbody").innerHTML += 
        "<tr materia_id='"+materia_counter+"' flag_component='false'>"+
            "<td class='w-20'>"+materia_counter+"</td>"+
            "<td class='w-40' cell-excel='true'>"+title+"</td>"+
            "<td class='w-40'>"+
                last_tr +
                "<select class='w-55-100-md' select-mrp key='"+key+"' >"+
                    generateOptions(-1) +
                "</select>"+
                last_tr_footer +
                last_tr_button_footer_mater +
            "</td>"+
        "</tr>";
        selectAllTdQuery();
        createMater(key, materia_counter, title, state.producto.key);
        selectAllSelectsAndSetOptions();
        initializeMrpMaterParentEvents();
        ++materia_counter;
    })

}

/* AL OPRIMIR EL BOTON DE AÑADIR PADRE , INSERTE UN FORMULARIO DE PADRE */
function initializeMrpParentEvents(){
    $("button[mrp-parent-comp=true]").on('click', function(){
        var forms_area = this.parentElement.parentElement.children[0];
        if(forms_area.children.length >= state.componentes.length)
            return;
        saveSelectsStates();
        var id = $(this.parentElement.parentElement.parentElement).attr("componente_id");
        forms_area.innerHTML += 
            form_literal_parent_header +
                "<select class='w-55-100-md' select-mrp key='compo_"+id+"_"+(forms_area.children.length+1)+"'>" +
                    generateOptions(parseInt(id)) +
                "</select>"+ 
            form_literal_parent_footer;
        
        selectAllSelectsAndSetOptions();
        addParentComponent(id, state.producto.key);
        switchOffForms();
    });   
}
function initializeMrpMaterParentEvents(){
    $("button[mrp-parent-mater=true]").on('click', function(){
        var forms_area = this.parentElement.parentElement.children[0];
        if(forms_area.children.length >= state.componentes.length + 1)
            return;
        saveSelectsStates();
        var id = $(this.parentElement.parentElement.parentElement).attr("materia_id");
        forms_area.innerHTML += 
            form_literal_parent_header +
                "<select class='w-55-100-md' select-mrp key='mater_"+id+"_"+(forms_area.children.length+1)+"'>" +
                    generateOptions(-1) +
                "</select>"+ 
            form_literal_parent_footer;
        
        selectAllSelectsAndSetOptions()
        switchOffForms();
    }); 
}

window.addEventListener("load", startMrpInput, false);



const last_tr = 
    "<div>"+
    "<form class='mp-0' noSubmit>"+
        "<div class='container-fluid mp-0'><div class='row mp-0'>"+
            "<div class='col-12 col-lg-7'>"+
                "<label class='mr-0-sm mr-md-2'>Padre: </label>";
                

const last_tr_footer =                                      
            "</div>"+
            "<div class='col-12 col-lg-5'>"+
                "<label class='mr-0-sm mr-md-2'>Cantidad:</label>"+
                "<input type='number' class='w-40-100-md mp-0' min='1' max='10' value='1'>"+                 
            "</div>"+
        "</div></div>"+
    "</form>"+
    "</div>";
const last_tr_button_footer_compo = 
    "<div class='my-2'>"+
        "<button class='btn btn-success btn-sm' mrp-parent-comp='true'>"+
            "Añadir Padre"+
        "</button>"+
    "</div>";
const last_tr_button_footer_mater = 
    "<div class='my-2'>"+
        "<button class='btn btn-success btn-sm' mrp-parent-mater='true'>"+
            "Añadir Padre"+
        "</button>"+
    "</div>";





const form_literal_parent_header = 
    "<form class='mp-0' noSubmit>"+
        "<div class='container-fluid mp-0'><div class='row mp-0'>"+
            "<div class='col-12 col-lg-7'>"+
                "<label class='mr-0-sm mr-md-2'>Padre: </label>";
            

const form_literal_parent_footer =                
            "</div>"+
            "<div class='col-12 col-lg-5'>"+
                "<label class='mr-0-sm mr-md-2'>Cantidad:</label>"+
                "<input type='number' class='w-40-100-md mp-0' min='1' max='10' value='1'>"+                 
            "</div>"+
        "</div></div>"+
    "</form>";