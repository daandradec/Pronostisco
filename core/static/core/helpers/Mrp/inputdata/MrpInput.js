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
        saveSelectsStates();
        selectAllSelectsAndSetOptions();
        updateTree("NAME", this.value);  
    })

    $("#compo").on("click", function(){
        var title = "Componente "+componentes_counter;
        var key = "compo_"+componentes_counter+"_1";
        saveSelectsStates();
        document.querySelector("table[mrptrigger=compo] tbody").innerHTML += 
        "<tr componente_id='"+componentes_counter+"' flag_component='true'>" +
            "<td class='w-20 position-relative'>" +
            "<button type='button' class='close position-absolute' style='top:0px;right:5px;' onclick='removeRowMRP(this)'>" +
            "<span aria-hidden='true'>&times;</span></button>"+
            componentes_counter+"</td>"+
            "<td class='w-40' cell-excel='true'>"+title+"</td>"+
            "<td class='w-40 pt-2'>"+
                last_tr +
                "<select class='w-55-100-md' select-mrp key='"+key+"' id='"+componentes_counter+"'>"+
                    generateOptions(componentes_counter) +
                "</select>"+
                last_tr_footer +
                last_tr_button_footer_compo +
            "</td>"+
        "</tr>";
        switchOffForms();
        selectAllTdQueryCellExcel(); // añadir evento click a las celdas de la tabla
        createComponent(key, componentes_counter, title, state.producto.key);
        selectAllSelectsAndSetOptions(); // actualizado de los selects
        initializeMrpParentEvents(); // listeners evento boton padre
        updateTree("CREATE", {name:title+" (1)", children: [], key: key});
        ++componentes_counter; 
    })

    $("#mater").on("click", function(){
        var title = "Materia Prima "+materia_counter;
        var key = "mater_"+materia_counter+"_1";
        saveSelectsStates();
        document.querySelector("table[mrptrigger=mater] tbody").innerHTML += 
        "<tr materia_id='"+materia_counter+"' flag_component='false'>"+
            "<td class='w-20 position-relative'>" + 
            "<button type='button' class='close position-absolute' style='top:0px;right:5px;' onclick='removeRowMRP(this)'>" +
            "<span aria-hidden='true'>&times;</span></button>"+            
            materia_counter+"</td>"+
            "<td class='w-40' cell-excel='true'>"+title+"</td>"+
            "<td class='w-40'>"+
                last_tr +
                "<select class='w-55-100-md' select-mrp key='"+key+"' id='"+materia_counter+"'>"+
                    generateOptions(-1) +
                "</select>"+
                last_tr_footer +
                last_tr_button_footer_mater +
            "</td>"+
        "</tr>";
        switchOffForms();
        selectAllTdQueryCellExcel(); // añadir evento click a las celdas de la tabla
        createMater(key, materia_counter, title, state.producto.key);
        selectAllSelectsAndSetOptions(); // actualizado de los selects
        initializeMrpMaterParentEvents(); // listeners evento boton padre
        updateTree("CREATE", {name:title+" (1)", children: [], key: key});
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
                "<select class='w-55-100-md' select-mrp key='compo_"+id+"_"+(forms_area.children.length+1)+"' id='"+id+"'>" +
                    generateOptions(parseInt(id)) +
                "</select>"+ 
            form_literal_parent_footer;
        
        selectAllSelectsAndSetOptions();        
        switchOffForms();

        addParentComponent(parseInt(id), state.producto.key);
        updateTree("SELECT", undefined); 
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
                "<select class='w-55-100-md' select-mrp key='mater_"+id+"_"+(forms_area.children.length+1)+"' id='"+id+"'>" +
                    generateOptions(-1) +
                "</select>"+ 
            form_literal_parent_footer;
        
        selectAllSelectsAndSetOptions()
        switchOffForms();

        addParentMater(parseInt(id), state.producto.key);
        updateTree("SELECT", undefined);   
    }); 
}

//window.addEventListener("load", startMrpInput, false);



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
                "<input type='number' class='w-40-100-md mp-0' min='1' value='1'>"+                 
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
                "<button class='btn d-inline-block p-0 mr-1' onclick='removeRowSelect(this)' style='width:25px;height:25px;margin-top:-5px;'><i class='fas fa-cut' style='color:red'></i></button>"+
                "<label class='mr-0-sm mr-md-2'>Padre: </label>";
            

const form_literal_parent_footer =                
            "</div>"+
            "<div class='col-12 col-lg-5'>"+
                "<label class='mr-0-sm mr-md-2'>Cantidad:</label>"+
                "<input type='number' class='w-40-100-md mp-0' min='1' value='1'>"+                 
            "</div>"+
        "</div></div>"+
    "</form>";