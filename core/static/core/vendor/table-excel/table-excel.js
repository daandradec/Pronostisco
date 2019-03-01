counter_table_days = 2;
counter_table_years = 2;
counter_table_months = 2;
flag_counter = false;

DAYS_COLUMNS = 8;
YEARS_COLUMNS = 13;
MONTHS_COLUMNS = 5;
columns = YEARS_COLUMNS;

MAX_LIMIT_ROWS = 7;
MIN_LIMIT_ROWS = 1;

function awake(){
	//$('body *:not(td)').on('click',function(e){closeActiveCells();},true);
	document.body.addEventListener('click',function(){closeActiveCells()},true);

	//td_query = document.querySelectorAll("div.tab-content > div.active > div.table-responsive > table > tbody > tr> td:not(:first-child)");
	//td_query = document.querySelectorAll("table > tbody > tr> td:not(:first-child)");
	td_query = document.querySelectorAll("div.table-responsive table tbody tr > td:not(:first-child)");
	addClickEventTD(td_query);

	button_table = document.getElementById("button-table-excel");
	button_table.addEventListener("click",addNewCell,false);

	nav_tab_button_days = document.getElementById("navtab2");
	nav_tab_button_years = document.getElementById("navtab1");	
	nav_tab_button_months = document.getElementById("navtab3");	
	nav_tab_button_days.addEventListener("mouseup",setTableDays,false);
	nav_tab_button_years.addEventListener("mouseup",setTableYears,false);
	nav_tab_button_months.addEventListener("mouseup",setTableMonths,false);

}

function addClickEventTD(td_query){
	for(var i = 0;i < td_query.length;++i)
		td_query[i].addEventListener("click",writeCell,true);
}

function writeCell(e){
	//closeActiveCells();
	var data = e.target.innerHTML;
	e.target.innerHTML = "<input type='text' name='entrada' class='input-text-excel'>";
	e.target.removeEventListener("click",writeCell);
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
	td_element.addEventListener("click",writeCell,false);
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
		first_td.innerHTML = "<button class='btn btn-sm float-left' onclick='removeRow(this)'><i class='fas fa-cut' style='color:red'></i></button>" + getCurrentCounter();
	
		//td_query = document.querySelectorAll("div.tab-content div.active div.table-responsive > table > tbody > tr > td:not(:first-child)");
		//td_query = document.querySelectorAll("table > tbody > tr > td:not(:first-child)");
		td_query = document.querySelectorAll("div.active div.table-responsive table tbody tr > td:not(:first-child)");
		addClickEventTD(td_query);
	}
}

function incrementCounterRow(){
	switch(flag_counter){
		case 0:
			++counter_table_years
			break;
		case 1:
			++counter_table_days
			break;
		case 2:
			++counter_table_months;
			break;
	}
}
function decrementCounterRow(){
	switch(flag_counter){
		case 0:
			--counter_table_years
			break;
		case 1:
			--counter_table_days
			break;
		case 2:
			--counter_table_months;
			break;
	}
}
function getCurrentCounter(){
	switch(flag_counter){
		case 0:
			return counter_table_years
		case 1:
			return counter_table_days
		case 2:
			return counter_table_months
	}
}
function setTableDays() {
	flag_counter = 1;
	columns = DAYS_COLUMNS;
}
function setTableYears(){
	flag_counter = 0;
	columns = YEARS_COLUMNS;
}
function setTableMonths(){
	flag_counter = 2;
	columns = MONTHS_COLUMNS;
}

function removeRow(button){
	if(getCurrentCounter() > MIN_LIMIT_ROWS){
		tr_row = button.parentElement.parentElement;
		$(tr_row).remove();
		td_query = document.querySelectorAll("div.active div.table-responsive table tbody tr > td:first-child");
		for(var i = 0; i < td_query.length;++i)
			td_query[i].innerHTML = "<button class='btn btn-sm float-left' onclick='removeRow(this)'><i class='fas fa-cut' style='color:red'></i></button>"+(i+1);
		decrementCounterRow();
	}
}
window.addEventListener("load",awake,false);