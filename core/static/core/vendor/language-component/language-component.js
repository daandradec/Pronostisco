function startLanguage(){
    // obtener de la barra de navegacion los parametros y hacer el cambio
    get_parameters = document.location.search.substr(1)
    if(get_parameters.length){
        lang = get_parameters.split("=")
        var images_languages = $("img[language-image='true']");
        var src = "/static/core/img/"
        switch(lang[1]){
            case 'ES':
                modifySRCImages(images_languages,"/static/core/img/español.png")
                fillTagsContentsLanguage(0)
                break
            case 'EN':
                modifySRCImages(images_languages,"/static/core/img/ingles.png")
                fillTagsContentsLanguage(1)
                break
            default:
                
                modifySRCImages(images_languages,"/static/core/img/español.png")
                fillTagsContentsLanguage(0)
                break
        }
    }
}
function getCurrentLanguage(){
    get_parameters = document.location.search.substr(1)
    if(get_parameters.length)
        return get_parameters.split("=")[1]
    return "ES"

}

function fillTagsContentsLanguage(indexLang){
    $("*[language='true']").each(function(index,element){
        var contents = $(this).contents()
        for(var i = 0; i < contents.length; ++i){
            if(contents[i].nodeType == Node.TEXT_NODE){
                //console.log(contents[i]) debug
                //console.log(language_dataset[index][indexLang])
                contents[i].textContent = contents[i].textContent.replace(contents[i].textContent,language_dataset[index][indexLang])
            }
        }
    })
}

function changeLanguage(language){
    // asignar a la url el parametro LANG=ES | EN
    document.location.search = ["lang",language].join('=')
}
function modifySRCImages(images,src){  
    images.each(function(){
        $(this).attr('src',src)
    })
}


window.addEventListener("load",startLanguage,false);
