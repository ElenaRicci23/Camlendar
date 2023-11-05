import re
from django.core.cache import cache
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from event.models import Corso
from event.serializers import CorsoSerializer
from .models import User
from .serializers import RegisterSerializer, UserSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer personalizzato per l'ottenimento del token JWT.
    Estende TokenObtainPairSerializer e aggiunge alcune informazioni personalizzate.
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user_id'] = str(self.user.id)
        return data


class Login(TokenObtainPairView):
    """
    Vista per l'ottenimento del token JWT personalizzato.
    Utilizza il CustomTokenObtainPairSerializer.
    """

    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    """
    Vista per effettuare il logout di un utente autenticato.
    Il token JWT dell'utente viene messo in blacklist per impedire accessi non autorizzati.
    """

    # Ottieni il token JWT dell'utente autenticato
    token = request.auth

    # Inserisci il token nella blacklist (imposta la scadenza appropriata)
    cache.set(f'blacklisted_{token}', True, timeout=3600)  # Ad esempio, 1 ora

    return Response({"message": "User has been successfully logged out"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_user(request):
    """
    Vista per ottenere le informazioni dell'utente autenticato.
    Restituisce i dettagli dell'utente corrente.
    """

    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


class UserCreation(APIView):
    """
    Vista per la creazione di un nuovo utente.
    Permette la registrazione di nuovi utenti.
    """

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Utente registrato con successo"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def is_password_strong(password):
    """
    Funzione per verificare la robustezza di una password.
    Una password robusta deve avere almeno 8 caratteri, con almeno una lettera maiuscola,
    una lettera minuscola e un numero.
    """
    pattern = re.compile(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$')
    return bool(pattern.match(password))


class StudentListView(APIView):
    """
    Vista per la visualizzazione della lista degli studenti (richiede privilegi di amministratore).
    Permette agli amministratori di ottenere una lista di tutti gli studenti registrati.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        students = User.objects.all()
        serializer = UserSerializer(students, many=True)
        return Response(serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_profile(request):
    """
    Vista per ottenere il profilo di uno studente autenticato.
    Restituisce i dettagli dello studente, inclusi i corsi correlati.
    """

    # Recupera l'utente autenticato
    user = request.user

    # Ottieni l'anno accademico dell'utente
    anno_accademico = user.anno_accademico

    # Filtra i corsi in base all'anno accademico dello studente
    corsi = Corso.objects.filter(anno=anno_accademico)

    # Serializza i corsi
    corsi_serializer = CorsoSerializer(corsi, many=True)

    # Crea un dizionario con i dati del profilo e dei corsi
    profile_data = {
        'nome': user.nome,
        'cognome': user.cognome,
        'email': user.email,
        'anno_accademico': user.anno_accademico,
        'corsi': corsi_serializer.data,  # Aggiungi i dati dei corsi al dizionario

    }

    return Response(profile_data)
