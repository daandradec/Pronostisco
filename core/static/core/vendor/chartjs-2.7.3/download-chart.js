function createDownload(id,canvas_id,button){
    var a = document.getElementById(id)
    const canvas = document.getElementById(canvas_id);

    const new_canvas = document.createElement("canvas");new_canvas.width = canvas.width;new_canvas.height = canvas.height;
    const new_ctx = new_canvas.getContext('2d');
    const img = new Image();
    img.src = canvas.toDataURL("image/png");

    
    number = parseInt( $(button).attr('image-chart') )
    const data = getListDataVariable(number);

    
    img.onload = function (){
        new_canvas.width += 300;
        new_ctx.drawImage(img, 0, 0);
        new_ctx.font = (data.length > 25 ? '15px serif' : '20px serif');
        fillForecastTextOnImage(data, new_canvas, new_ctx, (data.length > 7 ? Math.floor(canvas.height/(data.length+1)) : 20));     

        a.setAttribute('href',new_canvas.toDataURL("image/png") );
        a.setAttribute('download', getCurrentLanguage() == 'ES' ? "grafico" : "graph" +".png");
        a.click();
    }
    
}
function downloadChart(button){
    createDownload("link-download",'line-chart-20', button)
}

function downloadChartLine(button){
    createDownload("link-download-line",'line-chart-15', button)
}

function downloadChartExpo(button){
    createDownload("link-download-expo",'line-chart-16', button)
}

function downloadChartMovil(button){
    createDownload("link-download-movil",'line-chart-17', button)
}




/* HELPERS */

function fillForecastTextOnImage(data, canvas, ctx, space){
    ctx.fillText("Pronosticos", canvas.width - 275, space);
    for(var i = 1; i < data.length+1; ++i){
        ctx.fillText(data[i-1], canvas.width - 275, i*space + space);
    }
}