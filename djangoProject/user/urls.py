from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

# Modifica l'importazione del modulo 'views' come segue:
from . import views

urlpatterns = [
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.user_logout, name='user-logout'),
    path('get-logged-user/', views.get_logged_user, name='get-logged-user'),
    path('register/', views.UserCreation.as_view(), name='register'),
    # Endpoint per l'ottenimento del token di accesso
    path('token/', views.Login.as_view(), name='token_obtain_pair'),
    # Endpoint per l'aggiornamento del token di accesso
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Endpoint per la verifica del token
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('profile/', views.student_profile, name='student-profile'),
]
