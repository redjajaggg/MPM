from django.http import HttpResponse
from django.shortcuts import render


# error custom
def custom_page_not_found_view(request, exception):
    # You can optionally customize the error handling logic here
    return render(request, 'errors/404.html')


# login page
def login(request):
    request.session['is_logged_in'] = False
    return render(request, 'Manhtia/Home/login.html')


def logged_in(request, username):
    request.session['is_logged_in'] = True
    return render(request, 'Manhtia/Home/logged_in.html', {
        "username": username
    })


# Create your views here.
def index(request):
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Home/index.html", {
        "is_logged_in": is_logged_in
    })


def content(request):
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Content/content.html", {
        "is_logged_in": is_logged_in
    })


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


def chapterviewer2(request, name):
    return render(request, "Manhtia/Content/viewerchapter2.html", {
        "name": name
    })


def advsearch(request):
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Content/Advsearch.html", {
        "is_logged_in": is_logged_in
    })


def private(request):
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Private/private.html", {
        "is_logged_in": is_logged_in
    })


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
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Portrayal/portrayal.html", {
        "is_logged_in": is_logged_in
    })


def portrayal_each(request, name):
    return render(request, "Manhtia/Portrayal/eachportrayal.html", {
        "name": name
    })


def manager(request):
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Manager/managecontrol.html", {
        "is_logged_in": is_logged_in
    })


def meta(request):
    is_logged_in = request.session.get('is_logged_in', False)
    return render(request, "Manhtia/Manager/meta.html", {
        "is_logged_in": is_logged_in
    })


def georgeous(request):
    return render(request, "Manhtia/Home/georgeous.html")


def search(request):
    return render(request, "Manhtia/Manager/search.html")

