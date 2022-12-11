FROM node:18.12

ARG WORKDIR=/var/www

RUN mkdir $WORKDIR

COPY build $WORKDIR

# RUN chmod -R 666 $WORKDIR
# RUN chmod 747 $WORKDIR

WORKDIR $WORKDIR

USER node

# ENTRYPOINT ["/bin/bash", "$WORKDIR/docker-entrypoint.sh"]