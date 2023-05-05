from django.urls import path
from .views import *

app_name = 'core'

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('login/',LoginView.as_view()),
    path('users/',ListUserView.as_view()),
    path('logout/',LogoutUserView.as_view()),
    path('update/',ProfileUpdateView.as_view()),
    path('changepassword/',PasswordChangeView.as_view()),
    path('all-users/',ListUsers.as_view()),
    path('products/',ProductsApiView.as_view()),
    path('products/<pk>/',ProductsApiView.as_view()),
    path('user/<pk>/link/',LinkApiView.as_view()),
    path('orders/',OrderApiView.as_view()),
]