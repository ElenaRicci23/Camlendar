# Camlendar
progetto di PAWM
Gestione Corsi Accademici - Sito Web
Introduzione
Questo repository contiene il codice sorgente e la documentazione per un sito web sviluppato per la gestione dei corsi accademici presso la facoltà di Informatica di Unicam. Questo README fornisce una panoramica dettagliata del progetto, comprese le tecnologie utilizzate, i modelli dei dati, le funzionalità principali, la sicurezza implementata e le possibilità di sviluppo futuro.

Tecnologie Utilizzate
L'applicazione è stata sviluppata utilizzando una combinazione di tecnologie nel frontend e nel backend:

Backend:
Django: Framework Python per la gestione del lato server del sito.
Django REST framework: Libreria per la creazione di API RESTful nel backend.
Frontend:
Angular: Framework JavaScript/TypeScript per la gestione del lato client del sito.
Angular Calendar: Libreria per la visualizzazione dei calendari.
Backend (Django)
Modelli dei Dati
Il backend utilizza i seguenti modelli di dati per rappresentare gli oggetti chiave del sistema:

User (Utente): Estensione del modello utente di base di Django con informazioni aggiuntive come nome, cognome, anno accademico, ecc.

Corso: Rappresenta un corso accademico collegato a un docente tramite una chiave esterna. Contiene informazioni come il nome del corso, il semestre, l'anno accademico e i crediti.

Docente: Rappresenta un docente con informazioni come nome, cognome e un link personale.

Lezione: Rappresenta una lezione con informazioni come il giorno della settimana, l'orario di inizio e fine, il corso associato e l'aula.

API RESTful
Il backend fornisce API RESTful per consentire agli utenti di accedere a risorse come corsi, docenti e lezioni. Le API sono state create utilizzando Django REST framework, semplificando la gestione delle richieste HTTP e delle risposte JSON.

Sicurezza
Diverse misure di sicurezza sono state implementate nel progetto:

Autenticazione: L'autenticazione degli utenti avviene utilizzando token JWT (JSON Web Token).

Gestione delle Autorizzazioni: Sono state definite diverse classi di autorizzazione per determinare chi può accedere alle diverse risorse API.

Protezione CSRF: Django offre protezione CSRF integrata per prevenire attacchi di falsificazione di richieste tra siti (CSRF).

Validazione dei Dati: I dati inviati attraverso le richieste API vengono attentamente validati e sanificati per evitare inserimenti malevoli o dannosi nel database.

Limitazione dei Tentativi di Accesso: Sono state implementate limitazioni sui tentativi di accesso errati per proteggere gli account utente da attacchi di forza bruta.

Frontend (Angular)
Componenti Principali
CorsiComponent: Visualizza una lista di corsi e offre la possibilità di filtrarli in base all'anno accademico.

SchedulerComponent: Consente agli utenti di visualizzare un calendario delle lezioni associate ai corsi, docenti e aule. È possibile filtrare le lezioni per anno accademico e ottenere ulteriori dettagli sugli eventi.

Servizi Principali
AuthService: Gestisce l'autenticazione degli utenti, inclusi i processi di accesso, registrazione e logout.

ApiService: Effettua richieste HTTP per ottenere dati dal backend, gestendo la comunicazione tra frontend e backend.

Funzionalità Principali
Il sito offre diverse funzionalità chiave, tra cui:

Autenticazione utente con token JWT.
Visualizzazione completa dei corsi accademici.
Visualizzazione di un calendario delle lezioni accademiche con filtraggio per anno accademico.
Filtraggio dei corsi, dei docenti e del calendario delle lezioni per anno accademico.
Logout degli utenti, invalidando il token JWT.
Possibili Sviluppi Futuri
Il progetto offre opportunità di sviluppo futuro, tra cui:

Miglioramento dell'interfaccia utente con funzionalità aggiuntive e un design più accattivante.
Integrazione con servizi di terze parti, ad esempio un sistema di pagamento per le tasse accademiche.
Contributi
Siamo aperti a contributi da parte della community per migliorare ulteriormente questo progetto. Per favore, leggi le linee guida per il contributo nel file CONTRIBUTING.md prima di iniziare.

Licenza
Questo progetto è distribuito con una licenza MIT. Sentiti libero di utilizzare, modificare e distribuire il codice come desideri.

Contatti
Per ulteriori informazioni o domande, non esitare a contattarci all'indirizzo email info@universita.it.

Grazie per aver visitato il nostro repository e buona gestione dei corsi accademici!
