from faker import Faker
from django.core.management import BaseCommand
from core.models import *

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        faker=Faker()
        for f in range(10):
            user=User.objects.create(
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=faker.email(),
                password='',
                is_ambasser=True
            )
            user.set_password('1234')
            user.save()