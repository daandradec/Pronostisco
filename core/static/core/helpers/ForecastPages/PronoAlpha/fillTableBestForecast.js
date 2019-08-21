function fillTableBestForecast(){
    document.querySelector("span[name-best-forecast]").innerHTML += ": "+best_name_forecast
    tbody = document.querySelector("table[best-forecast] tbody tr")
    tbody.innerHTML="<td class='text-white font-size-18px-2c bg-dark'>"+prono_label+"</td>"
    thead = document.querySelector("table[best-forecast] thead tr")
    thead.innerHTML="<th class='text-white font-size-18px-2c bg-dark'>"+forecasts_labels_x+"</th>"
    for(i = 0;i < best_forecast.length;++i){
        tbody.innerHTML += "<td class='font-quicksand bg-light' style='color:#52524e;'>"+best_forecast[i]+"</td>"
        thead.innerHTML += "<td class='font-quicksand bg-light' style='color:#52524e;'>"+(i+1)+"</td>"
    }      
}

window.addEventListener("load", fillTableBestForecast, false);