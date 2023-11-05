from rest_framework import serializers
from .models import Docente, Corso, Lezione, Esame


# Serializer per il modello Docente
class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'  # Include tutti i campi del modello


# Serializer per il modello Corso
class CorsoSerializer(serializers.ModelSerializer):
    # Utilizza DocenteSerializer per serializzare il campo 'docente'
    docente = DocenteSerializer()

    class Meta:
        model = Corso
        fields = '__all__'  # Include tutti i campi del modello


# Serializer per il modello Lezione
class LezioneSerializer(serializers.ModelSerializer):
    # Utilizza CorsoSerializer e DocenteSerializer per serializzare i campi 'corso' e 'docente'
    corso = CorsoSerializer()
    docente = DocenteSerializer()

    class Meta:
        model = Lezione
        fields = '__all__'  # Include tutti i campi del modello


# Serializer per il modello Esame
class EsameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Esame
        fields = ['id', 'nome', 'semestre', 'anno', 'crediti', 'docente', 'voto', 'data_esame']
        # Include solo i campi specificati nella lista
