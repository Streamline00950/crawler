FROM node:16.17.0

RUN mkdir -p /home/app

COPY ./src /home/app/src
COPY ./test /home/app/test
COPY ./package.json /home/app/package.json
COPY ./package-lock.json /home/app/package-lock.json
COPY ./tsconfig.json /home/app/tsconfig.json

WORKDIR "/home/app/"
RUN npm install

RUN npm run build

RUN cp ./package.json ./build/package.json
RUN cp ./package-lock.json ./build/package-lock.json
RUN cp -r ./node_modules ./build/node_modules

WORKDIR "/home/app/build"
CMD [ "npm", "run", "test" ]