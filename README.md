# shivai_temple

commands -

DOWN - docker-compose -f docker-compose.prod.yml down

UP - docker-compose -f docker-compose.prod.yml up -d --build

COLLECT STATIC - docker-compose -f docker-compose.prod.yml exec web_shivai python manage.py collectstatic
