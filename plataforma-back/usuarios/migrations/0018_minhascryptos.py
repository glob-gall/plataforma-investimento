# Generated by Django 4.2.2 on 2023-06-29 15:22

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('crypto', '0001_initial'),
        ('usuarios', '0017_alter_meusinvestimentos_data_movimentacao'),
    ]

    operations = [
        migrations.CreateModel(
            name='MinhasCryptos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('volume', models.IntegerField()),
                ('valor_compra', models.DecimalField(decimal_places=2, max_digits=100)),
                ('data_movimentacao', models.DateTimeField(default=datetime.date.today)),
                ('cryto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crypto.cryptos')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]