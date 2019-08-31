var tree_mrp = {
    name : state.producto.title,
    key: state.producto.key,
    children: []
}

var keys_counter;


/* #######################################################  */

/* 
    LISTA DE ACCIONES QUE DISPARAN EL UPDATETREE : CREAR COMPONENTE, CREAR MATERIA PRIMA, ELIMINAR COMPONENTE Y MATERIA PRIMA
    CAMBIAR EL NOMBRE DE UN COMPONENTE O MATERIA PRIMA, ONCHANGE DE UN SELECT, AÑADIR UN PADRE
*/


/* FUNCION PARA REHACER EL ARBOL RESPECTO A CUALQUIER CAMBIO QUE OCURRA */
function updateTree(operationEvent, payload){
 
    switch(operationEvent){
        case "CREATE": // push
            tree_mrp.children.push(payload);            
            break;
        case "DELETE":
            constructAllNewTree();
            break;
        
        case "NAME":
            tree_mrp.name = payload;
            constructAllNewTree();
            break;
        case "SELECT":
            constructAllNewTree();
            break;
    }
    
    D3Tree(tree_mrp);    
}
/* FUNCION PARA CONSTRUIR EL TREE DE CERO 0 */
function constructAllNewTree(){
    tree_mrp.children = [];
    keys_counter = {};    
    const componentes_copy = JSON.parse(JSON.stringify(state.componentes));
    const materia_copy = JSON.parse(JSON.stringify(state.materia));

    keys_counter = generateJsonKeysParents(componentes_copy);     
    const copy_keys_counter = JSON.parse(JSON.stringify(keys_counter));

    takeAllRootChildrensExtended(componentes_copy, state.producto.key, tree_mrp.children, keys_counter);
    takeAllChildChildrens(componentes_copy, keys_counter);
    
    takeAllRootChildrens(materia_copy, state.producto.key, tree_mrp.children);
    takeAllMateriaChildChildrens(materia_copy, copy_keys_counter);
}
/* CREACION DE LOS HIJOS DEL ROOT O FORMA GENERAL DE RECORRER UNA LISTA (COMPONENTES O MATERIAS) ELIMINANDO EN BUSCA DE UNA LLAVE */
function takeAllRootChildrens(list, key, list_to_push_children){
    while(true){
        var flag = true;
        for(var i = 0; i < list.length; ++i){
            const item = list[i];
            while(wasDeletedElement(item, key, list_to_push_children)){}
            if(!item.edges.length){
                list.splice(i, 1);
                flag = false;
                break;
            }
        }
        if(flag)
            break;
    }
}

function takeAllRootChildrensExtended(list, key, list_to_push_children, keys_counter){
    //console.log("####################")
    //console.log(key);
    //console.log(JSON.stringify(keys_counter));
    //console.log(JSON.stringify(tree_mrp));
    //console.log(JSON.stringify(list));
    for(var i = 0; i < list.length; ++i){
        const item = list[i];
        wasDeletedElementExtended(item, key, list_to_push_children, keys_counter)        
        if(keys_counter[item.key] < 1){
            list.splice(i, 1);            
            --i;            
        }
    }
    //console.log(key);
    //console.log(JSON.stringify(keys_counter));
    //console.log(JSON.stringify(tree_mrp));
    //console.log(JSON.stringify(list));
    //console.log("###########################")
}
function takeAllRootMateriaChildrensExtended(list, key, list_to_push_children, keys_counter){
    for(var i = 0; i < list.length; ++i){
        const item = list[i];
        wasDeletedMateriaElementExtended(item, key, list_to_push_children, keys_counter)        
        if(!item.edges.length){
            list.splice(i, 1);            
            --i;            
        }
    }
}
/* CREAR EL ARBOL DE CHILDRENS PARA TODAS LAS RAMAS DESPUES DE LOS HIJOS DEL ROOT*/
function takeAllChildChildrens(list, keys_counter){
    var super_children_list = [];    
    
    for(var i = 0; i < tree_mrp.children.length; ++i){
        const child_item = tree_mrp.children[i];
        takeAllRootChildrensExtended(list, child_item.key, tree_mrp.children[i].children, keys_counter);
        super_children_list.push(tree_mrp.children[i].children);
    }

    
    while(list.length && super_children_list.length){
        const list_childrens = super_children_list.shift();
        for(var i = 0; i < list_childrens.length; ++i){
            const child_item = list_childrens[i];            
            takeAllRootChildrensExtended(list, child_item.key, list_childrens[i].children, keys_counter);
            super_children_list.push(list_childrens[i].children);
        }
    }
    
}

