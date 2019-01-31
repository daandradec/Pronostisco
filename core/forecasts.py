import numpy
import statistics
import math
import time
import random
from operator import itemgetter

square = lambda x : x**2
cube = lambda x : x**3
quarter = lambda x : x**4
exponential = lambda x : math.exp(x)

def getSimpleForecasts(data):
    print("CREANDO LOS FORECASTS")
    print("-------------------------")
    x = numpy.array(data,dtype=numpy.float64).reshape(-1) ## y 
    y = numpy.arange(1,len(x)+1,dtype=numpy.float64) ## t
    #x_square = numpy.fromiter((square(xi) for xi in x), x.dtype, count=len(x))
    y_square = numpy.fromiter((square(yi) for yi in y), y.dtype, count=len(y))
    sum_x = numpy.sum(x)
    sum_y = numpy.sum(y)
    #sum_x_square = numpy.sum(x_square)
    sum_y_square = numpy.sum(y_square)

    n = len(x)

    """---Metodo Lineal---"""
    xy = numpy.multiply(x,y)
    sum_xy = numpy.sum(xy)
    a_lineal = calculate_a_lineal_method(sum_x,sum_y,sum_y_square,sum_xy,n)
    b_lineal = calculate_b_lineal_method(sum_x,sum_y,sum_y_square,sum_xy,n)
    a_b = (a_lineal,b_lineal)

    lineal_forecasts = calculate_lineal_method(y,a_b)
    lineal_forecasts = [math.ceil(x) for x in lineal_forecasts]
    lineal_correlation = calculate_correlation(x,lineal_forecasts)

    """ -----Metodo Exponencial----- """
    ln_x = numpy.array([ math.log(xi) if xi > 0 else math.log(0.001) for xi in x ])
    ln_xy = numpy.multiply(ln_x,y)
    sum_ln_x = numpy.sum(ln_x)
    sum_ln_xy = numpy.sum(ln_xy)

    a_expo = exponential(calculate_a_exponential_method(sum_y,sum_y_square,sum_ln_x,sum_ln_xy,n))
    b_expo = exponential(calculate_b_exponential_method(sum_y,sum_y_square,sum_ln_x,sum_ln_xy,n))
    a_b = (a_expo,b_expo)

    exponential_forecasts = calculate_exponential_method(y,a_b)
    exponential_forecasts = [math.ceil(x) for x in exponential_forecasts]
    exponential_correlation = calculate_correlation(x,exponential_forecasts)

    """ -----Metodo Cuadratico----- """
    y_cube = numpy.fromiter((cube(yi) for yi in y), y.dtype, count=n)
    y_quarter = numpy.fromiter((quarter(yi) for yi in y), y.dtype, count=n)
    xy_square = numpy.multiply(x,y_square)
    
    sum_y_cube = numpy.sum(y_cube)
    sum_y_quarter = numpy.sum(y_quarter)
    sum_xy_square = numpy.sum(xy_square) 

    simbols = calculate_simbols_cuadratic_method(sum_x,sum_y,sum_y_square,sum_y_cube,sum_y_quarter,sum_xy,sum_xy_square,n)
    b_c = (calculate_b_cuadratic_method(simbols),calculate_c_cuadratic_method(simbols))
    b,c = b_c
    a = calculate_a_cuadratic_method(sum_x,sum_y,sum_y_square,b,c,n)

    cuadra_forecasts = calculate_cuadratic_method(y,y_square,a,b_c)
    cuadra_forecasts = [math.ceil(x) for x in cuadra_forecasts]
    cuadra_correlation = calculate_correlation(x,cuadra_forecasts)

    """ -----Promedio Movil n=2 ----- """
    x_movil = numpy.array(data,dtype=numpy.float64).reshape(-1)
    movil_averages = [ 0.5*(x_movil[i]+x_movil[i-1]) for i in range(1,len(x_movil)) ]
    movil_averages_adjust = [math.ceil(x) for x in movil_averages]
    movil_forecast_2 = [x_movil[0]] + movil_averages_adjust
    movil_correlation_2 = calculate_correlation(x,movil_forecast_2)

    movil_averages = [x_movil[0]] + movil_averages
    movil_averages_adjust = [math.ceil(x_movil[0])] + movil_averages_adjust

    """ -----Promedio Movil n=3 ----- """
    movil_forecast_3 = [math.ceil(x_movil[0]),math.ceil(x_movil[1])] + [ math.ceil( (x_movil[i]+x_movil[i-1]+x_movil[i-2])/3 ) for i in range(2,len(x_movil)) ]
    movil_correlation_3 = calculate_correlation(x,movil_forecast_3)

    """ -----Suavizacion Exponencial Simple ----- """
    simple_softener_forecast,simple_softener_correlation = get_best_simple_softener_simple(data)
    """ -----Suavizacion Exponencial Doble ----- """
    double_softener_forecast,double_softener_correlation = get_best_double_softener_simple(data)

    lineal_correlation *= 100
    exponential_correlation *= 100
    cuadra_correlation *= 100
    movil_correlation_2 *= 100
    movil_correlation_3 *= 100
    simple_softener_correlation *= 100
    double_softener_correlation *= 100

    return (lineal_forecasts,x,y,y_square,xy,a_lineal,b_lineal,lineal_correlation,exponential_forecasts,ln_x,ln_xy,a_expo,b_expo,exponential_correlation,cuadra_forecasts,
    cuadra_correlation,movil_forecast_2,movil_averages,movil_averages_adjust,movil_correlation_2,movil_forecast_3,movil_correlation_3,
    simple_softener_forecast,simple_softener_correlation,
    double_softener_forecast,double_softener_correlation)

