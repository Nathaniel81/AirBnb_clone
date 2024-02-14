from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string

from accounts.models import User
from core.models import AmenityType, PropertyType, Room, Country, City, Property, Amenity, Booking, RoomBooking, Review, Photo, Wishlist



class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        for i in range(total):
            User.objects.create(first_name=get_random_string(), email=f'user{i}@example.com', password='password')
            AmenityType.objects.create(name=f'Amenity {i}')
            PropertyType.objects.create(name=f'Property Type {i}')
            Room.objects.create(name=f'Room {i}', capacity=i)
            Country.objects.create(name=f'Country {i}')
            city = City.objects.create(name=f'City {i}', countery=Country.objects.get(name=f'Country {i}'))
            property = Property.objects.create(host=User.objects.get(first_name=get_random_string()), title=f'Property {i}', description='This is a description', price=100.00, city=city, location='Location', available_start='2024-01-01', available_end='2024-12-31', property_type=PropertyType.objects.get(name=f'Property Type {i}'), guests=i)
            Amenity.objects.create(property=property, amenity_type=AmenityType.objects.get(name=f'Amenity {i}'))
            Booking.objects.create(guest=User.objects.get(first_name=get_random_string()), property=property, check_in_date='2024-01-01', check_out_date='2024-12-31', total_guests=i)
            RoomBooking.objects.create(room=Room.objects.get(name=f'Room {i}'), booking=Booking.objects.get(guest=User.objects.get(first_name=get_random_string())), adults=i, children=i)
            Review.objects.create(reviewer=User.objects.get(first_name=get_random_string()), property=property, review_text='This is a review', rating=i)
            Photo.objects.create(url='https://example.com', alt_text='This is an alt text')
            Wishlist.objects.create(user=User.objects.get(first_name=get_random_string()))
            Wishlist.objects.get(user=User.objects.get(first_name=get_random_string())).properties.add(property)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} users'))
