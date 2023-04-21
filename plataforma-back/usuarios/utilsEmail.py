from base64 import urlsafe_b64encode
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from .models import Token, Usuario
from django.core.mail import send_mail
from django.conf import settings
import secrets


def enviar_email_confirmacao(usuario):
    tokenCreate = secrets.token_urlsafe(20)

    assunto = "Confirmação de conta"
    mensagem = f'Olá {usuario.data["name"]},\n\n'\
    f'Clique no link abaxo para confirmar sua conta: \n\n'\
    f'{settings.SITE_URL}/confirmar_conta/{tokenCreate}\n\n' \
    f'Obrigado!!'

    remetente = settings.EMAIL_HOST_USER
    destinatrio = [usuario.data["email"]]
    usuario_objeto = Usuario.objects.get(email = usuario.data["email"])
    Token.objects.create(usuario = usuario_objeto, token = tokenCreate)
    send_mail(assunto, mensagem, remetente, destinatrio)
