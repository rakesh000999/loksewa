from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

# Use the project's user model (supports custom user via AUTH_USER_MODEL)
User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # basic validation
        if not username or not email or not password:
            return Response({'error': 'username, email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username, email=email, password=password)
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Prevent an unhandled exception from returning a 500 with no JSON
            return Response({'error': 'Registration failed', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        from django.contrib.auth import authenticate

        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # find user by email using the configured user model
            try:
                user_obj = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

            username = getattr(user_obj, 'username', None)
            user = authenticate(username=username, password=password)

            if not user:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username,
                'email': user.email,
            })
        except Exception as e:
            return Response({'error': 'Login failed', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
