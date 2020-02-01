function hiddeMainModal(){
    $('#modalExample').modal('hide');
    $('#modalTable').modal('hide');      
    $('#mole').modal('hide')
}

function hiddenAllModal(){
    $('#modalExample').modal('hide')
    $('#modalTable').modal('hide')
    $('#modalResults').modal('hide')
    $('#modal_lin').modal('hide')      
    $('#modal_expo').modal('hide')      
    $('#modal_movil').modal('hide')  
    $('#modalFull').modal('hide')
    $('#modalData').modal('hide')
    $('#modalTables').modal('hide')
}


window.addEventListener("load", hiddeMainModal, false);
window.addEventListener("load", hiddenAllModal,false);