# Generated by Django 4.2 on 2023-06-18 20:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0016_meusinvestimentos_data_movimentacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meusinvestimentos',
            name='data_movimentacao',
            field=models.DateTimeField(default=datetime.date.today),
        ),
    ]
