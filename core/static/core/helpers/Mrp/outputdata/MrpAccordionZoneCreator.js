var accordion_counter = -1;
var flagAccordionButton = false;

function createAccordions(){
    const div_zone = document.querySelector("div[accordion-zone='true']");
    div_zone.innerHTML += createOneAccordion(mrp.producto.title, "bg-low-gray", "hov-bg-mid-lig-white-gray");

    const components = mrp.componentes;
    for(var i = 0; i < components.length; ++i)
        div_zone.innerHTML += createOneAccordion(components[i].title, "bg-orange-lighten-3","hov-bg-orange-lighten-2");

    const materia = mrp.materia;
    for(var i = 0; i < materia.length; ++i)
        div_zone.innerHTML += createOneAccordion(materia[i].title, "bg-blue-lighten-4","hov-bg-blue-lighten-3");   
        
    fillDinamicMrpTables();      
    fillBuyMasterPlan();
    activeAccordionButton();
}

function createOneAccordion(nameAccordion, bg_param, hov_param){
    ++accordion_counter;
    return accordion_head.replace("accordionExample","accordion"+accordion_counter) + 
        accordion_body.replace("collapseOne","collapse"+accordion_counter).replace("bg-low-gray", bg_param).replace("hov-bg-mid-lig-white-gray", hov_param) + nameAccordion + accordion_footer +
        collapse_zone.replace("collapseOne","collapse"+accordion_counter).replace("accordionExample","accordion"+accordion_counter).replace("collapseMrpIndex",accordion_counter);    
}

function activeAccordionButton(){
    $("#accordion-button").on('click',function(e){
        flagAccordionButton = !flagAccordionButton;
        const i_tag = e.target.children[0];
        const accordions = document.querySelector("div[accordion-zone='true']").children;

        if(flagAccordionButton){
            $(i_tag).removeClass("fa-arrow-circle-down");$(i_tag).addClass("fa-arrow-circle-up");
            for(var i = 0; i < periods_state; ++i)
                $(accordions[2*i+1]).collapse('show');            
        }else{
            $(i_tag).removeClass("fa-arrow-circle-up");$(i_tag).addClass("fa-arrow-circle-down");
            for(var i = 0; i < periods_state; ++i)
                $(accordions[2*i+1]).collapse('hide');            
        }
    })
}

window.addEventListener("load", createAccordions, false);