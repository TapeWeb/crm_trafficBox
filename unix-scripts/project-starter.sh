#!/bin/bash

dirs_path=docker/compose-files/docker-compose.development.yml

if [ -f "$dirs_path" ]; then
  echo "Запускаю контейнеры с файлом: $dirs_path"

  docker-compose up --build
else
  echo "Файл не найден: $dirs_path"
  exit 1
fi
