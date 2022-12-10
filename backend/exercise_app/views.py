from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.core import serializers
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from .serializer import *

# Create your views here.
def index(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(["POST"])
def signIn(request):
    username=request.data['username']
    password=request.data["password"]
    print(username, password)
    user = authenticate(password=password, username=username)
    print(user, 'user')
    if user is not None:
        try:
            login(request._request, user)
            return JsonResponse({'signIn':True})
        except Exception as e:
            print(e)
            return JsonResponse({'signIn':False})
    else:
        return JsonResponse({'signIn':False})

    
@api_view(["GET"])
def curr_user(request):
    if request.user.is_authenticated:
        user = request.user
        # print(user)
        data=UserSerializer(user, many=False)
        # print(data.data)
        return Response(data.data)
    else:
        return JsonResponse({"user":None})

@api_view(['DELETE'])
def get_user(request,user_id):
    print(request)
    if request.method == 'DELETE':
        data=AppUser.objects.get(pk=user_id)
        print(data)
        data.delete()
        return HttpResponse({'success': True})


@api_view(["POST"])
def signUp(request):
    username=request.data['username']
    first_name=request.data['first_name']
    last_name=request.data['last_name']
    email=request.data["email"]
    password=request.data["password"]
    print(email, password,)
    try:
        new_user = AppUser.objects.create_user(username=username, email=email, password=password, first_name=first_name,last_name=last_name)
        print(new_user, 'test1')
        return JsonResponse({'signup':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signup':False})

def signOut(request):
    try:
        logout(request)
        return JsonResponse({'signout':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signout':False})

@api_view(["POST", 'GET'])
def exercise(request):
    print(request)
    try:
        if request.method == 'POST':
            
            exercise_title= request.data['exercise_title']
            muscile_group =request.data['muscile_group']
            equipment = request.data['equipment']
            workout_type = request.data['workout_type']
            user_exercise =  AppUser.objects.get(username=request.data['user_exercise'])
           
            newExercise = Exercise(exercise_title=exercise_title, muscile_group=muscile_group,
            equipment=equipment,workout_type=workout_type, user_exercise=user_exercise)
            newExercise.save()
            return JsonResponse({'new exercise': True})
        
        elif request.method == 'GET':
            exercise = Exercise.objects.all()
            data=ExerciseSerializer(exercise, many=True )
            print(data.data)
            # print(exercise)
            return Response(data.data)

    except Exception as e:
        print(e)
        return JsonResponse({'exercise':False})


# @api_view(['GET', 'PUT', 'DELETE'])
# def editExercise(request, exerciseGroup):
#     if request.method == 'GET':
#             exercise = Exercise.objects.get(muscile_group=exerciseGroup)
#             data=serializers.serialize("json", [exercise])
#             print(exercise)
#             return HttpResponse(data)
#     elif request.method == 'PUT':
#         pass
#     elif request.method == 'DELETE':
#         pass