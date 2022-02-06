FROM nginx:latest
COPY build/ /usr/share/nginx/html/
COPY deploy/config/nginx.conf /etc/nginx/nginx.conf
