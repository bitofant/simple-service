FROM node:10-alpine
LABEL maintainer="joeran.tesse@iteratec.de"

ARG HTTP_PORT=8080

EXPOSE ${HTTP_PORT}
ENV HTTP_PORT=${HTTP_PORT}
ENV NODE_ENV=production

ENV HOME /root
WORKDIR $HOME
COPY . $HOME
RUN cd $HOME
RUN npm i
CMD ["npm","start"]
