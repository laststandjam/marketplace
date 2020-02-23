from django.urls import path
from . import views

urlpatterns = [
path('', views.home, name='home'),
path('about/', views.about, name='about'),
path('canines/', views.canine_index, name='index'),
path('canines/<int:canine_id>',views.canine_details, name='details')
]