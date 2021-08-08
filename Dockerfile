FROM nginx:latest
COPY build/ /usr/share/nginx/html/
COPY deploy/config/nginx.conf /etc/nginx/nginx.conf
COPY deploy/config/default.conf /etc/nginx/conf.d/default.conf
