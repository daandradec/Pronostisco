var labels = [];
var current_label,current_index;
var callback_function;


function startButtonSelectable(){
    current_index = 0;
    current_label = labels[current_index];

    $("button[selector-left]").click(function(){
        labelShiftLeft();
        updateTextSelector();
        callback_function(current_index);
    });

    $("button[selector-right]").click(function(){
        labelShiftRight();
        updateTextSelector();
        callback_function(current_index);
    });
}

function labelShiftLeft(){
    current_index = (current_index-1)+((current_index===0)*labels.length );
    current_label = labels[current_index];
}

function labelShiftRight(){
    current_index = (current_index+1)%labels.length;
    current_label = labels[current_index];
}

function updateTextSelector(){
    document.querySelector("p[selector]").innerHTML = current_label;
}


function selectableSetLabels(labels){
    labels = labels;
}

function selectableSetCallbackFunction(func){
    callback_function = func;
}

function selectableSetLabelsAndCallBackFunction(new_labels, func){
    labels = new_labels;
    callback_function = func;
}