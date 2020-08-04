var input;

function startCells(){
	document.body.addEventListener('click', closeActiveSimpleCells,true);
    selectAllTdQueryCellExcel();
}

function selectAllTdQueryCellExcel(){
    td_query = document.querySelectorAll("td[cell-excel=true]");
    for(var i = 0; i < td_query.length;++i)
		td_query[i].addEventListener("click",writeSimpleCell,true);		
	
}

function writeSimpleCell(e){
	var data = e.target.innerHTML;
	e.target.innerHTML = "<input type='text' class='w-100 h-100 text-center'>";
	e.target.removeEventListener("click",writeSimpleCell);
	input = e.target.childNodes[0];

	if(data.length)
		input.value = data;

	input.focus();
	input.setSelectionRange(input.value.length,input.value.length);
	input.addEventListener("keypress",confirmSimpleCell,false);
	input.addEventListener("keyup", updateStateProduct, false);
}

function confirmSimpleCell(event){
	if (event.which == 13 || event.keyCode == 13) { // enter
		var input = event.target;
		closeSimpleCell(input);		
	}
}

function closeActiveSimpleCells(e){
	if(e !== undefined && e.target !== input){
		cells = document.querySelectorAll("table[mrptrigger] td > input")
		if(cells.length)
			closeSimpleCell(cells[0]);
	}
}

function closeSimpleCell(input){
	td_element = input.parentElement;
	td_element.innerHTML = input.value;
	td_element.addEventListener("click",writeSimpleCell,false);
}

window.addEventListener("load", startCells, false);