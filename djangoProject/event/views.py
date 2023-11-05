from django.utils.dateparse import parse_date
from django.views.decorators.csrf import csrf_protect
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from user.models import User
from .models import Docente, Corso, Lezione, Esame
from .serializers import DocenteSerializer, CorsoSerializer, LezioneSerializer, EsameSerializer

# Lista dei docenti
@permission_classes([IsAuthenticated])
class DocenteListView(generics.ListAPIView):
    """
    Ottiene una lista di tutti i docenti.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer

# Lista dei corsi
@permission_classes([IsAuthenticated])
class CorsoListView(generics.ListAPIView):
    """
    Ottiene una lista di tutti i corsi.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    queryset = Corso.objects.all()
    serializer_class = CorsoSerializer

# Lista degli esami
@permission_classes([IsAuthenticated])
class EsameListView(generics.ListAPIView):
    """
    Ottiene una lista di tutti gli esami.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    queryset = Esame.objects.all()
    serializer_class = EsameSerializer

# Lista delle lezioni
@permission_classes([IsAuthenticated])
class LezioneListView(APIView):
    """
    Ottiene una lista di tutte le lezioni.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    def get_queryset(self):
        queryset = Lezione.objects.all()
        anno_corso = self.request.query_params.get('anno_corso', None)

        if anno_corso is not None:
            queryset = queryset.filter(corso__anno=anno_corso)

        return queryset

    def get(self, request):
        queryset = self.get_queryset()
        serializer = LezioneSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Lista delle lezioni per utente
@csrf_protect
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def lezioni_per_utente_api(request, email):
    """
    Ottiene una lista di lezioni basate sull'anno accademico dell'utente.

    Parameters:
        - email (str): L'indirizzo email dell'utente per cui ottenere le lezioni.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    serializer_class = LezioneSerializer
    try:
        utente = User.objects.get(email=email)
        lezioni = Lezione.objects.filter(corso__anno=utente.anno_accademico).select_related('corso', 'docente')
        serializer = LezioneSerializer(lezioni, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'Utente non trovato'}, status=status.HTTP_404_NOT_FOUND)

# Esami per utente
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def esami_per_utente_api(request, email):
    """
    Ottiene una lista di esami basati sull'anno accademico dell'utente.

    Parameters:
        - email (str): L'indirizzo email dell'utente per cui ottenere gli esami.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    try:
        # Ottiene l'utente in base all'email fornita
        utente = User.objects.get(email=email)

        # Filtra gli esami in base all'anno accademico dell'utente
        esami = Esame.objects.filter(corso_ptr__anno=utente.anno_accademico).select_related('corso_ptr', 'docente')

        # Serializza i dati degli esami
        serializer = EsameSerializer(esami, many=True)

        # Restituisce i dati serializzati
        return Response(serializer.data)
    except User.DoesNotExist:
        # Se l'utente non esiste, restituisce un errore
        return Response({'error': 'Utente non trovato'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def aggiorna_voto_esame(request, email, id_esame):
    """
    Aggiorna il voto di un esame per un utente specifico.

    Parameters:
        - email (str): L'indirizzo email dell'utente a cui appartiene l'esame.
        - id_esame (int): L'ID dell'esame da aggiornare.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    try:
        utente = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Utente non trovato'}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Ottieni l'esame specifico dall'ID, senza filtrare per l'anno del corso.
        esame = Esame.objects.get(id=id_esame)
    except Esame.DoesNotExist:
        return Response({'error': 'Esame non trovato'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EsameSerializer(esame, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def modifica_voto_esame(request):
    """
    Modifica il voto di un esame tramite una richiesta PATCH.

    Parameters:
        - esame_id (int): L'ID dell'esame da modificare.
        - nuovo_voto (float, optional): Il nuovo voto da assegnare all'esame (può essere nullo).
        - nuova_data (str, optional): La nuova data dell'esame in formato stringa (può essere nullo).

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    # Estrae i dati dalla richiesta PATCH
    esame_id = request.data.get('esame_id')
    nuovo_voto = request.data.get('nuovo_voto',
                                  None)  # Il nuovo voto potrebbe essere None se si desidera cancellare il voto esistente
    nuova_data = request.data.get('nuova_data',
                                  None)  # La nuova data potrebbe essere None se si desidera mantenere la data esistente

    # Valida i dati ricevuti
    if esame_id is None:
        return Response({'error': 'ID esame mancante per la modifica dell\'esame'},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        # Cerca l'esame corrispondente all'ID fornito
        esame = Esame.objects.get(id=esame_id)

        # Se il nuovo voto è None, lo consideriamo come una cancellazione del voto
        if nuovo_voto is None:
            esame.voto = None  # Cancella il voto esistente
        else:
            esame.voto = nuovo_voto  # Altrimenti, imposta il nuovo voto

        # Se una nuova data è fornita, aggiorna la data dell'esame
        if nuova_data is not None:
            esame.data_esame = parse_date(nuova_data)  # Converte la stringa in un oggetto data

        esame.save()  # Salva le modifiche nel database

        return Response({'success': 'Voto dell\'esame modificato con successo'}, status=status.HTTP_200_OK)
    except Esame.DoesNotExist:
        # Se l'esame con l'ID specificato non esiste, restituisce un errore
        return Response({'error': 'Esame non trovato'}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        # Se c'è un problema con la conversione della data, restituisce un errore
        return Response({'error': 'Formato data non valido'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def docenti_per_anno_api(request, anno):
    """
    Ottiene una lista di docenti basati sull'anno accademico.

    Parameters:
        - anno (str): L'anno accademico per cui ottenere i docenti.

    Permissions:
        - Solo gli utenti autenticati hanno accesso a questa vista.
    """
    serializer_class = DocenteSerializer
    queryset = Docente.objects.filter(corso__anno=anno).distinct()
    serializer = DocenteSerializer(queryset, many=True)
    return Response(serializer.data)