def getBusinessForecasts(data):
    print("CREANDO LOS FORECASTS")
    print("-------------------------")
    x = numpy.array([ ([xi[i] for xi in data]) for i in range(len(data[0]))]  ) ### Y
    y = numpy.array([i+1 for i in range(len(data))])  ### T
    y_square = numpy.fromiter((square(yi) for yi in y), y.dtype, count=len(y))
    sum_x = numpy.array([ numpy.sum(xi) for xi in x ])
    sum_y = numpy.sum(y)
    sum_y_square = numpy.sum(y_square)

    n = len(y)

    """ -----Metodo Lineal----- """
    xy = numpy.array([ numpy.multiply(xi,y) for xi in x ])
    sum_xy = numpy.array([ numpy.sum(xi) for xi in xy ])
    a_b = [ ( calculate_a_lineal_method(sum_xi,sum_y,sum_y_square,sum_xyi,n) ,calculate_b_lineal_method(sum_xi,sum_y,sum_y_square,sum_xyi,n)) for sum_xi,sum_xyi in zip( (x for x in sum_x),(xy for xy in sum_xy) ) ]

    lineal_forecasts = [ calculate_lineal_method(y,a_b[i])  for i in range(len(a_b))  ]
    #lineal_correlation = [ calculate_correlation(x[i],lineal_forecasts[i]) for i in range(len(lineal_forecasts))]
    lineal_business_forecasts = [math.ceil(forecast[math.ceil(len(forecast)/2)]) for forecast in lineal_forecasts]
    lineal_correlation = calculate_correlation(data[-1],lineal_business_forecasts)

    """ -----Metodo Exponencial----- """
    
    ln_x = numpy.array( [ [math.log(xz) if xz > 0 else math.log(0.001) for xz in xi] for xi in x ] )
    ln_xy = numpy.array([ numpy.multiply(xi,y) for xi in ln_x ])
    sum_ln_x = numpy.array([ numpy.sum(xi) for xi in ln_x ])
    sum_ln_xy = numpy.array([ numpy.sum(xi) for xi in ln_xy ])

    a_b = [ ( calculate_a_exponential_method(sum_y,sum_y_square,sum_ln_xi,sum_ln_xyi,n) ,calculate_b_exponential_method(sum_y,sum_y_square,sum_ln_xi,sum_ln_xyi,n)) for sum_ln_xi,sum_ln_xyi in zip( (x for x in sum_ln_x),(xy for xy in sum_ln_xy) ) ]
    a_b = [ (exponential(a),exponential(b)) for a,b in a_b ]

    expo_forecasts = [ calculate_exponential_method(y,a_b[i])  for i in range(len(a_b))  ]
    #expo_correlation = [ calculate_correlation(x[i],expo_forecasts[i]) for i in range(len(expo_forecasts))]
    expo_business_forecasts = [math.ceil(forecast[math.ceil(len(forecast)/2)]) for forecast in expo_forecasts]
    expo_correlation = calculate_correlation(data[-1],expo_business_forecasts)

    """ -----Metodo Cuadratico----- """
    y_cube = numpy.fromiter((cube(yi) for yi in y), y.dtype, count=n)
    y_quarter = numpy.fromiter((quarter(yi) for yi in y), y.dtype, count=n)
    xy_square = numpy.array([ numpy.multiply(xi,y_square) for xi in x ])
    
    sum_y_cube = numpy.sum(y_cube)
    sum_y_quarter = numpy.sum(y_quarter)
    sum_xy_square = numpy.array([ numpy.sum(xi) for xi in xy_square ])

    simbols = [ calculate_simbols_cuadratic_method(sum_xi,sum_y,sum_y_square,sum_y_cube,sum_y_quarter,sum_xyi,sum_xyi_square,n) for sum_xi,sum_xyi,sum_xyi_square in zip( (x for x in sum_x),(xy for xy in sum_xy),(xy_sq for xy_sq in sum_xy_square) )]
    b_c = [ (calculate_b_cuadratic_method(simbols_tuple),calculate_c_cuadratic_method(simbols_tuple)) for simbols_tuple in simbols]
    a = [calculate_a_cuadratic_method(sum_xi,sum_y,sum_y_square,b,c,n) for sum_xi,b,c in zip( (x for x in sum_x), (b_c_tuple[0] for b_c_tuple in b_c), (b_c_tuple[1] for b_c_tuple in b_c) ) ]


    cuadra_forecasts = [ calculate_cuadratic_method(y,y_square,a[i],b_c[i])  for i in range(len(b_c))  ]
    #cuadra_correlation = [ calculate_correlation(x[i],cuadra_forecasts[i]) for i in range(len(cuadra_forecasts))]
    cuadra_business_forecasts = [math.ceil(forecast[math.ceil(len(forecast)/2)]) for forecast in cuadra_forecasts]
    cuadra_correlation = calculate_correlation(data[-1],cuadra_business_forecasts)

    """ -----Promedio Movil n=2 ----- """
    x_movil = numpy.array(data,dtype=numpy.float64).reshape(-1) #[x for x in data]
    
    index_t = numpy.array([0] + [ (x_movil[i] / math.ceil(0.5*(x_movil[i]+x_movil[i-1]))) for i in range(1,len(x_movil)) ])
    index_t = index_t.reshape(len(data),len(data[0]))
    index_t = [ [xi[i] for xi in index_t] for i in range( len(index_t[0]) )]
    sum_index_t = numpy.array([numpy.sum(index_t[0])/(len(index_t[0])-1)] + [numpy.sum(index_t[i])/(len(index_t[i])) for i in range(1,len(index_t))])
    movil_forecast_2 = [ (x1+x2)/2 for x1,x2 in zip(data[len(data)-2],data[len(data)-1]) ]
    movil_forecast_2 = [ math.ceil(xi*index_ti) for xi,index_ti in zip(movil_forecast_2,sum_index_t) ]
    movil_correlation_2 = calculate_correlation(data[-1],movil_forecast_2)

    """ -----Promedio Movil n=3 ----- """

    index_t = numpy.array([0,0] + [ (x_movil[i] / math.ceil( (x_movil[i]+x_movil[i-1]+x_movil[i-2])/3 )) for i in range(2,len(x_movil)) ])
    index_t = index_t.reshape(len(data),len(data[0]))
    index_t = [ [xi[i] for xi in index_t] for i in range( len(index_t[0]) )]
    sum_index_t = numpy.array([numpy.sum(index_t[0])/(len(index_t[0])-1)] + [numpy.sum(index_t[1])/(len(index_t[1])-1)] + [numpy.sum(index_t[i])/(len(index_t[i])) for i in range(2,len(index_t))])
    movil_forecast_3 = [ (x1+x2)/2 for x1,x2 in zip(data[len(data)-2],data[len(data)-1]) ]
    movil_forecast_3 = [ math.ceil(xi*index_ti) for xi,index_ti in zip(movil_forecast_3,sum_index_t) ]
    movil_correlation_3 = calculate_correlation(data[-1],movil_forecast_3)

    # promedio movil compuesto
    movil_forecast_composed = [ math.ceil( (x1+x2)/2 ) for x1,x2 in zip(movil_forecast_2,movil_forecast_3)]
    movil_composed_correlation = calculate_correlation(data[-1],movil_forecast_composed)
    # promedio movil ponderado
    movil_forecast_pondered = [ math.ceil( (x1*0.7)+(x2*0.3) ) for x1,x2 in zip(movil_forecast_2,movil_forecast_3)]
    movil_pondered_correlation = calculate_correlation(data[-1],movil_forecast_pondered)

    """ -----Suavizacion Exponencial Simple ----- """
    simple_softener_forecast,simple_softener_correlation = get_best_simple_softener(x,data[len(data)-1])

    """ -----Suavizacion Exponencial Doble ----- """
    double_softener_forecast,double_softener_correlation = get_best_double_softener(x,data[len(data)-1],data)

    """ ---- Winters ----- """
    winters_forecast,winters_correlation = get_best_winters_method(x,data)

    """ --- Box and Jenkinn ---  """
    jenkin_forecast,jenkin_correlation = get_best_boxjenkins_method(x,data)

    """ ---- Simulated ---- """
    simulated_forecast,simulated_correlation = get_best_simulated_forecast(x,data)
    
    lineal_correlation *= 100
    expo_correlation *= 100
    cuadra_correlation *= 100
    movil_correlation_2 *= 100
    movil_correlation_3 *= 100
    movil_composed_correlation *= 100
    movil_pondered_correlation *= 100
    simple_softener_correlation *= 100
    double_softener_correlation *= 100
    winters_correlation *= 100
    jenkin_correlation *= 100
    simulated_correlation *= 100

    return (lineal_business_forecasts,lineal_correlation,expo_business_forecasts,expo_correlation,
    cuadra_business_forecasts,cuadra_correlation,movil_forecast_2,movil_correlation_2,movil_forecast_3,movil_correlation_3,
    movil_forecast_composed,movil_composed_correlation,movil_forecast_pondered,movil_pondered_correlation,
    simple_softener_forecast,simple_softener_correlation,double_softener_forecast,double_softener_correlation,
    winters_forecast,winters_correlation,jenkin_forecast,jenkin_correlation,simulated_forecast,simulated_correlation)



