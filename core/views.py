from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.middleware.csrf import get_token
# Create your views here.
import pandas
import xlrd

def index(request):
    message = None
    if 'error' in request.session:
        message = request.session['error']
        del request.session['error']        
    return render(request,'core/index.html',{'aside_navigation':[True,False,False,False],'session_message':message})

def inputdata(request):
    csrf_token = get_token(request)
    return render(request,'core/inputdata.html',{'aside_navigation':[True,False,False,False],'csrf':csrf_token})

def methods(request):
    data = get_data_from_request(request.POST.get('content',''))
    csrf_token = get_token(request)
    return render(request,'core/methods.html',{'aside_navigation':[True,True,True,False],'data':data,'csrf':csrf_token})

def chart(request):
    # if no existe el archivo redirijir al index
    if request.method == "POST":
        csrf_token = get_token(request)
        if 'file_input' in request.FILES:
            data = read_file(request.FILES['file_input'])
            if len(data) <= 7:
                return render(request,'core/chart.html',{'aside_navigation':[True,True,False,False],'data':data,'csrf':csrf_token})
            else:
                request.session['error'] = "El limite Maximo de Filas es 7"
                return HttpResponseRedirect('/')
        else:
            data = get_data_from_request(request.POST.get('content',''))
            return render(request,'core/chart.html',{'aside_navigation':[True,True,False,False],'data':data,'csrf':csrf_token})            
    else:
        return HttpResponseRedirect('/')
    

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