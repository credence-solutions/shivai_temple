from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return render(request, 'website/index.html')


def about(request):
    return render(request, 'website/about.html')


def gallery(request):
    return render(request, 'website/gallery.html')


def contact(request):
    return render(request, 'website/contact.html')