def calculate_a_lineal_method(sum_x,sum_y,sum_y_square,sum_xy,n):
    result = ((sum_x*sum_y_square) - (sum_y*sum_xy)) / ((n*sum_y_square) - (sum_y**2))
    if math.isnan(result):
        return 0
    return result

def calculate_b_lineal_method(sum_x,sum_y,sum_y_square,sum_xy,n):
    try:
        result = ((n*sum_xy) - (sum_x*sum_y)) / ((n*sum_y_square) - (sum_y**2))
        if math.isnan(result):
            return 0
        return result
    except:
        return 0

def calculate_lineal_method(y,a_b):
    a,b = a_b
    return [a + yi*b for yi in y]

def calculate_correlation(x,forecast):
    try:
        if numpy.std(forecast) > 0 and numpy.std(x) > 0:
            return numpy.corrcoef(x,forecast)[0,1]
        return 0.0
    except:
        return 0.0

def calculate_a_exponential_method(sum_y,sum_y_square,sum_ln_x,sum_ln_xy,n):
    try:
        result = ( (sum_ln_x*sum_y_square) - (sum_y*sum_ln_xy) ) / ((n*sum_y_square) - (sum_y**2))
        if math.isnan(result):
            return 0
        return result
    except:
        return 0

def calculate_b_exponential_method(sum_y,sum_y_square,sum_ln_x,sum_ln_xy,n):
    try:
        result = ( (n*sum_ln_xy) - (sum_ln_x*sum_y) ) / ((n*sum_y_square) - (sum_y**2)) 
        if math.isnan(result):
            return 0
        return result
    except:
        return 0

