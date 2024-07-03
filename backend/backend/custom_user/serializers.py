from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'role', 'is_active', 'is_staff', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None) # remove password from validated_data, None is used as default value
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password) # function used to hash the password
        user.save()
        return user