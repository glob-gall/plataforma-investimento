from base64 import urlsafe_b64encode
from typing import ContextManager
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from .models import ResetPasswordCode, Token, Usuario
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
import secrets
from django.utils.html import strip_tags


def enviar_email_confirmacao(usuario):
    tokenCreate = secrets.token_urlsafe(20)
    contexto = {
        'tokenCreate': tokenCreate,
        'settings.SITE_URL':settings.SITE_URL,
        'name':usuario.data['name']
    }
    assunto = "Confirmação de conta"
    mensagem = render_to_string("confirmContaTemplate.html",contexto)
    mensagem_sem_tag_html = strip_tags(mensagem)

    
    remetente = settings.EMAIL_HOST_USER
    destinatrio = [usuario.data["email"]]
    usuario_objeto = Usuario.objects.get(email = usuario.data["email"])

    Token.objects.create(usuario = usuario_objeto, token = tokenCreate)
    email = EmailMultiAlternatives(assunto,mensagem_sem_tag_html,remetente,destinatrio)
    email.attach_alternative(mensagem, 'text/html')
    email.send()
    # send_mail(assunto, mensagem, remetente, destinatrio,html_message=mensagem)

def enviar_email_recuperacao_senha(usuario,email):
    try:
        tokenCreate = secrets.token_urlsafe(8)
        assunto = "Recuperação de senha"
        contexto = {
            'name': usuario.name,
            'settings.FRONT_URL': settings.FRONT_URL,
            'tokenCreate':tokenCreate
        }
        mensagem = render_to_string("recuperaSenhaTemplate.html",contexto)
        mensagem_sem_tag_html = strip_tags(mensagem)

        remetente = settings.EMAIL_HOST_USER
        destinatrio = [email]
        usuario_objeto = Usuario.objects.get(email = usuario.email)
        ResetPasswordCode.objects.create(usuario = usuario_objeto, resetPasswordCode = tokenCreate)

        email = EmailMultiAlternatives(assunto,mensagem_sem_tag_html,remetente,destinatrio)
        email.attach_alternative(mensagem, 'text/html')
        email.send()
    except Exception as e: 
        print(str(e))