def calculate_exponential_method(y,a_b):
    a,b = a_b
    return [a * (b**yi) for yi in y]




def calculate_simbols_cuadratic_method(sum_x,sum_y,sum_y_square,sum_y_cube,sum_y_quarter,sum_xy,sum_xy_square,n):
    return (n*sum_y_cube - sum_y*sum_y_square),(sum_y**2 - n*sum_y_square),(n*sum_y_quarter - sum_y_square**2), (n*sum_xy - sum_x*sum_y), (n*sum_xy_square - sum_x*sum_y_square)

def calculate_a_cuadratic_method(sum_x,sum_y,sum_y_square,b,c,n):
    return (sum_x - b*sum_y - c*sum_y_square) / n
def calculate_b_cuadratic_method(simbols):
    try:
        alpha,beta,gamma,rho,lamdba = simbols
        result = ( (alpha*lamdba) - (gamma*rho) ) 
        divide = ( (alpha**2) + (beta*gamma) )
        if divide == 0:
            return result
        result = result/divide
        if math.isnan(result):
            return 0
        return result
    except:
        return 0
    
def calculate_c_cuadratic_method(simbols):
    try:
        alpha,beta,gamma,rho,lamdba = simbols
        result = ( (beta*lamdba) + (alpha*rho) ) 
        divide = ( (alpha**2) + (beta*gamma) )
        if divide == 0:
            return result
        result = result/divide
        if math.isnan(result):
            return 0
        return result
    except:
        return 0


