



/* BUSCADO BINARIA EN ARRAY DE JSON */
function getIndexWithBinarySearchJson(id, list){    
    var a = 0,b = list.length - 1,c = Math.floor(b/2);

    while(true){      
        if(list[c].id === id)  
            return c;
        if(list[c].id < id)
            a = c;
        else 
            b = c;
        
        c = Math.floor( (a+b)/2 );

        if(b-a <= 1){
            if(list[b].id === id)
                return b;
            if(list[a].id === id)
                return a;
            break;
        }
    }
    return -1;
}