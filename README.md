# Camlendar

Questo repository contiene il codice sorgente per un sito web di gestione corsi accademici presso Unicam. È basato su Django (backend) e Angular (frontend).

## Tecnologie Utilizzate

- Backend: Django e Django REST framework.
- Frontend: Angular e Angular Calendar.

## Funzionalità Principali

- Autenticazione JWT.
- Visualizzazione dei corsi accademici.
- Calendario delle lezioni con filtraggio per anno accademico.

## Installazione

Per eseguire il progetto, segui queste istruzioni:

### Backend (Django)

1. Assicurati di avere Python installato sul tuo sistema.

2. Vai alla cartella del backend (`djangoProject`) tramite il terminale.

3. Esegui il comando per installare i requisiti Django: `pip install -r requirements.txt`

4. Applica le migrazioni del database:` python manage.py migrate`

5. Avvia il server Django: ` python manage.py runserver`

### Frontend (Angular)

1. Assicurati di avere Node.js e npm (Node Package Manager) installati sul tuo sistema.

2. Vai alla cartella del frontend (`angular`) tramite il terminale.

3. Esegui il comando per installare le dipendenze Angular: `npm install`

4. Avvia l'app Angular: `ng serve`

L'applicazione sarà ora accessibile all'indirizzo http://localhost:4200/ nel tuo browser.

## Sicurezza

- Autenticazione JWT.
- Gestione autorizzazioni.
- Protezione CSRF.
- Validazione dati.
- Limitazione tentativi di accesso errati.

## Possibili Sviluppi Futuri

- Miglioramento interfaccia utente.
- Integrazione con servizi di pagamento.

## Contributi

Siamo aperti a contributi dalla community. Consulta CONTRIBUTING.md per le linee guida.

## Licenza

Distribuito con licenza MIT.

## Contatti

Per domande, contatta nessuno@universita.it.
