from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    list_display = (
    'id', 'email', 'nome', 'cognome', 'anno_accademico', 'gender', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('anno_accademico', 'gender', 'is_staff', 'is_active')
    search_fields = ('nome', 'cognome', 'email')
    ordering = ('-date_joined',)

    fieldsets = (
        (None, {
            'fields': ('email', 'password')
        }),
        ('Informazioni personali', {
            'fields': ('nome', 'cognome', 'anno_accademico', 'gender')
        }),
        ('Permessi', {
            'fields': ('is_staff', 'is_active')
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )


admin.site.register(User, CustomUserAdmin)
