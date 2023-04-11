<!-- Nest Js setup -->
1. docker-compose up

2. need to run the image manually as there i no way to determine when the SQL finish running

3. after SQL finish running and started we start the web image

4. after starting need to go to terminal and run two command "npm run migration:run" this will install all the tables on to the backend mysql

5. Need to "npm run seeds" to generate default user

6. then can run the application api

7. localhost:<port>/api for the swagger

