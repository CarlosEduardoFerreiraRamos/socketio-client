FROM node:8.11.4

WORKDIR /app
EXPOSE 4200
RUN npm install -g @angular/cli

CMD [ "bash" ]
