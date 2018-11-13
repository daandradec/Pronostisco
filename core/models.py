from django.db import models
from django.contrib.auth.models import User
# Create your models here.
"""
class Session(models.Model):
    user = models.ForeignKey(User,verbose_name="User",on_delete=models.CASCADE)
    first_link_visted = models.BooleanField(verbose_name="first visited")
    second_link_visted = models.BooleanField(verbose_name="first visited")
    third_link_visted = models.BooleanField(verbose_name="first visited")
    fourth_link_visted = models.BooleanField(verbose_name="first visited")

    class Meta:
        verbose_name = "session"
        verbose_name_plural = "session"
"""