from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def index(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)