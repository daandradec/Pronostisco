function postMrpInputData(){
    document.getElementById("submit-mrp").onclick = function(){            
        console.log({tree:JSON.stringify(tree_mrp), mrp:JSON.stringify(state), tables: JSON.stringify(generateJsonTablesMrp()), 
            periods_state: current_index, lead: toggleFlagLead, stock: toggleFlagStock, Q: toggleFlagQstar})
        //post(POST_ROUTE,{tree:JSON.stringify(tree_mrp), mrp:JSON.stringify(state), tables: JSON.stringify(generateJsonTablesMrp()), 
        //    periods_state: current_index, lead: toggleFlagLead, stock: toggleFlagStock, Q: toggleFlagQstar});
    };
}

window.addEventListener("load", postMrpInputData); 