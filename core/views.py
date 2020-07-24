from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.middleware.csrf import get_token
from core.forecasts import *
from core.excel import *
import json
# Create your views here.
import pandas

def index(request):
    if 'data' in request.session:
        del request.session['data']
    return render(request,'core/Home/home.html')

def simple_pronos_input_data(request):
    csrf_token = get_token(request)
    message = None
    
    if 'error' in request.session:
        message = request.session['error']
        del request.session['error']

    if 'data' in request.session:
        data = request.session['data']
        return render(request,'core/ForecastPages/PronoSimple/inputdatapronosimple.html',{'session_message':message,'data':data,'csrf':csrf_token})

    return render(request,'core/ForecastPages/PronoSimple/inputdatapronosimple.html',{'session_message':message,'csrf':csrf_token})

def simple_pronos_graph_data(request):
    if request.method == "POST":
        csrf_token = get_token(request)
        if 'file_input' in request.FILES:
            data = read_file(request.FILES['file_input'])   
            lineal_forecasts,x,y,y_square,xy,a_lineal,b_lineal,lineal_correlation,expo_forecasts,ln_x,ln_xy,a_expo,b_expo,expo_correlation,cuadra_forecasts,cuadra_correlation,movil_forecast_2,movil_averages,movil_averages_adjust,movil_correlation_2,movil_forecast_3,movil_correlation_3,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation = getSimpleForecasts(data)
            y = [int(yi) for yi in y]
            if len(data) <= 7 and len(data) >= 1:
                first_or_create_session(request, data)
                return render(request,'core/ForecastPages/PronoSimple/graphicspronosimple.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_forecasts,
                'lineal_corre':lineal_correlation,'expo':expo_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_forecasts,
                'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
                'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation,
                'lineal_data':zip(x,y,y_square,xy,lineal_forecasts),'expo_data':zip(x,y,y_square,ln_x,ln_xy,expo_forecasts),'movil_data':zip(x,y,movil_averages,movil_averages_adjust,movil_forecast_2),
                'a_lineal':a_lineal,'b_lineal':b_lineal,'a_expo':a_expo,'b_expo':b_expo})
            else:
                request.session['error'] = "El limite Maximo de Filas es 7 y el Minimo 1"
                return HttpResponseRedirect('/pronosticos-simple/input-data')
        else:
            data = get_data_from_request(request.POST.get('content',''))
            lineal_forecasts,x,y,y_square,xy,a_lineal,b_lineal,lineal_correlation,expo_forecasts,ln_x,ln_xy,a_expo,b_expo,expo_correlation,cuadra_forecasts,cuadra_correlation,movil_forecast_2,movil_averages,movil_averages_adjust,movil_correlation_2,movil_forecast_3,movil_correlation_3,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation = getSimpleForecasts(data)
            y = [int(yi) for yi in y]
            first_or_create_session(request, data)
            return render(request,'core/ForecastPages/PronoSimple/graphicspronosimple.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_forecasts,
            'lineal_corre':lineal_correlation,'expo':expo_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_forecasts,
            'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
            'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation,
            'lineal_data':zip(x,y,y_square,xy,lineal_forecasts),'expo_data':zip(x,y,y_square,ln_x,ln_xy,expo_forecasts),'movil_data':zip(x,y,movil_averages,movil_averages_adjust,movil_forecast_2),
            'a_lineal':a_lineal,'b_lineal':b_lineal,'a_expo':a_expo,'b_expo':b_expo})         
    else:
        if 'data' in request.session:
            csrf_token = get_token(request)
            data = request.session['data']
            lineal_forecasts,x,y,y_square,xy,a_lineal,b_lineal,lineal_correlation,expo_forecasts,ln_x,ln_xy,a_expo,b_expo,expo_correlation,cuadra_forecasts,cuadra_correlation,movil_forecast_2,movil_averages,movil_averages_adjust,movil_correlation_2,movil_forecast_3,movil_correlation_3,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation = getSimpleForecasts(data)
            y = [int(yi) for yi in y]
            return render(request,'core/ForecastPages/PronoSimple/graphicspronosimple.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_forecasts,
            'lineal_corre':lineal_correlation,'expo':expo_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_forecasts,
            'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
            'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation,
            'lineal_data':zip(x,y,y_square,xy,lineal_forecasts),'expo_data':zip(x,y,y_square,ln_x,ln_xy,expo_forecasts),'movil_data':zip(x,y,movil_averages,movil_averages_adjust,movil_forecast_2),
            'a_lineal':a_lineal,'b_lineal':b_lineal,'a_expo':a_expo,'b_expo':b_expo})         
        return HttpResponseRedirect('/pronosticos-simple/input-data')    

