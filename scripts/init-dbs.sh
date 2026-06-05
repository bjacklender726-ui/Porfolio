#!/bin/bash
# Crea las bases de datos de cada proyecto automáticamente al iniciar PostgreSQL
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  -- Portfolio
  CREATE DATABASE portfolio_db;
  -- Sample app
  CREATE DATABASE sample_app_db;
  -- Travel website
  CREATE DATABASE travel_db;
  -- Añade aqui más bases de datos para nuevos proyectos
EOSQL

echo "Bases de datos inicializadas correctamente"
