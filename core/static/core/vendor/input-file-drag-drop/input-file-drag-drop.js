drop_complete_flag = false;

function awake(){
    file_input = document.getElementById("file_input");
    cloud_drag_drop = document.getElementById("drag-cloud");
    initDrop(cloud_drag_drop);
}
function initDrop(object){
    object.addEventListener("dragenter",drop_enter,false)
    object.addEventListener("dragleave",drop_leave,false);
    object.addEventListener("dragover",drop_enter,false);
    object.addEventListener("drop",drop_complete,false);
}
function ignoreEvent(e){
    e.preventDefault();
}
function drop_enter(e){
    ignoreEvent(e);
    cloud_drag_drop.style.border = "3px dashed #0081f3"
}
function drop_leave(e){
    ignoreEvent(e);
    if(drop_complete_flag)
      cloud_drag_drop.style.border = "3px dashed #7abd54"
    else
      cloud_drag_drop.style.border = "3px dashed #706b73"
}
function drop_complete(e){
    ignoreEvent(e);
    var allowedExtensions = /(.csv|.xls|.xlsx|.xlsm)$/i;
    if(allowedExtensions.exec(e.dataTransfer.files[0].name)){
        file_input.files = e.dataTransfer.files;
        cloud_drag_drop.style.border = "3px dashed #7abd54"
        drop_complete_flag = true;   
        $("#drag-cloud-button").prop("disabled",false);     
        $("#label_output_file").html(this.files[0].name);
    }else{
        alert("Por favor ingrese un archivo de excel");
        $("#label_output_file").html("");
        if(drop_complete_flag)
            cloud_drag_drop.style.border = "3px dashed #7abd54"
        else
            cloud_drag_drop.style.border = "3px dashed #706b73"
    }
    
}
window.addEventListener("load",awake,false);