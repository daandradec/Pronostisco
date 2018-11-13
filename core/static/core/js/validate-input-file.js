drop_complete_flag = false;
$('#file_input').on('change',function(){
	var allowedExtensions = /(.csv|.xls|.xlsx|.xlsm)$/i;

	if(allowedExtensions.exec(this.files[0].name)){
		cloud_drag_drop.style.border = "3px dashed #7abd54"
        drop_complete_flag = true;   
        $("#drag-cloud-button").prop("disabled",false);   
	}else{				
		$(this).val(null);
	    cloud_drag_drop.style.border = "3px dashed #706b73"
        $("#drag-cloud-button").prop("disabled",true);  
        alert("Por favor ingrese un archivo de excel");
	}
})