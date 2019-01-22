function createDownload(id,canvas_id){
    var a = document.getElementById(id)
    a.setAttribute('href',document.getElementById(canvas_id).toDataURL("image/png") );
    a.setAttribute('download', getCurrentLanguage() == 'ES' ? "grafico" : "graph" +".png");
    a.click();
}
function downloadChart(){
    createDownload("link-download",'line-chart-14')
}

function downloadChartLine(){
    createDownload("link-download-line",'line-chart-15')
}

function downloadChartExpo(){
    createDownload("link-download-expo",'line-chart-16')
}

function downloadChartMovil(){
    createDownload("link-download-movil",'line-chart-17')
}