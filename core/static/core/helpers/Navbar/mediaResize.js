$(window).resize(function(){
    var width = $(window).width();
    handleResize("header nav ul", "block","flex;", width, 772);
    handleResize("#div-list-01-collapse", "block","none;", width, 772);
});

function handleResize(id, current_disposition, new_disposition, width, limit){
    if(width > limit){
        var template = $(id);
        if( template.css("display") == current_disposition){
            template.removeClass("d-" + current_disposition);
            template.attr('style',"display: "+new_disposition+";");
        }
    }
}

