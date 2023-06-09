from django.urls import *
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("content/", views.content, name="content"),
    path("content/<str:name>", views.each, name="each"),
    path("portrayal", views.portrayal, name="portrayal"),
    path("manager", views.manager, name="manager"),
    path("private/", views.private, name="private"),
    path("private/<str:name>", views.pri_each, name="mature_each"),
    path("georgeous", views.georgeous, name="georgeous"),
    path("search", views.search, name="search")
]
