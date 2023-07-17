from django.conf.urls.static import static
from django.urls import path

from churn import settings
from churnmodel import views
from churnmodel.views import user_create

urlpatterns = [
    path('', views.home, name='home', ),
    path('api/endpoint/', user_create, name='create_user'),
    path('api/churn_predict/', views.make_prediction, name='churn_predict'),
    path('api/prediction/',views.predictions,name='prediction')
]
