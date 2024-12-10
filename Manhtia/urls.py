from django.urls import *
from . import views


# 0=success/finish, 1=developing
urlpatterns = [
    path("", views.index, name="index"),#home
    path("content/", views.content, name="content"),# show all availiable story
    path("content/<str:name>/", views.each, name="each"),# show only one story
    path("content/<str:name>/<str:chapter>", views.chapterviewer, name="chapterviewer"),# old viewer hard load
    path("content.viewer/<str:name>/", views.chapterviewer2, name="chapterviewer2j"),
    path("advsearch", views.advsearch, name="advsearch"),
    path("portrayal/", views.portrayal, name="portrayal"),
    path("portrayal/<str:name>", views.portrayal_each, name="portrayalviwer"),
    path("manager/", views.manager, name="manager"),
    path("manager/meta", views.meta, name="meta"),
    path("private/", views.private, name="private"),
    path("private/<str:name>/", views.pri_each, name="mature_each"),
    path("private/<str:name>/<str:part>", views.pri_each_viewer, name="pri_each_viewer"),
    path("georgeous", views.georgeous, name="georgeous"),

    #version 2(for guest)
    path("content.g/", views.full, name="content2"),  # show all availiable story
    path("content.g/<str:name>/", views.full, name="fulls"),  # show only one story
    path("content.g/<str:name>/viewer/", views.chapterviewer2, name="chapterviewer2")  # viewer soft load

]
# python manage.py runserver

