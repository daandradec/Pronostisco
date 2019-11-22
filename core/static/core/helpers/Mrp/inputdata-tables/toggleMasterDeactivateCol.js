var toggleFlagLead = true;
var toggleFlagStock = true;
var toggleFlagQstar = true;

function toggleMasterEvent(){
    toggleFlagLead = !toggleFlagLead;
    const tr_cells = $(this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]).find("tr td:nth-child(2)");
    changeStatusColDisabled(tr_cells, toggleFlagLead);
}

function toggleMasterEventStock(){
    toggleFlagStock = !toggleFlagStock;    
    const tr_cells = $(this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]).find("tr td:nth-child(3)");    
    changeStatusColDisabled(tr_cells, toggleFlagStock);
}

function toggleMasterEventQStar(){    
    toggleFlagQstar = !toggleFlagQstar;
    const tr_cells = $(this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]).find("tr td:nth-child(5)");    
    changeStatusColDisabled(tr_cells, toggleFlagQstar);
}

function changeStatusColDisabled(tr_cells, toggleFlag){        
    if(toggleFlag)
        switchOnColTable(tr_cells);
    else
        switchOffColTable(tr_cells);
}

function switchOffColTable(tr_cells){        
    for(var i = 0; i < tr_cells.length; ++i){     
        tr_cells[i].removeEventListener("click",writeCell, false);
        $(tr_cells[i]).addClass("disabled");
    }
}

function switchOnColTable(tr_cells){
    for(var i = 0; i < tr_cells.length; ++i){    
        tr_cells[i].addEventListener("click",writeCell, false);    
        $(tr_cells[i]).removeClass("disabled");
    }
}