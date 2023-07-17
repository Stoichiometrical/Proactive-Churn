from django.db import models


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    #
    def __str__(self):
        return self.name

# class Predictions(models.Model):
#     'gender': 'female',
#     'seniorcitizen': 1,
#     'partner': 'no',
#     'dependents': 'no',
#     'phoneservice': 'yes',
#     'multiplelines': 'yes',
#     'internetservice': 'fiber_optic',
#     'onlinesecurity': 'no',
#     'onlinebackup': 'no',
#     'deviceprotection': 'no',
#     'techsupport': 'no',
#     'streamingtv': 'yes',
#     'streamingmovies': 'no',
#     'contract': 'month-to-month',
#     'paperlessbilling': 'yes',
#     'paymentmethod': 'electronic_check',
#     'tenure': 1,
#     'monthlycharges': 85.7,
#     'totalcharges': 85.7
