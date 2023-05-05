from django.urls import path,include
from .views import *

app_name = 'ambassador'

urlpatterns = [
    path('',include('core.urls')),
    path('product/frontend/',ProductFrotend.as_view()),
    path('product/backend/',ProductBackend.as_view()),
    path('links/',LinkApiView.as_view()),
    path('stats/',StatsApiView.as_view()),
    path('rank/',RankingApiView.as_view()),
]
