from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'], url_path='upcoming')
    def upcoming(self, request):
        upcoming_products = Product.objects.filter(is_upcoming=True).order_by('-created_at')
        serializer = self.get_serializer(upcoming_products, many=True)
        return Response(serializer.data)
