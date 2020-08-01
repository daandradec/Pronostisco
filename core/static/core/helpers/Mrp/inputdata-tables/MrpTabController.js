var stateTab = 1, new_state;
var flagEvent_2 = true;
var flagEvent_3 = true;

function startEvents(){


    $("button[tab-index]").on('click', function(){
        new_state = $(this).attr("tab-index");
        updateTab();     
    })

    /* PARA IGNORAR LA PRIMERA VISTA */
    new_state = 2;
    postUpdate();  
}

function updateTab(){
    $("div[tab-index="+stateTab+"]").addClass("animated faster fadeOut");  
    setTimeout(postUpdate, 700);
}

function postUpdate(){
    hiddeElement("div[tab-index="+stateTab+"]");
    showElement("div[tab-index="+new_state+"]");
    stateTab = parseInt(new_state);
    switch(stateTab){
        case 2:   
            if(flagEvent_2){
                startD3Tree();
                startMrpInput();
                flagEvent_2 = false;

                loadSavedDataTree()
            }
            break;
        case 3:
            if(flagEvent_3){
                selectableSetCallbackFunction(tabsTables);
                startButtonSelectable();
                fillTableRowsByCurrentPeriod();
                flagEvent_3 = false;

                loadSavedDataTables()
            }else
                seeChangeStateMRPToTable();
            break;
    }  
}

function hiddeElement(id){
    $(id).removeClass("animated faster fadeOut");
    $(id).addClass("d-none");
}
function showElement(id){
    $(id).removeClass("d-none");
    $(id).addClass("animated faster fadeIn");
}


window.addEventListener("load", startEvents, false);