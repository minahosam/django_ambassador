from django.core.management import BaseCommand
from faker import Faker
from core.models import *
from random import randrange

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        faker=Faker()
        for _ in range(10):
            product=Product.objects.create(
                title = faker.name(),
                description = faker.text(),
                image = faker.image_url(),
                price = randrange(10,1000)
            )
            product.save()