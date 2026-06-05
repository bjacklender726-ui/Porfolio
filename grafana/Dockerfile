FROM grafana/grafana:latest
COPY --chmod=0755 start.sh /start.sh
COPY dashboards /etc/grafana/provisioning/dashboards
ENTRYPOINT ["/start.sh"]