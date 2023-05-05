from django.core.management import BaseCommand
from django_redis import get_redis_connection
from core.models import User


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        con = get_redis_connection('default')
        print(con)
        ambassadors = User.objects.filter(is_ambasser= True)
        for ambassador in ambassadors:
            con.zadd('rank',{ambassador.FullName:float(ambassador.revenue)})
        