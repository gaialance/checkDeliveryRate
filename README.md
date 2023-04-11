<!-- using backend mysql -->

<!-- Nest Js setup -->
1. docker-compose up

2. After Service start up on the docker, we can use npm run migration:run to generate all the table for it

3. Need to "npm run seeds" to generate default user

4. then can run the application api with npm start

<!-- for local -->
1. npm start:dev

<!-- with mysql setup completely -->
1. npm run build
2. npm migration:run
3. npm start

