# Generated by Django 5.0.6 on 2024-06-18 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrow', '0006_rename_is_confirmed_book_borrow_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book_borrow',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('confirmed', 'confirmed'), ('cancelled', 'cancelled')], default='pending', max_length=20),
        ),
    ]
