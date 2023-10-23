from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.test import SimpleTestCase, override_settings
from django.urls import *
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("content-v0/", views.content_v0, name="content_art"),
    path("content/", views.content_detail, name="content_detail"),
    path("content-v2/", views.content_art, name="content_art"),
    path("content/<str:name>/", views.story_detail, name="story_detail"),
    path("content/<str:name>/<str:chapter>", views.chapter_viewer, name="chapter_viewer"),
    path("content-v2/<str:name>/", views.story_art, name="story_art"),
    path("content-v2/<str:name>/<str:chapter>", views.chapter_viewer, name="chapter_viewer"),
    path("portrayal/", views.portrayal, name="portrayal"),
    path("portrayal/<str:name>", views.portrayal_viewer, name="portrayal_viewer"),
    path("manage", views.manager, name="manager"),
    path("mature/", views.mature, name="mature"),
    path("mature/<str:name>/", views.mature_viewer, name="mature_viewer"),
    path("mature/<str:name>/<str:part>", views.mature_viewer_by_part, name="mature_viewer_by_part"),
    path("museum", views.georgeous, name="georgeous")
]

