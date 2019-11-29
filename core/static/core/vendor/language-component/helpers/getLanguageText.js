function get_language_text(condition,condition2,texts){
    switch(getCurrentLanguage()){
        case 'ES':
            return condition ? texts[0] : condition2 ? texts[1] : texts[2]
            break
        case 'EN':
            return condition ? texts[3] : condition2 ? texts[4] : texts[5]
            break
        default:
            return condition ? texts[0] : condition2 ? texts[1] : texts[2]
            break
    }
} 