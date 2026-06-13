#!/bin/bash
set -e

mkdir -p /etc/grafana/provisioning/datasources

if [ "$RENDER" = "true" ]; then
  echo "=== Render environment detected ==="

  # Use Render PG env vars or fall back to known values
  : "${GRAFANA_DB_HOST:=${PGHOST:-dpg-d8g1qhmk1jcs73d3t150-a}}"
  : "${GRAFANA_DB_NAME:=${PGDATABASE:-porfolio_db_3bxy}}"
  : "${GRAFANA_DB_USER:=${PGUSER:-porfolio_db_3bxy_user}}"
  : "${GRAFANA_DB_PASS:=${PGPASSWORD:-xjZlfaWEqZjj4mIOKK0JdmfKpDMPAc0p}}"
  : "${GRAFANA_DB_SSLMODE:=disable}"
  : "${GF_SERVER_ROOT_URL:=https://porfolio-grafana.onrender.com}"
  export GF_SERVER_ROOT_URL

  # Generate datasource for Render
  cat > /etc/grafana/provisioning/datasources/datasource.yml << RENDEREOF
apiVersion: 1

datasources:
  - name: PostgreSQL
    type: postgres
    access: proxy
    url: ${GRAFANA_DB_HOST}:5432
    database: ${GRAFANA_DB_NAME}
    user: ${GRAFANA_DB_USER}
    isDefault: true
    secureJsonData:
      password: ${GRAFANA_DB_PASS}
    jsonData:
      sslmode: ${GRAFANA_DB_SSLMODE}
      postgresVersion: 1600
      timescaledb: false
RENDEREOF

else
  echo "=== Local Docker environment detected ==="

  : "${GRAFANA_DB_HOST:=postgres}"
  : "${GRAFANA_DB_NAME:=portfolio_db}"
  : "${GRAFANA_DB_USER:=admin}"
  : "${GRAFANA_DB_PASS:=admin123}"
  : "${GRAFANA_DB_SSLMODE:=disable}"
  : "${GF_SERVER_ROOT_URL:=/grafana}"
  : "${GF_SERVER_SERVE_FROM_SUB_PATH:=true}"
  export GF_SERVER_ROOT_URL
  export GF_SERVER_SERVE_FROM_SUB_PATH

  # Generate datasource for Docker
  cat > /etc/grafana/provisioning/datasources/datasource.yml << DOCKEREOF
apiVersion: 1

datasources:
  - name: PostgreSQL
    type: postgres
    access: proxy
    url: ${GRAFANA_DB_HOST}:5432
    database: ${GRAFANA_DB_NAME}
    user: ${GRAFANA_DB_USER}
    isDefault: true  
    secureJsonData:
      password: ${GRAFANA_DB_PASS}
    jsonData:
      sslmode: ${GRAFANA_DB_SSLMODE}
      postgresVersion: 1600
      timescaledb: false
DOCKEREOF

fi

exec /run.sh
