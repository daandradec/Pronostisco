"""webtiscopronoz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from core import views as core_views

urlpatterns = [
    # CORE URLS

    path('',core_views.index,name="index"),
    path('pronosticos-simple/input-data',core_views.simple_pronos_input_data,name="simplepronosinputdata"),
    path('pronosticos-simple/graphics',core_views.simple_pronos_graph_data,name="simplepronosgraph"),
    path('pronosticos-alpha/input-data',core_views.alpha_pronos_input_data,name="alphapronosinputdata"),
    path('pronosticos-alpha/graphics',core_views.alpha_pronos_graph_data,name="alphapronosgraph"),
    path('pronosticos-alpha/download',core_views.alpha_pronos_download_data,name="alphapronosdownload"),
    path('mrp/input-data', core_views.mrp_input_data, name="mrpinputdata"),
    path('mrp/output', core_views.mrp_output, name="mrpoutput")
    # Admin URLS
    ##path('admin/', admin.site.urls),
]
"""
path('input-data',core_views.inputdata,name="inputdata"),
path('chart',core_views.chart,name="chart"),
path('methods',core_views.methods,name="methods"),
path('beta',core_views.methods_beta, name="methodsbeta"),
"""