function takeAllMateriaChildChildrens(list, keys_counter){
    var super_children_list = [];    
    
    for(var i = 0; i < tree_mrp.children.length; ++i){
        const child_item = tree_mrp.children[i];
        takeAllRootMateriaChildrensExtended(list, child_item.key, tree_mrp.children[i].children, keys_counter);
        super_children_list.push(tree_mrp.children[i].children);
    }

    
    while(list.length && super_children_list.length){
        const list_childrens = super_children_list.shift();
        for(var i = 0; i < list_childrens.length; ++i){
            const child_item = list_childrens[i];            
            takeAllRootMateriaChildrensExtended(list, child_item.key, list_childrens[i].children, keys_counter);
            super_children_list.push(list_childrens[i].children);
        }
    }
    
}


/* HELPERS */
function wasDeletedElement(item, key, list_to_push_children){
    for(var j = 0; j < item.edges.length; ++j){
        if(item.edges[j] === key){
            list_to_push_children.push({name:item.title+" ("+item.amount[key]+")", children: [], key: item.key}); // AÑADIR AL ARBOL
            item.edges.splice(j, 1);
            return true;
        }
    }
    return false;
}
function wasDeletedElementExtended(item, key, list_to_push_children, keys_counter){
    for(var j = 0; j < item.edges.length; ++j){
        if(item.edges[j] === key){
            list_to_push_children.push({name:item.title+" ("+item.amount[key]+")", children: [], key: item.key}); // AÑADIR AL ARBOL
            --keys_counter[item.key];
            break;
        }
    }
}
function wasDeletedMateriaElementExtended(item, key, list_to_push_children, keys_counter){
    for(var j = 0; j < item.edges.length; ++j){
        if(item.edges[j] === key){
            list_to_push_children.push({name:item.title+" ("+item.amount[key]+")", children: [], key: item.key}); // AÑADIR AL ARBOL
            --keys_counter[key];
            if(keys_counter[key] < 1){
                item.edges.splice(j, 1);
                --j;
            }
            break;
        }
    }
}

/* FUNCION PARA GENERAR EL JSON QUE ME DICE CUANTOS VERTICES RECURSIVAMENTE EXISTIRAN PARA TAL KEY */
function generateJsonKeysParents(list){ 
    const generated_json = {};
    const keys_children = {};
    const solucionated = {};
    const graph = [];
    const keys_graph = {};
    
    for(var i = 0; i < list.length; ++i){
        const key = list[i].key;
        const edges = list[i].edges.length;
        generated_json[key] = edges;
        keys_children[key] = list[i].edges;
    }    
    generated_json[state.producto.key] = 1;
    solucionated[state.producto.key] = 1;

    for(var i = 0; i < list.length; ++i){
        const key = list[i].key;
        var flag = true;
        for(var j = 0;j < list[i].edges.length; ++j){
            const key_edge = list[i].edges[j];
            if(generated_json[key_edge] > 1){
                graph.push({resolve: key_edge, visited: [key]})
                keys_graph[key_edge] = keys_graph.hasOwnProperty(key_edge) ? keys_graph[key_edge].concat([key]) : [key];
                flag = false;
            }
        }
        if(flag)
            solucionated[key] = list[i].edges.length;
    }

    for(var i = 0;i < list.length; ++i){
        const key = list[i].key;
        const edges = list[i].edges;
        for(var j = 0;j < edges.length;++j){
            const key_edge = edges[j];
            if(!solucionated.hasOwnProperty(key_edge)){
                if(!keys_graph.hasOwnProperty(key_edge) || (keys_graph.hasOwnProperty(key_edge) && keys_graph[key_edge].indexOf(key) === -1))
                    graph.push({resolve: key_edge, visited: [key]})
            }
                
        }
    }
    //console.log("&&&&&&&&&&&&&&&&&&&&&&")
    //console.log(graph);
    //console.log(solucionated);
    //console.log("########################")
    
    while(graph.length){        
        const json = graph.shift();
        const key = json.resolve;
        
        if(json.visited.indexOf(key) !== -1){
            const key_parent = json.visited.pop();
            solucionated[key_parent] = generated_json[key_parent];
        }else if(solucionated.hasOwnProperty(key)){
            const key_parent = json.visited.pop();
            generated_json[key_parent] += (solucionated[key]-1);
            solucionated[key_parent] = generated_json[key_parent];
            if(json.visited.length)
                graph.push({resolve: key_parent, visited: json.visited})
        }else{
            const new_visited = Array.from(json.visited);            
            const edges = keys_children[key];
            new_visited.push(key);
            for(var i = 0;i < edges.length; ++i){
                const key_edge = edges[i];
                if(!solucionated.hasOwnProperty(key_edge)){                    
                    graph.push({resolve: key_edge, visited: new_visited})
                }
            }     
        }
    }
    //console.log(generated_json)
    return generated_json;
}