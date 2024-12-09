FROM node:20
 
WORKDIR /user/app/src

COPY  tsconfig.json ./

COPY  package*.json ./

RUN npm i && tsc -b

COPY . .

EXPOSE  3000
CMD [ "node","dist/index.js" ]