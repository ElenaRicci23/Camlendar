from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Docente(models.Model):
    """
    Modello per rappresentare un docente.

    Attributes:
        nome (str): Il nome del docente.
        cognome (str): Il cognome del docente.
        email (str): L'indirizzo email del docente.
        link (str): Il link (URL) associato al docente (opzionale).
        dipartimento (str): Il dipartimento di appartenenza del docente.
    """
    nome = models.CharField(max_length=255)
    cognome = models.CharField(max_length=255)
    email = models.EmailField()
    link = models.URLField(blank=True, null=True)
    dipartimento = models.CharField(max_length=255)


class Corso(models.Model):
    """
    Modello per rappresentare un corso.

    Attributes:
        nome (str): Il nome del corso.
        semestre (int): Il semestre in cui è offerto il corso.
        anno (str): L'anno accademico in cui è offerto il corso.
        crediti (int): Il numero di crediti associati al corso.
        docente (Docente): Il docente responsabile del corso.
    """
    nome = models.CharField(max_length=255)
    semestre = models.IntegerField()  # considerando 1 o 2
    ANNO_CHOICES = (
        ('1', '1° ANNO'),
        ('2', '2° ANNO'),
        ('3', '3° ANNO'),
    )
    anno = models.CharField(max_length=1, choices=ANNO_CHOICES)
    crediti = models.IntegerField()
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE)


class Esame(Corso):
    """
    Modello per rappresentare un esame, che eredita da Corso.

    Attributes:
        voto (Decimal): Il voto ottenuto nell'esame (opzionale).
        data_esame (Date): La data in cui si è svolto l'esame (opzionale).
    """
    voto = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True,
        validators=[
            MinValueValidator(18),
            MaxValueValidator(30.50)
        ]
    )
    data_esame = models.DateField(null=True, blank=True)


class Lezione(models.Model):
    """
    Modello per rappresentare una lezione.

    Attributes:
        giorno_settimana (str): Il giorno della settimana in cui si tiene la lezione.
        orario_inizio (Time): L'orario di inizio della lezione.
        orario_fine (Time): L'orario di fine della lezione.
        aula (str): L'aula in cui si tiene la lezione.
        corso (Corso): Il corso a cui appartiene la lezione.
        docente (Docente): Il docente che tiene la lezione.
    """
    GIORNI_SETTIMANA = [
        ('L', 'Lunedì'),
        ('M', 'Martedì'),
        ('ME', 'Mercoledì'),
        ('G', 'Giovedì'),
        ('V', 'Venerdì'),
    ]

    giorno_settimana = models.CharField(max_length=2, choices=GIORNI_SETTIMANA)
    orario_inizio = models.TimeField()
    orario_fine = models.TimeField()
    aula = models.CharField(max_length=50)
    corso = models.ForeignKey(Corso, on_delete=models.CASCADE)
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE)
