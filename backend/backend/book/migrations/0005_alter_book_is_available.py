# Generated by Django 5.0.6 on 2024-06-15 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0004_alter_book_is_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
    ]