def alpha_pronos_input_data(request):
    csrf_token = get_token(request)
    message = None
    
    if 'error' in request.session:
        message = request.session['error']
        del request.session['error']

    if 'data' in request.session:
        data = request.session['data']
        return render(request,'core/ForecastPages/PronoAlpha/inputdatapronoalpha.html',{'session_message':message,'data':data,'csrf':csrf_token})

    return render(request,'core/ForecastPages/PronoAlpha/inputdatapronoalpha.html',{'session_message':message,'csrf':csrf_token})

def alpha_pronos_graph_data(request):
    if request.method == "POST":
        csrf_token = get_token(request)
        if 'file_input' in request.FILES:
            data = read_file(request.FILES['file_input'])     
            if len(data) <= 7 and len(data) > 2:
                lineal_business_forecasts,lineal_correlation,expo_business_forecasts,expo_correlation,cuadra_business_forecasts,cuadra_correlation,movil_forecast_2,movil_correlation_2,movil_forecast_3,movil_correlation_3,movil_forecast_composed,movil_composed_correlation,movil_forecast_pondered,movil_pondered_correlation,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation,winters_forecast,winters_correlation,jenkin_forecast,jenkin_correlation,simulated_forecast,simulated_correlation = getBusinessForecasts(data)
                first_or_create_session(request, data)
                return render(request,'core/ForecastPages/PronoAlpha/graphicspronoalpha.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_business_forecasts,
                'lineal_corre':lineal_correlation,'expo':expo_business_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_business_forecasts,
                'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
                'movil_composed':movil_forecast_composed,'movil_composed_corre':movil_composed_correlation,'movil_pondered':movil_forecast_pondered,'movil_pondered_corre':movil_pondered_correlation,
                'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation
                ,'winters':winters_forecast,'winters_corre':winters_correlation,'jenkin':jenkin_forecast,'jenkin_corre':jenkin_correlation,'simu':simulated_forecast,'simu_corre':simulated_correlation})
            elif len(data) >= 1:
                lineal_forecasts,x,y,y_square,xy,a_lineal,b_lineal,lineal_correlation,expo_forecasts,ln_x,ln_xy,a_expo,b_expo,expo_correlation,cuadra_forecasts,cuadra_correlation,movil_forecast_2,movil_averages,movil_averages_adjust,movil_correlation_2,movil_forecast_3,movil_correlation_3,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation = getSimpleForecasts(data)
                first_or_create_session(request, data)
                y = [int(yi) for yi in y]
                return render(request,'core/ForecastPages/PronoSimple/graphicspronosimple.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_forecasts,
                'lineal_corre':lineal_correlation,'expo':expo_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_forecasts,
                'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
                'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation,
                'lineal_data':zip(x,y,y_square,xy,lineal_forecasts),'expo_data':zip(x,y,y_square,ln_x,ln_xy,expo_forecasts),'movil_data':zip(x,y,movil_averages,movil_averages_adjust,movil_forecast_2),
                'a_lineal':a_lineal,'b_lineal':b_lineal,'a_expo':a_expo,'b_expo':b_expo})
            else:
                request.session['error'] = "El limite Maximo de Filas es 7 y el Minimo 2"
                return HttpResponseRedirect('/pronosticos-alpha/input-data')
        else:
            data = get_data_from_request(request.POST.get('content',''))
            if len(data) <= 7 and len(data) > 2:
                lineal_business_forecasts,lineal_correlation,expo_business_forecasts,expo_correlation,cuadra_business_forecasts,cuadra_correlation,movil_forecast_2,movil_correlation_2,movil_forecast_3,movil_correlation_3,movil_forecast_composed,movil_composed_correlation,movil_forecast_pondered,movil_pondered_correlation,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation,winters_forecast,winters_correlation,jenkin_forecast,jenkin_correlation,simulated_forecast,simulated_correlation = getBusinessForecasts(data)
                first_or_create_session(request, data)
                return render(request,'core/ForecastPages/PronoAlpha/graphicspronoalpha.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_business_forecasts,
                'lineal_corre':lineal_correlation,'expo':expo_business_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_business_forecasts,
                'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
                'movil_composed':movil_forecast_composed,'movil_composed_corre':movil_composed_correlation,'movil_pondered':movil_forecast_pondered,'movil_pondered_corre':movil_pondered_correlation,
                'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation
                ,'winters':winters_forecast,'winters_corre':winters_correlation,'jenkin':jenkin_forecast,'jenkin_corre':jenkin_correlation,'simu':simulated_forecast,'simu_corre':simulated_correlation})                        
            else:
                lineal_forecasts,x,y,y_square,xy,a_lineal,b_lineal,lineal_correlation,expo_forecasts,ln_x,ln_xy,a_expo,b_expo,expo_correlation,cuadra_forecasts,cuadra_correlation,movil_forecast_2,movil_averages,movil_averages_adjust,movil_correlation_2,movil_forecast_3,movil_correlation_3,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation = getSimpleForecasts(data)
                y = [int(yi) for yi in y]
                first_or_create_session(request, data)
                return render(request,'core/ForecastPages/PronoSimple/graphicspronosimple.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_forecasts,
                'lineal_corre':lineal_correlation,'expo':expo_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_forecasts,
                'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
                'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation,
                'lineal_data':zip(x,y,y_square,xy,lineal_forecasts),'expo_data':zip(x,y,y_square,ln_x,ln_xy,expo_forecasts),'movil_data':zip(x,y,movil_averages,movil_averages_adjust,movil_forecast_2),
                'a_lineal':a_lineal,'b_lineal':b_lineal,'a_expo':a_expo,'b_expo':b_expo})

    else:
        if 'data' in request.session:
            csrf_token = get_token(request)
            data = request.session['data']
            lineal_business_forecasts,lineal_correlation,expo_business_forecasts,expo_correlation,cuadra_business_forecasts,cuadra_correlation,movil_forecast_2,movil_correlation_2,movil_forecast_3,movil_correlation_3,movil_forecast_composed,movil_composed_correlation,movil_forecast_pondered,movil_pondered_correlation,simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation,winters_forecast,winters_correlation,jenkin_forecast,jenkin_correlation,simulated_forecast,simulated_correlation = getBusinessForecasts(data)
            return render(request,'core/ForecastPages/PronoAlpha/graphicspronoalpha.html',{'data':data,'csrf':csrf_token, 'lineal':lineal_business_forecasts,
            'lineal_corre':lineal_correlation,'expo':expo_business_forecasts,'expo_corre':expo_correlation,'cuadra':cuadra_business_forecasts,
            'cuadra_corre':cuadra_correlation,'movil_2':movil_forecast_2,'movil_corre_2':movil_correlation_2,'movil_3':movil_forecast_3,'movil_corre_3':movil_correlation_3,
            'movil_composed':movil_forecast_composed,'movil_composed_corre':movil_composed_correlation,'movil_pondered':movil_forecast_pondered,'movil_pondered_corre':movil_pondered_correlation,
            'simple_soft':simple_softener_forecast,'simple_soft_corre':simple_softener_correlation,'double_soft':double_softener_forecast,'double_soft_corre':double_softener_correlation
            ,'winters':winters_forecast,'winters_corre':winters_correlation,'jenkin':jenkin_forecast,'jenkin_corre':jenkin_correlation,'simu':simulated_forecast,'simu_corre':simulated_correlation})
        return HttpResponseRedirect('/pronosticos-alpha/input-data')    

