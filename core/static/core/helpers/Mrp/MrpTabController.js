var stateTab = 1, new_state;

function startEvents(){


    $("button[tab-index]").on('click', function(){
        new_state = $(this).attr("tab-index");
        update();        
    })


}

function update(){
    switch(stateTab){
        case 1:
            $("div[tab-index="+stateTab+"]").addClass("animated faster fadeOut");
            break;
        case 2:
            break;
    }    
    setTimeout(postUpdate, 700);
}

function postUpdate(){
    hiddeElement("div[tab-index="+stateTab+"]");
    showElement("div[tab-index="+new_state+"]");
    stateTab = parseInt(new_state);
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