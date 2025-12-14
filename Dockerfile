FROM nginx:alpine

# Install utilities needed for basic authentication
RUN apk add --no-cache apache2-utils

# Set default server name
ENV SERVER_NAME=utv.cha.ad

# Copy all website assets
COPY site/ /usr/share/nginx/html/

# Provide nginx configuration template
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Generate htpasswd file from environment variables before nginx starts
COPY docker-entrypoint.d/40-basic-auth.sh /docker-entrypoint.d/40-basic-auth.sh
RUN chmod +x /docker-entrypoint.d/40-basic-auth.sh

EXPOSE 80
