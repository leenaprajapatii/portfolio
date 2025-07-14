from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST

def index(request):
    return render(request, 'index.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def blog(request):
    return render(request, 'blog.html')

def contact(request):
    return render(request, 'contact.html')

