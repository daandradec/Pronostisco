function getValuesOfTable(table){
    const td_list = $(table).find("tr").find("td:not(:first-child)");
    const values = [];
    for(var i = 0; i < td_list.length; ++i){ 
        const number = Number(td_list[i].innerHTML.replace(",","."));
        values.push(number);
    }
    return values;
}