def alpha_pronos_download_data(request):
    content = get_data_from_request(request.POST.get('content',''))
    compare = get_data_from_request(request.POST.get('compare',''))
    period = request.POST.get('period','')
    year_label = request.POST.get('yearlabel','')
    prono_label = request.POST.get('pronolabel','')
    corre_label = request.POST.get('correlabel','')
    corre = request.POST.get('corre','')

    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="'+'Resource_Beacon_' + prono_label + '.xls' + '"'
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet("sheet1",cell_overwrite_ok=True)
    font_style = xlwt.XFStyle()

    col = 1
    ws.write(0, 0, period, font_style)
    ws.write(1, 0, prono_label, font_style)
    for data in content[0]:
        ws.write(0, col, col, font_style)
        ws.write(1, col, data, font_style)
        col += 1
    ws.write(2, 0, year_label, font_style)
    col = 1
    for data in compare[0]:
        ws.write(2, col, data, font_style)
        col += 1
    ws.write(4, 0, corre_label, font_style)
    ws.write(4, 1, corre, font_style)

    wb.save(response)
    return response

def first_or_create_session(request, data):
    if 'data' in request.session:
        del request.session['data']
    request.session['data'] = data

def read_file(file):
    if file.name.endswith('.csv'):
        return transform_pandas_csv_to_list(pandas.read_csv(file))
    return transform_pandas_to_list(pandas.read_excel(file))
