from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteList.as_view(), name="notes-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="notes-delete")
]