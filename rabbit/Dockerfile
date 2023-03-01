FROM rabbitmq:3.7.7-management

ARG RABBITMQ_USER
ARG RABBITMQ_PASSWORD

ENV RABBITMQ_USER=$RABBITMQ_USER
ENV RABBITMQ_PASSWORD=$RABBITMQ_PASSWORD

# COPY ./ssl-keys /etc/rabbitmq/ssl-keys

COPY init.sh /etc/rabbitmq

RUN chmod -R 440 /etc/rabbitmq/ssl-keys/*; chmod 750 /etc/rabbitmq/ssl-keys; chmod +x /etc/rabbitmq/init.sh

CMD ["/etc/rabbitmq/init.sh"]
