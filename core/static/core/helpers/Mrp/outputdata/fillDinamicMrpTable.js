function fillDinamicMrpTables(){    
    const div_product_table_zone = document.querySelector("div[mrp-index='0']");
    console.log(div_product_table_zone)
    var new_counter = 1;
    const components = mrp.componentes;
    for(var i = 0; i < components.length; ++i){
        const div_compo_table_zone = document.querySelector("div[mrp-index='"+new_counter+"']");
        console.log(div_compo_table_zone)
        ++new_counter;
    }

    const materia = mrp.materia;
    for(var i = 0; i < materia.length; ++i){
        const div_mater_table_zone = document.querySelector("div[mrp-index='"+new_counter+"']");
        console.log(div_mater_table_zone)
        ++new_counter;
    }
}