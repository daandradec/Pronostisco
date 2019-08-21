
var tag_graphics;

/* AÑADIR FUNCIONALIDAD AL BOTON DEL TAG BLOCK PARA MODIFICAR SU TAG*/
function tagLoad(){
    tag_graphics = getCurrentLanguage() == 'ES' ? "Unidades" : "Units"

    $("#btn-tag").on("click",function(){
        tag_graphics = $("input[name=tag-graph]").val()
        if( tag_graphics == "" )
            tag_graphics = getCurrentLanguage() == 'ES' ? "Unidades" : "Units"

        destroyCharts()
        createChars()
        createChar02()
    })
    $("input[name=tag-graph]").attr('value',tag_graphics)
}

function destroyCharts(){
    chart1.destroy()
    chart2.destroy()
    chart3.destroy()
    chart4.destroy()
    chart5.destroy()
    chart6.destroy()
    chart7.destroy()
    chart8.destroy()
    chart9.destroy()
    chart10.destroy()
    if(typeof chart11 !== 'undefined')
        chart11.destroy()
    if(typeof chart12 !== 'undefined')
        chart12.destroy()
    if(typeof chart13 !== 'undefined')
        chart13.destroy()
    if(typeof chart14 !== 'undefined')
        chart14.destroy()
    if(typeof chart15 !== 'undefined')
        chart15.destroy()                
}

window.addEventListener("load",tagLoad,false)