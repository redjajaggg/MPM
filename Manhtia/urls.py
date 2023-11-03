from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.test import SimpleTestCase, override_settings
from django.urls import *
from . import views


urlpatterns = [
    path("", views.index, name="index"),#home
    path("content/", views.content, name="content"),#show all availiable story
    path("content/<str:name>/", views.each, name="each"),
    path("content2/", views.full, name="content2"),
    path("content2/<str:name>/", views.full, name="fulls"),
    path("content/<str:name>/<str:chapter>", views.chapterviewer, name="chapterviewer"),
    path("content2/<str:name>/<str:chapter>", views.chapterviewer, name="chapterviewers"),
    path("portrayal/", views.portrayal, name="portrayal"),
    path("portrayal/<str:name>", views.portrayal_each, name="portrayalviwer"),
    path("manager", views.manager, name="manager"),
    path("private/", views.private, name="private"),
    path("private/<str:name>/", views.pri_each, name="mature_each"),
    path("private/<str:name>/<str:part>", views.pri_each_viewer, name="pri_each_viewer"),
    path("georgeous", views.georgeous, name="georgeous")
]

