from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

# Create your models here.

class USERMANAGER(BaseUserManager):
    def create_user(self,email,password=None):
        if not email:
            raise ValueError("Please enter an email address")
        if not password:
            raise ValueError("Please enter a password")
        user = self.model(email = self.normalize_email(email))
        user.set_password(password)
        user.is_admin = False
        user.is_staff = False
        user.is_ambasser = False
        user.save()
        return user
    def create_superuser(self,email,password=None):
        if not email:
            raise ValueError("Please enter an email address")
        if not password:
            raise ValueError("Please enter a password")
        user = self.model(email = self.normalize_email(email))
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_ambasser = False
        user.save()
        return user

class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    is_ambasser = models.BooleanField(default=False)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = USERMANAGER()
    
    @property
    def FullName(self):
        return self.first_name + ' ' + self.last_name
    
    @property
    def revenue(self):
        orders = Order.objects.filter(order_user = self.pk)
        return sum(o.ambassador_revenue for o in orders)        
    
class Product(models.Model):
    title= models.CharField(max_length=255)
    description= models.TextField(max_length=255)
    image= models.CharField(max_length=255)
    price= models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.title


class Link(models.Model):
    code = models.CharField(max_length=255,unique=True)
    user = models.ForeignKey(User, related_name='userOwner',on_delete=models.CASCADE)
    products=models.ManyToManyField(Product, related_name='productOwner')
    created=models.DateField(auto_now_add=True)
    updated=models.DateField(auto_now=True)
    
class Order(models.Model):
    transaction_id= models.CharField(max_length=255,null=True)
    order_user=models.ForeignKey(User, related_name='orderuser',on_delete=models.CASCADE)
    code= models.CharField(max_length=255)
    ambassador_email = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    zip = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def FullName(self):
        return self.first_name + ' ' + self.last_name
    
    @property
    def ambassador_revenue(self):
        print(id)
        order =  OrderItem.objects.filter(order=self.pk)
        print(id)
        return sum(i.ambassador_revenue for i in order)    
    
    @property
    def admin_revenue(self):
        print(id)
        order =  OrderItem.objects.filter(order=self.pk)
        print(id)
        return sum(i.admin_revenue for i in order)    

    
class OrderItem(models.Model):
    order = models.ForeignKey(Order,related_name='orders',on_delete=models.CASCADE)
    product_title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    admin_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    ambassador_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)