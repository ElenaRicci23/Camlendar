from pathlib import Path
import datetime
import os
from datetime import timedelta

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = 'django-insecure-+ono96t)b(w*p2yj@%mej6iixk5o4_+2hk_@cfpm^hk0v=s%_2'

DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost"]


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Fallback to default ModelBackend
]

ADMINS = [
    ('Admin', 'elena.ricci@studenti.unicam.it'),
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user',
    'event',
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'storages',
    'rest_framework.authtoken',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Durata del token di accesso
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),  # Durata del refresh token
    'SLIDING_TOKEN_LIFETIME': timedelta(days=1),  # Durata massima di utilizzo del refresh token
    'SLIDING_TOKEN_REFRESH_LIFETIME_GRACE_PERIOD': timedelta(days=2),  # Periodo di grazia per il refresh token
    'ROTATE_REFRESH_TOKENS': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

JWT_AUTH = {
    'JWT_PAYLOAD_GET_USERNAME_HANDLER':
    'your_app.utils.jwt_get_username_from_payload_handler',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=1),  # Imposta il tempo di scadenza del token come necessario
}


CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]


ROOT_URLCONF = 'djangoProject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djangoProject.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'student_db',
        'USER': 'root',
        'PASSWORD': 'Im7omyW%8!AND',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

AUTH_USER_MODEL = 'user.User'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 9,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'it'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


