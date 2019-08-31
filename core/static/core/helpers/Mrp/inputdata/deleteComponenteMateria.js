function deleteComponente(componente_id){    
    state.componentes = state.componentes.filter(function(componente){return componente.id !== componente_id})    
}

function deleteMateria(materia_id){
    state.materia = state.materia.filter(function(materia){return materia.id !== materia_id})
}