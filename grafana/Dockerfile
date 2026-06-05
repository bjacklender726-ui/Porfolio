FROM grafana/grafana:latest
COPY start.sh /start.sh
RUN chmod +x /start.sh
COPY dashboards /etc/grafana/provisioning/dashboards
ENTRYPOINT ["/start.sh"]