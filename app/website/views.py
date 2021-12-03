from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return render(request, 'website/index.html')


def navratri(request):
    return render(request, 'website/navratri.html')


def about(request):
    return render(request, 'website/about.html')


def gallery(request):
    return render(request, 'website/gallery.html')


def contact(request):
    return render(request, 'website/contact.html')


def donation(request):
    return render(request, 'website/donation.html')


def places(request):
    return render(request, 'website/places.html')
