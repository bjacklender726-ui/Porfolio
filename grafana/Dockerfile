FROM grafana/grafana:latest
COPY grafana/start.sh /start.sh
RUN chmod +x /start.sh
COPY grafana/dashboards /etc/grafana/provisioning/dashboards
ENTRYPOINT ["/start.sh"]