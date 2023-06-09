from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "MyPrivateManhwa/index.html")


def content(request):
    return render(request, "MyPrivateManhwa/content.html")


def each(request, name):
    return render(request, "MyPrivateManhwa/each.html", {
        "name": name
    })


def private(request):
    return render(request, "MyPrivateManhwa/private.html")


def pri_sta(request):
    return render(request, "MyPrivateManhwa/mature.html")


def pri_each(request, name):
    return render(request, "MyPrivateManhwa/mature_each.html", {
        "name": name
    })


def portrayal(request):
    return render(request, "MyPrivateManhwa/portrayal.html")


def manager(request):
    return render(request, "MyPrivateManhwa/manager.html")


def georgeous(request):
    return render(request, "MyPrivateManhwa/georgeous.html")


def offtopic(request):
    return render(request, "MyPrivateManhwa/offtopic.html")


def waiter(request):
    return render(request, "MyPrivateManhwa/waiter.html")


def provision(request):
    return render(request, "MyPrivateManhwa/provision.html")
