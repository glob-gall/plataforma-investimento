# Generated by Django 4.2 on 2023-06-18 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('investimentos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='investimentos',
            name='logo',
            field=models.CharField(default=''),
        ),
    ]
