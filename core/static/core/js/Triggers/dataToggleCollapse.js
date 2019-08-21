$("button[data-toggle=collapse]").on('click',function(){
    $($(this).attr("collapse")).toggleClass('d-block');
});