from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "Manhtia/index.html")


def content(request):
    return render(request, "Manhtia/content.html")


def each(request, name):
    return render(request, "Manhtia/eachcontent.html", {
        "name": name
    })


def private(request):
    return render(request, "Manhtia/private.html")


def pri_each(request, name):
    return render(request, "Manhtia/privateeach.html", {
        "name": name
    })


def portrayal(request):
    return render(request, "Manhtia/portrayal.html")


def manager(request):
    return render(request, "Manhtia/managecontrol.html")


def georgeous(request):
    return render(request, "Manhtia/georgeous.html")


def search(request):
    return render(request, "Manhtia/search.html")

