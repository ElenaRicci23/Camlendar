from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """
    Manager personalizzato per il modello utente personalizzato.
    Questo manager fornisce metodi per la creazione di utenti e superutenti.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Crea e salva un utente con l'email e la password specificate.

        Args:
            email (str): L'email dell'utente.
            password (str, optional): La password dell'utente. Default è None.
            **extra_fields: Campi aggiuntivi da associare all'utente.

        Returns:
            User: L'oggetto utente creato.

        Raises:
            ValueError: Se l'email non è specificata.
        """
        if not email:
            raise ValueError(_("The Email field must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Crea e salva un superutente con l'email e la password specificate.

        Args:
            email (str): L'email del superutente.
            password (str, optional): La password del superutente. Default è None.
            **extra_fields: Campi aggiuntivi da associare al superutente.

        Returns:
            User: L'oggetto superutente creato.

        Raises:
            ValueError: Se l'email non è specificata o se "is_staff" o "is_superuser" non sono impostati a True.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Modello per l'utente personalizzato.
    Questo modello estende AbstractBaseUser e include campi personalizzati.
    """

    email_regex = RegexValidator(
        regex=r'^[a-zA-Z]+\.[a-zA-Z]+@studenti\.unicam\.it$',
        message="L'email deve seguire il formato: nome.cognome@studenti.unicam.it"
    )

    email = models.EmailField(
        _("email address"),
        unique=True,
        validators=[email_regex],
        error_messages={
            "unique": _("A user with that email already exists."),
        },
    )

    nome = models.CharField(max_length=255)
    cognome = models.CharField(max_length=255)

    YEAR_CHOICES = (
        ('1', '1° ANNO'),
        ('2', '2° ANNO'),
        ('3', '3° ANNO'),
    )

    anno_accademico = models.CharField(max_length=1, choices=YEAR_CHOICES)

    gender_choice = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('U', 'Unicorn')
    )

    gender = models.CharField(max_length=10, choices=gender_choice, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