def calculate_cuadratic_method(y,y_square,a,b_c):
    b,c = b_c
    return [a + (b*yi) + (c*yi_square) for yi,yi_square in zip(y,y_square)]




def average(list_obj):
    return sum(list_obj) / len(list_obj) 
def has_negatives(x):
    for data in x:
        if data < 0:
            return False
    return True




def get_best_simple_softener_simple(data):
    if len(data) > 1:
        general_average = average([average(data[len(data)-2]) , average(data[len(data)-1])])
        data_simple = [x for x in data[len(data)-2]]
    else:
        general_average = average(data[len(data)-1])
        data_simple = []
    forecasts = []
    for sigma in numpy.arange(0.1,1,0.1,dtype=numpy.float64):
        forecasts.append( calculate_simple_softener_simple_forecast(sigma,general_average,[x for x in data_simple],data[len(data)-1]) )
    forecasts = sorted(forecasts,key=itemgetter(1), reverse=True)
    return get_clean_simple_softener(forecasts)

def calculate_simple_softener_simple_forecast(sigma,general_average,data_simple,last_row_data):
    value = general_average

    while(len(data_simple) > 0):
        value = (sigma*data_simple[0]) + (1 - sigma)*(value) 
        data_simple.pop(0)
    
    forecast = []
    for x in last_row_data:
        value = (sigma*x) + (1 - sigma)*(value) 
        forecast.append( math.ceil(value) )

    return forecast,calculate_correlation(last_row_data,forecast)
    
def get_best_double_softener_simple(data):
    if len(data) > 1:
        general_average = average(data[len(data)-2])
        data_simple = data[-2]+data[-1]
        increments_average = (average(data[len(data)-1]) - general_average) / len(data[0])
    else:
        general_average = average(data[0])
        data_simple = [x for x in data[0]]
        increments_average = (average(data[0]))  / len(data[0])
    forecasts = []
    for sigma in numpy.arange(0.1,1,0.1,dtype=numpy.float64):
        forecasts.append( calculate_double_softener_simple_forecast(sigma,general_average,increments_average,data_simple[1:],data[len(data)-1]) )
    forecasts = sorted(forecasts,key=itemgetter(1), reverse=True)

    return get_clean_simple_softener(forecasts)

def calculate_double_softener_simple_forecast(sigma,general_average,increments_average,data_simple,last_row_data):
    value = general_average
    value2 = increments_average

    for i in range(len(data_simple)):
        new_value = (sigma*data_simple[i]) + ((1 - sigma)*(value+value2)) 
        value2 = (sigma*(new_value-value))+(1-sigma)*value2
        value = new_value

    
    forecast = []
    for i in range(1,len(last_row_data)+1):
        forecast.append(math.ceil( value + i*value2 ))
    return forecast,calculate_correlation(last_row_data,forecast)




def get_best_simple_softener(x_simple,last_row_data):
    average_first = [ math.ceil(average(xi)) for xi in x_simple]
    #for i in range( len(x) ):
    #    x_simple[i][0] = average_first[i]
    #del average_first
    forecasts = []
    for sigma in numpy.arange(0.1,1,0.1,dtype=numpy.float64):
        forecasts.append( calculate_simple_softener_forecast(sigma,x_simple,average_first,last_row_data) )
    forecasts = sorted(forecasts,key=itemgetter(1), reverse=True)
    return get_clean_simple_softener(forecasts)

def calculate_simple_softener_forecast(sigma, x_simple,average_first,last_row_data):
    forecast = [ simple_softener(sigma,xi,average) for xi,average in zip(x_simple,average_first) ]
    return forecast,calculate_correlation(last_row_data,forecast)

