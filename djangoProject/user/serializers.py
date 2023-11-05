from django.core.exceptions import ValidationError

from rest_framework import serializers
from .models import User


# Serializer per il modello User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # Ottieni il modello User personalizzato
        fields = ['nome', 'cognome', 'email', 'anno_accademico', 'gender', "is_superuser", "is_staff", "is_active",
                  "date_joined"]
        extra_kwargs = {
            'id': {'read_only': True},  # L'ID non può essere modificato
            'profile': {'read_only': True},  # Il profilo non può essere modificato
            'last_login': {'read_only': True},  # Ultimo accesso non può essere modificato
            'is_superuser': {'read_only': True},  # Flag superutente non può essere modificato
            'is_staff': {'read_only': True},  # Flag staff non può essere modificato
            'is_active': {'read_only': True},  # Flag attivo non può essere modificato
            'date_joined': {'read_only': True},  # Data di registrazione non può essere modificata
        }


# Serializer per la registrazione di un nuovo utente
class RegisterSerializer(serializers.ModelSerializer):
    # Campi personalizzati per la registrazione
    nome = serializers.CharField(max_length=255)
    cognome = serializers.CharField(max_length=255)
    anno_accademico = serializers.ChoiceField(choices=User.YEAR_CHOICES)
    gender = serializers.ChoiceField(choices=User.gender_choice)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, max_length=128)

    class Meta:
        model = User # Ottieni il modello User personalizzato
        fields = ('id', 'nome', 'cognome', 'email', 'anno_accademico', 'gender', 'is_staff', 'is_active', 'date_joined',
                  'password')
        extra_kwargs = {
            'password': {'write_only': True},  # La password non può essere letta
        }

    # Metodo per validare l'email personalizzata
    def validate_email(self, value):
        # Validazione personalizzata per l'indirizzo email
        if not value.endswith("@studenti.unicam.it"):
            raise ValidationError("L'indirizzo email deve essere nel formato nome.cognome@studenti.unicam.it")
        return value

    # Metodo per creare un nuovo utente
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
