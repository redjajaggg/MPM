from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "Manhtia/Home/index.html")


def content(request):
    return render(request, "Manhtia/Content/content.html")


def lang(request):
    return render(request, "Manhtia/contentlang.html")


def each(request, name):
    return render(request, "Manhtia/Content/eachcontent.html", {
        "name": name
    })


def eachlang(request, name, language):
    return render(request, "Manhtia/eachcontentlang.html", {
        "name": name,
        "lang": language
    })


def full(request, name):
    return render(request, "Manhtia/Content/eachcontent2.html", {
        "name": name
    })


def chapterviewer(request, name, chapter):
    return render(request, "Manhtia/Content/viewchapter.html", {
        "name": name,
        "chapter": chapter
    })


def advsearch(request):
    return render(request, "Manhtia/Content/Advsearch.html")


def private(request):
    return render(request, "Manhtia/Private/private.html")


def pri_each(request, name):
    return render(request, "Manhtia/Private/privateeach.html", {
        "name": name
    })


def pri_each_viewer(request, name, part):
    return render(request, "Manhtia/Private/viewmature.html", {
        "name": name,
        "part": part
    })


def portrayal(request):
    return render(request, "Manhtia/Portrayal/portrayal.html")


def portrayal_each(request, name):
    return render(request, "Manhtia/Portrayal/eachportrayal.html", {
        "name": name
    })


def manager(request):
    return render(request, "Manhtia/Manager/managecontrol.html")


def georgeous(request):
    return render(request, "Manhtia/Home/georgeous.html")


def search(request):
    return render(request, "Manhtia/Manager/search.html")

