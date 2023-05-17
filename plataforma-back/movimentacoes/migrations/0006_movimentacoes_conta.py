# Generated by Django 4.2 on 2023-05-17 15:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contas', '0001_initial'),
        ('movimentacoes', '0005_remove_movimentacoes_conta'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimentacoes',
            name='conta',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='contas.contas'),
        ),
    ]