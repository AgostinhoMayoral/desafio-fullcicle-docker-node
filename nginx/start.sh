#!/bin/sh
set -e

# Espera o serviço "app" estar acessível na porta 3000
while ! nc -z app 3000; do   
  echo "Aguardando o app ficar pronto..."
  sleep 3
done

echo "App está pronto! Iniciando Nginx..."
exec nginx -g 'daemon off;'