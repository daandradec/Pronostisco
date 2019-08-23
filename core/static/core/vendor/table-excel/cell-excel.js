function startCells(){
    document.body.addEventListener('click',function(){closeActiveCells()},true);
    selectAllTdQuery();
}

function selectAllTdQuery(){
    td_query = document.querySelectorAll("td[cell-excel=true]");
    for(var i = 0; i < td_query.length;++i)
        td_query[i].addEventListener("click",writeCell,true);
}

function writeCell(e){
	var data = e.target.innerHTML;
	e.target.innerHTML = "<input type='text' class='w-100 h-100 text-center'>";
	e.target.removeEventListener("click",writeCell);
	var input = e.target.childNodes[0];

	if(data.length)
		input.value = data;

	input.focus();
	input.setSelectionRange(input.value.length,input.value.length);
	input.addEventListener("keypress",confirmCell,false);
	input.addEventListener("keyup", updateStateProduct, false);
}

function confirmCell(event){
	if (event.which == 13 || event.keyCode == 13) { // enter
		var input = event.target;
		closeCell(input);		
	}
}

function closeActiveCells(){
	cells = document.querySelectorAll("td > input")
	if(cells.length)
		closeCell(cells[0]);
}

function closeCell(input){
	td_element = input.parentElement;
	td_element.innerHTML = input.value;
	td_element.addEventListener("click",writeCell,false);
}

window.addEventListener("load", startCells, false);