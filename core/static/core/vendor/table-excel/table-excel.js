counter_table_days = 1;
counter_table_years = 1;
flag_counter = true;

DAYS_COLUMNS = 8;
YEARS_COLUMNS = 13;
columns = DAYS_COLUMNS;

MAX_LIMIT_ROWS = 7;

function awake(){
	//td_query = document.querySelectorAll("div.tab-content > div.active > div.table-responsive > table > tbody > tr> td:not(:first-child)");
	//td_query = document.querySelectorAll("table > tbody > tr> td:not(:first-child)");
	td_query = document.querySelectorAll("div.table-responsive table tbody tr > td:not(:first-child)");
	addClickEventTD(td_query);

	button_table = document.getElementById("button-table-excel");
	button_table.addEventListener("click",addNewCell,false);

	nav_tab_button_days = document.getElementById("navtab1");
	nav_tab_button_years = document.getElementById("navtab2");
	nav_tab_button_days.addEventListener("mouseup",setTableDays,false);
	nav_tab_button_years.addEventListener("mouseup",setTableYears,false);

	$('body').click(function(e){closeActiveCells();});
}

function addClickEventTD(td_query){
	for(var i = 0;i < td_query.length;++i)
		td_query[i].addEventListener("dblclick",writeCell,false);
}

function writeCell(e){
	//closeActiveCells();
	var data = e.target.innerHTML;
	e.target.innerHTML = "<input type='text' name='entrada' class='input-text-excel'>";
	e.target.removeEventListener("dblclick",writeCell);
	var input = e.target.childNodes[0];

	if(data.length)
		input.value = data;

	input.focus();
	input.setSelectionRange(input.value.length,input.value.length);
	input.addEventListener("keypress",confirmCell,false);
	input.addEventListener("keyup",validateCell,false);
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
	td_element.addEventListener("dblclick",writeCell,false);
}

function validateCell(e){
	e.target.value=this.value.replace(/[^\d]/,'');
}



function addNewCell(){
	if(getCurrentCounter() < MAX_LIMIT_ROWS){
		tbody = document.querySelector("div.active div.table-responsive table tbody");
		var td = "<td></td>";
		tbody.innerHTML += "<tr>"+td.repeat(columns)+"</tr>";
		
		incrementCounterRow();
		//first_td = document.querySelector("div.tab-content div.active div.table-responsive > table > tbody > tr:last-child > td:first-child");
		//first_td = document.querySelector("table > tbody > tr:last-child > td:first-child");
		first_td = document.querySelector("div.active div.table-responsive table tbody tr:last-child > td:first-child");
		first_td.innerHTML = "<button class='btn btn-danger btn-sm float-left' onclick='removeRow(this)'><i class='fas fa-times'></i></button>" + getCurrentCounter();
	
		//td_query = document.querySelectorAll("div.tab-content div.active div.table-responsive > table > tbody > tr > td:not(:first-child)");
		//td_query = document.querySelectorAll("table > tbody > tr > td:not(:first-child)");
		td_query = document.querySelectorAll("div.active div.table-responsive table tbody tr > td:not(:first-child)");
		addClickEventTD(td_query);
	}
}

function incrementCounterRow(){
	if(flag_counter)
		++counter_table_days
	else
		++counter_table_years
}
function decrementCounterRow(){
	if(flag_counter)
		--counter_table_days
	else
		--counter_table_years
}
function getCurrentCounter(){
	return flag_counter ? counter_table_days : counter_table_years
}
function setTableDays() {
	flag_counter = true;
	columns = DAYS_COLUMNS;
}
function setTableYears(){
	flag_counter = false;
	columns = YEARS_COLUMNS;
}

function removeRow(button){
	tr_row = button.parentElement.parentElement;
	$(tr_row).remove();
	td_query = document.querySelectorAll("div.active div.table-responsive table tbody tr > td:first-child");
	for(var i = 0; i < td_query.length;++i)
		td_query[i].innerHTML = "<button class='btn btn-danger btn-sm float-left' onclick='removeRow(this)'><i class='fas fa-times'></i></button>"+(i+1);
	decrementCounterRow();
}
window.addEventListener("load",awake,false);