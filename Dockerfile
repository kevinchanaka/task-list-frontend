FROM nginx:latest
COPY build/ /usr/share/nginx/html/
COPY files/nginx.conf /etc/nginx/nginx.conf
