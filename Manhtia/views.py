from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "Manhtia/index.html")


def content_v0(request):
    return render(request, "Manhtia/content.html")


def content_detail(request):
    return render(request, "Manhtia/content_detail.html")


def content_art(request):
    return render(request, "Manhtia/content_art.html")


def story_detail(request, name):
    return render(request, "Manhtia/content_each_detail.html", {
        "name": name
    })


def story_art(request, name):
    return render(request, "Manhtia/content_each_art.html", {
        "name": name
    })


def chapter_viewer(request, name, chapter):
    return render(request, "Manhtia/viewchapter.html", {
        "name": name,
        "chapter": chapter
    })


def portrayal(request):
    return render(request, "Manhtia/portrayal.html")


def portrayal_viewer(request, name):
    return render(request, "Manhtia/eachportrayal.html", {
        "name": name
    })


def mature(request):
    return render(request, "Manhtia/private.html")


def mature_viewer(request, name):
    return render(request, "Manhtia/privateeach.html", {
        "name": name
    })


def mature_viewer_by_part(request, name, part):
    return render(request, "Manhtia/viewmature.html", {
        "name": name,
        "part": part
    })


def manager(request):
    return render(request, "Manhtia/managecontrol.html")


def georgeous(request):
    return render(request, "Manhtia/georgeous.html")


def search(request):
    return render(request, "Manhtia/search.html")




