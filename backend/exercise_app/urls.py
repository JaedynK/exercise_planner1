from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user/', views.curr_user),
    path('current_user/<int:user_id>/', views.get_user),
    path('exercise/', views.exercise),
    # path('exercise/<str:muscileGroup>', views.editExercise)
    # re_path(r'.*', views.index),

]