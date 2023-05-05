from django.urls import path
from .views import *

urlpatterns = [
    path('link/<code>/',LinkApiView.as_view()),
    path('createorder/',CreateOrderApiView.as_view()),
    path('confiirm/',cofirmOrder.as_view()),
]
