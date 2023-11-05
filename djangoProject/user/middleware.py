from rest_framework_simplejwt.exceptions import AuthenticationFailed
from django.core.cache import cache

class CheckBlacklistedTokenMiddleware:
    """
    Middleware per verificare se un token JWT è stato messo in blacklist.
    Questo middleware controlla l'intestazione "Authorization" in una richiesta HTTP per un token JWT
    e verifica se il token è presente nella lista nera (blacklist) nella cache. Se il token è nella lista nera,
    solleva un'eccezione di autenticazione.

    Args:
        get_response (callable): La funzione che gestisce la chiamata successiva nella catena dei middleware.

    Attributes:
        get_response (callable): La funzione che gestisce la chiamata successiva nella catena dei middleware.
    """

    def __init__(self, get_response):
        """
        Inizializza il middleware con la funzione che gestirà la chiamata successiva nella catena dei middleware.

        Args:
            get_response (callable): La funzione che gestisce la chiamata successiva nella catena dei middleware.
        """
        self.get_response = get_response

    def __call__(self, request):
        """
        Gestisce una richiesta HTTP, verificando se il token JWT è nella lista nera (blacklist).

        Args:
            request (HttpRequest): La richiesta HTTP in ingresso.

        Returns:
            HttpResponse: La risposta HTTP generata dal middleware o dalla vista successiva.

        Raises:
            AuthenticationFailed: Se il token è nella lista nera, solleva un'eccezione di autenticazione.
        """
        # Codice eseguito prima che la vista (e il middleware successivo) sia chiamata.

        # Ottieni l'intestazione di autorizzazione dalla richiesta
        authorization_header = request.headers.get('Authorization')

        # Verifica se l'intestazione contiene la parola "Bearer" (comune per i token JWT)
        if authorization_header and 'Bearer' in authorization_header:
            # Estrai il token dalla stringa "Authorization"
            token = authorization_header.split(' ')[1]

            # Controlla se il token è nella lista nera (blacklist)
            is_blacklisted = cache.get(f'blacklisted_{token}')

            if is_blacklisted:
                # Se il token è nella lista nera, solleva un'eccezione di autenticazione
                raise AuthenticationFailed("Token is blacklisted")

        # Chiamata alla vista o al middleware successivo
        response = self.get_response(request)

        # Codice eseguito dopo che la vista è stata chiamata.

        return response
