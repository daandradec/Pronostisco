function getValuesOfTable(table){
    const tr_list = $(table).find("tbody tr"); // $(table).find("tr").find("td:not(:first-child)");
    const values = [];
    for(var i = 0; i < tr_list.length; ++i){ 
        const sub_list = [];
        const td_list = $(tr_list[i]).find("td:not(:first-child)");
        for(var j = 0; j < td_list.length; ++j){
            const number = Number(td_list[j].innerHTML.replace(",","."));
            sub_list.push(number);    
        }        
        values.push(sub_list);
    }
    return values;
}

function getValuesSimpleOfTable(table){
    const td_list = $(table).find("tbody tr").find("td:not(:first-child)");
    const values = [];
    for(var i = 0; i < td_list.length; ++i)
        values.push(Number(td_list[i].innerHTML.replace(",",".")))
    
    return values;
}