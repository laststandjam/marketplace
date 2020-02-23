from django.shortcuts import render
from .models import Canine
from django.http import HttpResponse
# Create your views here.
def home(request):
  return render(request, 'home.html')

def about(request):
  return render(request, 'about.html')

def canine_index(request):
  canine = Canine.objects.all()
  return render(request, 'canines/index.html', { 'canine': canine })

def canine_details(request):
  canine = Canine.objects.get(id=canine_id)
  # Get the toys the canine doesn't have
  toys_canine_doesnt_have = Toy.objects.exclude(id__in = canine.toys.all().values_list('id'))
  # Instantiate FeedingForm to be rendered in the template
  feeding_form = FeedingForm()
  return render(request, 'canines/detail.html', {
    # Pass the canine and feeding_form as context
    'canine': canine, 'feeding_form': feeding_form,
   
    'toys': toys_canine_doesnt_have
  })