def transform_pandas_csv_to_list(pandas):
    temp=[]
    for row in pandas.iterrows():
        index, data = row
        datalist = data.tolist()
        true_list = datalist[0].split(';')
        temp.append([int(x) for x in true_list[1:]])  
    return temp
def transform_pandas_to_list(pandas):
    temp=[]
    for row in pandas.iterrows():
        index, data = row
        temp.append(data.tolist()[1:])  
    return temp


def get_data_from_request(data_request):
    temp = []
    content_list = data_request.split(';')
    for content in content_list:
        temp.append([int(x) for x in content.split(',')])
    return temp


# MRP

def mrp_input_data(request):
    csrf_token = get_token(request)
    return render(request, 'core/Mrp/mrpinputdata.html',{'csrf':csrf_token})

def mrp_output(request):
    if(request.method == "POST"):
        mrp = json.loads(request.POST.get('mrp',''))
        tree = json.loads(request.POST.get('tree',''))        
        tables = json.loads(request.POST.get('tables',''))
        periods_state = request.POST.get('periods_state')
        lead = request.POST.get('lead')
        stock = request.POST.get('stock')
        Q = request.POST.get('Q')
        mrp = json.dumps(mrp)
        tree = json.dumps(tree)      
        tables = json.dumps(tables)
        csrf_token = get_token(request)
        request.session['mrp'] = {"mrp": mrp,"tree":tree, "tables": tables, "periods_state":periods_state, "lead":lead, "stock":stock,"Q":Q, 'csrf':csrf_token}
        return render(request, 'core/Mrp/mrpoutput.html', {"mrp": mrp,"tree":tree, "tables": tables, "periods_state":periods_state, 
            "lead":lead, "stock":stock,"Q":Q, 'csrf':csrf_token})  
    elif('mrp' in request.session):
        return render(request, 'core/Mrp/mrpoutput.html', request.session['mrp'])  
    return HttpResponseRedirect('/mrp/input-data') 
    

def mrp_download(request):
    all_info_mrp_keys = json.loads(request.POST.get('all_info_mrp_keys',''))  
    key = request.POST.get('key','')
    name = request.POST.get('name','')
    response, ws, wb, font_style = instanciate_excel_response("Resource_Beacon_MrpItem.xls")
    response = build_excel_book_mrp_unique(all_info_mrp_keys, key, name, response, ws, wb, font_style)

    return response

def mrp_download_all(request):
    
    all_info_mrp_keys = json.loads(request.POST.get('all_info_mrp_keys',''))  
    mrp = json.loads(request.POST.get('mrp',''))
    periods = int(request.POST.get('periods'))        
    response, ws, wb, font_style = instanciate_excel_response("Resource_Beacon_MrpCompleto.xls")
    response = build_excel_book_mrp_complete(all_info_mrp_keys, mrp, periods, response, ws, wb, font_style)

    return response



def about_us(request):
    return render(request, 'core/AboutUs/AboutUs.html')