def simple_softener(sigma, xi_simple, value):
    if len(xi_simple) == 1:
        return math.ceil( (sigma*xi_simple[0]) + (1-sigma)*value )
    return simple_softener(sigma, xi_simple[1:], math.ceil( (sigma*xi_simple[0]) + (1-sigma)*value ) )

def get_clean_simple_softener(forecasts):
    for x,correlation in forecasts:
        if not has_negatives(x):
            return x,correlation
    return forecasts[0]


def get_best_double_softener(x_simple,last_row_data,data):
    average_first = [ average(xi) for xi in x_simple]
    increments_average = (average(last_row_data) - average(data[len(data)-2]) ) / len(x_simple)
    forecasts = []
    for sigma in numpy.arange(0.1,1,0.1,dtype=numpy.float64):
        forecasts.append( calculate_double_softener_forecast(sigma,x_simple,average_first,last_row_data,increments_average ) )
    forecasts = sorted(forecasts,key=itemgetter(1), reverse=True)
    return get_clean_simple_softener(forecasts)

def calculate_double_softener_forecast(sigma, x_simple,average_first,last_row_data,increments_average):
    forecast = [ double_softener(sigma,xi[1:],average,increments_average) for xi,average in zip(x_simple,average_first) ]
    return forecast,calculate_correlation(last_row_data,forecast)

def double_softener(sigma, xi_simple, value,value2):
    if len(xi_simple) == 0:
        return math.ceil( value + value2 )
    new_value = (sigma*xi_simple[0]) + ((1-sigma)*(value+value2))
    new_value_2 = (sigma*(new_value-value)) + ((1-sigma)*value2)
    return double_softener(sigma, xi_simple[1:], new_value,new_value_2 )






def get_best_winters_method(x,data):
    n = len(x)
    last_row_data = data[-1]
    pre_last_row_data = data[-2]
    
    last_average = average(last_row_data)
    pre_last_average = average(pre_last_row_data)
    
    increments_average = (last_average-pre_last_average)/n
    second_increment = last_average + (increments_average*(n-1)/2)

    #sum_pre_last_row_data = sum(pre_last_row_data)
    #sum_last_row_data = sum(last_row_data)

    seasonality = second_increment - increments_average*(n*2)
    ct_1 = [pre_last_row_data[i]/(seasonality+(increments_average*i)) for i in range(len(pre_last_row_data))]
    ct_2 = [last_row_data[i]/(seasonality+(increments_average*i)) for i in range(len(last_row_data))]
    ct_average = [(ct1+ct2)/2 for ct1,ct2 in zip(ct_1,ct_2)]
    forecast = [math.ceil(  (second_increment + (increments_average*i) )*ct_average[i] ) for i in range(n)]
    return forecast,calculate_correlation(last_row_data,forecast)


def get_best_boxjenkins_method(x,data):
    n = len(x)
    last_row_data = data[-1]
    last_average = average(last_row_data)

    at = [x-last_average for x in last_row_data]
    at_1 = [at[i] for i in range(len(at)-1)]
    at_at_1 = [at[i]*at_1[i-1]  for i in range(1,len(at))]
    at_square = [ati**2 for ati in at]

    covar = sum(at_at_1)/(n-1)
    var = sum(at_square) / (n-1)
    estimator = covar/var
    
    forecast = [math.ceil(last_average)]+[math.ceil( last_average + (estimator*x) ) for x in at_1]
    
    return forecast,calculate_correlation(last_row_data,forecast)


def get_best_simulated_forecast(x,data):
    n = len(x)
    n2 = len(data)
    last_row_data = data[-1]
    avgs_desvstd = [(average(xi),statistics.stdev(xi)) for xi in x]
    final_correlation = 0.0
    final_forecast = last_row_data
    timer = time.time()
    random.seed()
    while(time.time()-timer < 5.0 and final_correlation < 0.95):
        rand_matrix = [ [random.random() for _ in range(n)] for _ in range(n)]
        sum_rand = [sum(x) for x in rand_matrix]
        pend_rand = [x-n2 for x in sum_rand]

        forecast = [math.ceil( (pend*avg_desv[1]) + avg_desv[0]) for avg_desv,pend in zip(avgs_desvstd,pend_rand)]
        correlation = calculate_correlation(last_row_data,forecast)

        if correlation > final_correlation:
            final_correlation = correlation
            final_forecast = forecast.copy()

    return final_forecast,final_correlation