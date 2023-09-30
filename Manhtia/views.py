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


def chapterviewer(request, name, chapter):
    return render(request, "Manhtia/viewchapter.html", {
        "name": name,
        "chapter": chapter
    })


def private(request):
    return render(request, "Manhtia/private.html")


def pri_each(request, name):
    return render(request, "Manhtia/privateeach.html", {
        "name": name
    })


def pri_each_viewer(request, name, part):
    return render(request, "Manhtia/viewmature.html", {
        "name": name,
        "part": part
    })


def portrayal(request):
    return render(request, "Manhtia/portrayal.html")


def portrayal_each(request, name):
    return render(request, "Manhtia/eachportrayal.html", {
        "name": name
    })


def manager(request):
    return render(request, "Manhtia/managecontrol.html")


def georgeous(request):
    return render(request, "Manhtia/georgeous.html")


def search(request):
    return render(request, "Manhtia/search.html")




