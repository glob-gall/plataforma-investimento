# Generated by Django 4.2.2 on 2023-06-29 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crypto', '0001_initial'),
        ('usuarios', '0020_rename_cryto_minhascryptos_crypto'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='cryptos',
            field=models.ManyToManyField(to='crypto.cryptos'),
        ),
    ]
