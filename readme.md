# E-Commerce microservice

I try to create e-commerce microservice where has User, Product and Order services. Database is separated with each service.

I create client with next js which is based on React js.

I integrate docker with the project.

To run the project for development.

```
docker-compose -f docker-compose.dev.yaml up -d
```

To run the project for production

```
docker-compose up -d
```

Client will be on http://localhost:3000

I attach redisinsight for redis GUI.
Check the port http://localhost:8082

I attach adminer for database. I use postgres for my database.
Check the port http://localhost:8081


