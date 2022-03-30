from django.urls import path

from . import views

app_name = 'website'
urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('navratri/', views.navratri, name='navratri'),
    path('gallery/', views.gallery, name='gallery'),
    path('contact/', views.contact, name='contact'),
    path('donation/', views.donation, name='donation'),
    path('places/', views.places, name='places'),
    path('balaji_mandir/', views.balaji_mandir, name='balaji_mandir')


]
