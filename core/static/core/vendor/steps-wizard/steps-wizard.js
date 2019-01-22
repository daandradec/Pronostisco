$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    var a = $('li.disabled > a');
    a.each(function(n,element){
        $(element).on('click',function(e){
            e.preventDefault();
            $(this).off("click").attr('href', "javascript: void(0);");
        })
    });
    var b = $(':not(li.disabled) > a.link-post');
    b.each(function(n,element){      
        $(element).on('click',function(e){
            e.preventDefault();
            if(typeof data_request_django === 'undefined')
                return;
            post($(this).attr("href"),{content: data_request_django});
        })
    })
    /*
    $('li[role="presentation"] > a').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });
     
    $(".next-step").click(function (e) {

        var $active = $('.wizard-container-vertical .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard-container-vertical .nav-tabs li.active');
        prevTab($active);

    });
    */
});
/*
function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
*/