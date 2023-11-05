from django.urls import path
from . import views
from .views import aggiorna_voto_esame, modifica_voto_esame

urlpatterns = [
    # URL per le viste basate su classe
    path('docenti/', views.DocenteListView.as_view(), name='docenti-list'),
    path('corsi/', views.CorsoListView.as_view(), name='corsi-list'),
    path('lezioni/', views.LezioneListView.as_view(), name='lezioni-list'),
    path('esami/', views.EsameListView.as_view(), name='esame-list'),

    # URL per le viste basate su funzione
    path('lezioni/<str:email>/', views.lezioni_per_utente_api, name='lezioni_per_utente_api'),
    path('esami/<str:email>/',views.esami_per_utente_api,name='esami_per_utente_api'),
    path('esami/<str:email>/<int:id_esame>/aggiorna-voto/', aggiorna_voto_esame, name='aggiorna_voto_esame'),
    path('/esame/<str:email>/modifica-voto/', modifica_voto_esame, name='modifica_voto_esame'),
    path('docenti-per-anno/<str:anno>/', views.docenti_per_anno_api, name='docenti-per-anno'),
]
