from django.urls import *
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("content/", views.content, name="content"),
    path("content/<str:name>", views.each, name="each"),
    path("portrayal", views.portrayal, name="portrayal"),
    path("manager", views.manager, name="manager"),
    path("private/", views.private, name="private"),
    path("private/stable", views.pri_sta, name="pri_stable"),
    path("content/private/<str:name>", views.pri_each, name="pri_each"),
    path("offtopic", views.offtopic, name="offtopic"),
    path("waiter", views.waiter, name="waiter"),
    path("provision", views.provision, name="provision"),
    path("georgeous", views.georgeous, name="georgeous")
]
