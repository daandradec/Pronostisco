var inputTH;

function startCellsTH(){
	document.body.addEventListener('click', closeActiveSimpleCellsTH,true);
    selectAllTdQueryCellExcelTH();
}

function selectAllTdQueryCellExcelTH(){
    td_query = document.querySelectorAll("th[cell-excel-th=true]");
    for(var i = 0; i < td_query.length;++i)
		td_query[i].addEventListener("click",writeSimpleCellTH,true);		
}

function writeSimpleCellTH(e){
	var data = e.target.innerHTML;
	e.target.innerHTML = "<input type='text' class='w-100 h-100 text-center'>";
	e.target.removeEventListener("click",writeSimpleCellTH);
	inputTH = e.target.childNodes[0];

	if(data.length)
        inputTH.value = data;

    inputTH.focus();
    inputTH.setSelectionRange(inputTH.value.length,inputTH.value.length);
    inputTH.addEventListener("keypress",confirmSimpleCellTH,false);
}

function confirmSimpleCellTH(event){
	if (event.which == 13 || event.keyCode == 13) { // enter
		var input = event.target;
		closeSimpleCellTH(input);		
	}
}

function closeActiveSimpleCellsTH(e){
	if(e !== undefined && e.target !== inputTH){
		cells = document.querySelectorAll("table th[cell-excel-th=true] > input")
		if(cells.length)
			closeSimpleCellTH(cells[0]);
	}
}

function closeSimpleCellTH(input){
    td_element = input.parentElement;
    
    const cell_index = $(td_element).attr("cell-index");
    const th_elements = document.querySelectorAll("th[cell-excel-th=true][cell-index='"+cell_index+"']");
    for(var i = 0;i < th_elements.length;++i)
        th_elements[i].innerHTML = input.value;

	td_element.addEventListener("click",writeSimpleCellTH,false);
}

window.addEventListener("load", startCellsTH, false);