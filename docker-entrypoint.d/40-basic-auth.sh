#!/bin/sh
set -e

if [ -z "$BASIC_AUTH_USER" ] || [ -z "$BASIC_AUTH_PASSWORD" ]; then
    echo "Error: BASIC_AUTH_USER and BASIC_AUTH_PASSWORD must be set." >&2
    exit 1
fi

htpasswd -bc /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASSWORD"
