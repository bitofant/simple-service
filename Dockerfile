FROM node:10-alpine
LABEL maintainer="joeran.tesse@iteratec.de"

ARG HTTP_PORT=8080

ENV HOME /root

EXPOSE ${HTTP_PORT}:8080

WORKDIR $HOME
COPY . $HOME
RUN cd $HOME
ENV NODE_ENV=production
RUN npm i
CMD ["npm","start"]
