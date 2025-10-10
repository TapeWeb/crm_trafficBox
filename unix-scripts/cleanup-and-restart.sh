#!/bin/bash
echo "=== Full clean Docker ==="
docker stop $(docker ps -aq) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null
docker network prune -f

echo "=== Check ports ==="
sudo lsof -i :7777 || echo "Port 7777 is available."
sudo lsof -i :5432 || echo "Port 5432 is available."

echo "=== Create network ==="
docker network create app_network 2>/dev/null || echo "Сеть уже существует"

echo "=== Start container as project ==="
./unix-scripts/project-starter.sh