# Generated by Django 4.1.3 on 2022-12-30 01:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_order_alter_link_code_orderitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_ambasser',
            field=models.BooleanField(default=False),
        ),
    ]
