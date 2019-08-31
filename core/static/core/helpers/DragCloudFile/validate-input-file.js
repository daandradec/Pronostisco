drop_complete_flag = false;
/* FUNCIONALIDAD COMPROBACION DEL TIPO DE ARCHIVO AL CARGARSE EN EL INPUT TYPE FILE */
$('#file_input').on('change',function(){
	var allowedExtensions = /(.csv|.xls|.xlsx|.xlsm)$/i;

	if(allowedExtensions.exec(this.files[0].name)){
		cloud_drag_drop.style.border = "3px dashed #7abd54"
        drop_complete_flag = true;   
		$("#drag-cloud-button").prop("disabled",false); 
		$("#label_output_file").html(this.files[0].name);
	}else{				
		$(this).val(null);
	    cloud_drag_drop.style.border = "3px dashed #706b73"
        $("#drag-cloud-button").prop("disabled",true);  
		alert("Por favor ingrese un archivo de excel");
		$("#label_output_file").html("");
	}
})