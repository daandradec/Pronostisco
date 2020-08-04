
function startTableExcelRequest(){
    $('#button-send-table').on('click',postRequestData);
}

function postRequestData(){
    closeActiveCells(input);
    td_query = document.querySelectorAll("div.active div.table-responsive table tbody tr > td:not(:first-child)");
    var final_array = []
    var array = []
    for(var i = 0;i < td_query.length;++i){
        var data = td_query[i].innerHTML;
        data = (data.length) ? data : "0"
        if( i % (columns-1) == 0){
            if( i != 0){
                final_array.push(array)
                array = []
            }            
        }
        array.push(data);
    }
    final_array.push(array);
    post(POST_ROUTE, {content: final_array.join(";")});
}


window.addEventListener("load",startTableExcelRequest,false);

