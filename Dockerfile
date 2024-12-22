# node.js
FROM node:20.16.0

# Create app directory
WORKDIR /usr/src/app

#Copy app dependencies
COPY package*.json ./

#Install app dependencies
RUN npm install

#Copy app files
COPY . .

#Expose port
EXPOSE 8080


#Run app
CMD [ "node", "index.js" ]