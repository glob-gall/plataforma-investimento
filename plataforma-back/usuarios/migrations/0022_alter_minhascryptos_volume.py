# Generated by Django 4.2.1 on 2023-06-29 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0021_usuario_cryptos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='minhascryptos',
            name='volume',
            field=models.FloatField(),
        ),
    ]
