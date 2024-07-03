from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "role",
            # "is_active",
            # "is_staff",
            # "is_superuser",
        ]
        # fields= '__all__'
        # adding isactive to true by default
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop(
            "password", None
        )  # remove password from validated_data, None is used as default value
        validated_data['is_active'] = True
        user = self.Meta.model(**validated_data)
        # setting is activee to true by default cus after registration the user should be active
        # user.set_is_active = True
        
        if password is not None:
            user.set_password(password)  # function used to hash the password
        user.save()
        return user
