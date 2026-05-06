import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fabric_backend.settings')
django.setup()

User = get_user_model()
user = User.objects.get(username='admin')
user.set_password('admin123')
user.save()
print("Password updated for 'admin' user to 'admin123'")
