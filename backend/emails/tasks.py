from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_email(user_email, property_title):
    print("User Email >> ", user_email, "Property >> ", property_title)
    subject = 'Reservation Confirmation'
    message = f"Thank you for booking {property_title}. Your reservation is confirmed!"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user_email]
    send_mail(subject, message, from_email, recipient_list)
