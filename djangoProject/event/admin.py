from django.contrib import admin
from .models import Docente, Corso, Lezione, Esame

# Registra i modelli nell'area amministrativa di Django
admin.site.register(Docente)
admin.site.register(Corso)
admin.site.register(Lezione)
admin.site.register(Esame)
