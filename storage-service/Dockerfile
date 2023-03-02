FROM node:16-stretch

RUN apt-get update && \
  apt-get install -y python python-dev python-pip python-virtualenv g++ make libstdc++6 libc6 libgcc1

WORKDIR /project

RUN fc-cache -f -v

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","run","start:prod"]
