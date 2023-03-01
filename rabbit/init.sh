#!/bin/sh

# Create Rabbitmq user
( sleep 15 ; \
echo $RABBITMQ_USER $RABBITMQ_PASSWORD ""
rabbitmqctl delete_user guest 2>/dev/null ; \
rabbitmqctl add_user $RABBITMQ_USER $RABBITMQ_PASSWORD 2>/dev/null ; \
rabbitmqctl set_user_tags $RABBITMQ_USER administrator ; \
rabbitmqctl set_permissions -p / $RABBITMQ_USER  ".*" ".*" ".*" ; \
echo "*** Log in the WebUI at port 15672 (example: http:/localhost:15672) ***") &

rabbitmq-server $@
