from django.core.management import BaseCommand
from django.db import connections
from django.db.utils import OperationalError
import time

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.stdout.write('waiting for db')
        conn = None
        while not conn:
            try:
                conn = connections['default']
                print(conn)
            except OperationalError:
                self.stdout.write('db still unavailable. wait 1 second')
                time.sleep(1)
        self.stdout.write(self.style.SUCCESS('db is available'))