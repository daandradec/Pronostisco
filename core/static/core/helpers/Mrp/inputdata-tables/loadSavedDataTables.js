function loadSavedDataTables(){
    if(sessionStorage.getItem("table_forecast") == null)
        return

    const tables = document.querySelectorAll("table[table-excel]");
    // tabla 0 : forecast
    tables[0].children[1].innerHTML = sessionStorage.getItem("table_forecast")
    // tabla 1 : general
    table_values =  JSON.parse(sessionStorage.getItem("table_general"))
    alterRespectiveTable(tables[1], 1)
    // tabla 2 : recepciones
    table_values = JSON.parse(sessionStorage.getItem("table_receptions"))
    alterRespectiveTable(tables[2], 2)

    awake();
    selectAllTdQueryCellExcelTH();  
}