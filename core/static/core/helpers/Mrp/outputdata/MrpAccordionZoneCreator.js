var accordion_counter = -1;

function createAccordions(){
    const div_zone = document.querySelector("div[accordion-zone='true']");
    div_zone.innerHTML += createOneAccordion(mrp.producto.title);

    const components = mrp.componentes;
    for(var i = 0; i < components.length; ++i)
        div_zone.innerHTML += createOneAccordion(components[i].title);

    const materia = mrp.materia;
    for(var i = 0; i < materia.length; ++i)
        div_zone.innerHTML += createOneAccordion(materia[i].title);   
        
    fillDinamicMrpTables();        
}

function createOneAccordion(nameAccordion){
    ++accordion_counter;
    return accordion_head.replace("accordionExample","accordion"+accordion_counter) + 
        accordion_body.replace("collapseOne","collapse"+accordion_counter) + nameAccordion + accordion_footer +
        collapse_zone.replace("collapseOne","collapse"+accordion_counter).replace("accordionExample","accordion"+accordion_counter).replace("collapseMrpIndex",accordion_counter);    
}

window.addEventListener("load", createAccordions, false);