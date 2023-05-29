from base64 import urlsafe_b64encode
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from .models import ResetPasswordCode, Token, Usuario
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

def enviar_email_recuperacao_senha(usuario,email):
    try:
        tokenCreate = secrets.token_urlsafe(8)
        assunto = "Recuperação de senha"
        mensagem = f'Olá {usuario.name},\n\n'\
        f'Aqui está o link para recuperar sua senha: {settings.FRONT_URL}/recover/{tokenCreate}\n\n'\
        f'Obrigado!!'

        remetente = settings.EMAIL_HOST_USER
        destinatrio = [email]
        usuario_objeto = Usuario.objects.get(email = usuario.email)
        ResetPasswordCode.objects.create(usuario = usuario_objeto, resetPasswordCode = tokenCreate)
        send_mail(assunto, mensagem, remetente, destinatrio)
    except Exception as e: 
        print(str(e))