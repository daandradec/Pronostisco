function createComponent(key, componente_id, componente_title, parent){
    state.componentes.push({
        id: componente_id,
        title: componente_title,
        key: key,
        edges: [parent],
        amount: {[parent]: 1}
    });
}

function createMater(key, materia_id, materia_title, parent){
    state.materia.push({
        id: materia_id,
        title: materia_title,
        key: key,
        edges: [parent],
        amount: {[parent]: 1}
    })
}