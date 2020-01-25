FROM node:10-alpine
LABEL maintainer="bitofant"

ARG HTTP_PORT=8080

EXPOSE ${HTTP_PORT}
ENV HTTP_PORT=${HTTP_PORT}
ENV NODE_ENV=production

ENV HOME /var/app
RUN mkdir ${HOME}

RUN groupadd -r swuser -g 433 && \
    useradd -u 431 -r -g swuser -d ${HOME} -s /sbin/nologin -c "Docker image user" swuser && \
    chown -R swuser:swuser ${HOME}
USER swuser
WORKDIR $HOME
COPY . $HOME
RUN cd $HOME && \
    npm i
CMD ["npm","start"]
