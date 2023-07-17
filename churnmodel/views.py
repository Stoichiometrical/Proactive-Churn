import os
import openai
import joblib
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
import numpy as np
from rest_framework import status
from joblib import dump, load
import requests
import pandas
from churn import settings
from churnmodel.serializers import UserSerializer



@api_view(['POST', 'GET'])
@csrf_exempt
def make_prediction(request):
    if request.method == 'POST':
        try:
            vectorizer_path = os.path.join(settings.BASE_DIR, 'churnmodel', 'dict_vectorizer.joblib')
            vectorizer = joblib.load(vectorizer_path)

            model_path = os.path.join(settings.BASE_DIR, 'churnmodel', 'churn.joblib')
            model = joblib.load(model_path)

            # Convert request.data (a dict) into a list of one dict
            features = [request.data]

            # Use the vectorizer to transform features into a numpy array
            transformed_features = vectorizer.transform(features)

            # Use the model to calculate the probabilities
            probabilities = model.predict_proba(transformed_features)

            # Get the probability of the positive class (usually class 1)
            churn_probability = probabilities[0][1]

            return Response({"churn_proba": churn_probability})

        except Exception as e:
            return Response({"error": str(e)})
    elif request.method == 'GET':
        return Response({"message": "Send a POST request with your data to get a prediction."})

@api_view(['POST', 'GET'])
@csrf_exempt
def predictions(request):
    if request.method == 'POST':
        try:
            # Get the uploaded file from request.FILES
            uploaded_file = request.FILES['dataset']
            print(uploaded_file)

            # # Specify the path to save the uploaded file
            # file_path = os.path.join(settings.BASE_DIR, 'uploads', uploaded_file.name)
            #
            # # Save the uploaded file to the specified path
            # with open(file_path, 'wb+') as destination:
            #     for chunk in uploaded_file.chunks():
            #         destination.write(chunk)

            # Load the vectorizer and model
            vectorizer_path = os.path.join(settings.BASE_DIR, 'churnmodel', 'dict_vectorizer.joblib')
            vectorizer = joblib.load(vectorizer_path)

            model_path = os.path.join(settings.BASE_DIR, 'churnmodel', 'churn.joblib')
            model = joblib.load(model_path)

            # Process the uploaded file (e.g., read CSV, extract features)

            import pandas as pd

            df = pd.read_csv(uploaded_file)

            # Extract the features from the DataFrame
            features = df.to_dict(orient='records')

            # Use the vectorizer to transform features into a numpy array
            transformed_features = vectorizer.transform(features)

            # Use the model to calculate the probabilities
            probabilities = model.predict_proba(transformed_features)

            # Get the probability of the positive class (usually class 1)
            churn_probabilities = probabilities[:, 1]

            # Segment the customers based on churn probabilities
            segments = []
            for churn_prob in churn_probabilities:
                if churn_prob < 0.3:
                    segments.append('Low Churn')
                elif churn_prob < 0.7:
                    segments.append('Medium Churn')
                else:
                    segments.append('High Churn')

            # Return the segmented customers and probabilities as the API response
            response = {
                'segments': segments,
                'churn_probabilities': churn_probabilities.tolist()
            }

            return JsonResponse(response)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'GET':
        return JsonResponse({'message': 'Send a POST request with your data to get a prediction.'})





#
# Get recommendations from OpenAI
def get_recommendations(request):
    if request.method == 'POST':
        churn_probability = request.POST.get('churn_probability')
        prompt = f"You are a seasoned marketing expert. A customer has a churn probability of {churn_probability}. What practical steps would you recommend to keep this customer from leaving?"

        response = requests.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            headers={
                'Content-Type': 'application/json',
                'Authorization': 'Bearer API_KEY'
            },
            json={
                'prompt': prompt,
                'max_tokens': 100
            }
        )

        data = response.json()

        if data['choices'] and len(data['choices']) > 0 and 'text' in data['choices'][0]:
            recommendation = data['choices'][0]['text'].strip()
            return JsonResponse({"recommendation": recommendation})
        else:
            return JsonResponse({"error": "No recommendation received from OpenAI API"})

    return JsonResponse({"error": "Invalid request method"})


# @api_view(['POST', 'GET'])
# @csrf_exempt
# def make_prediction(request):
#     if request.method == 'POST':
#         try:
#             # Load your saved model and DictVectorizer
#             # model = joblib.load('churn.joblib')
#             # vectorizer = joblib.load('dict_vectorizer.joblib')
#
#             vectorizer_path = os.path.join(settings.BASE_DIR, 'churnmodel', 'dict_vectorizer.joblib')
#             vectorizer = joblib.load(vectorizer_path)
#
#             model_path = os.path.join(settings.BASE_DIR, 'churnmodel', 'churn.joblib')
#             model = joblib.load(model_path)
#
#             # Convert request.data (a dict) into a list of one dict
#             features = [request.data]
#
#             # Use the vectorizer to transform features into a numpy array
#             # transformed_features = vectorizer.transform(features).toarray()
#             transformed_features = vectorizer.transform(features)
#
#             # Use the model to make a prediction
#             prediction = model.predict(transformed_features)[0, 1]
#
#             # Convert prediction to list and return in Response
#             return Response({"prediction": prediction.tolist()})
#
#         except Exception as e:
#             return Response({"error": str(e)})
#     elif request.method == 'GET':
#         return Response({"message": "Send a POST request with your data to get a prediction."})


@csrf_exempt
def user_create(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


def home(request):
    return render(request, 'home.html')
