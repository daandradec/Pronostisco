
function start(){
    $('#button-send-table').on('click',postRequestData);
}

function postRequestData(){
    closeActiveCells();
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
    post('/chart', {content: final_array.join(";")});
    /*
    console.log(window.location.hostname);
    console.log(window.location.href.substr(0,window.location.href.indexOf('//')+2))
    console.log(window.location.href)
    console.log(window.location.port)
    console.log(TOKEN)
    */
   /* Obligatorio recibir respuesta
    $.ajax({ 
        type: "POST",
        url: "http://127.0.0.1:8000/chart",
        data: {csrfmiddlewaretoken: TOKEN,content: "mensaje"}
    });
    */
}


window.addEventListener("load",start,false);

