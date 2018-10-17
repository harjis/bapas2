Useful commands:

# stop all containers
docker stop $(docker ps -aq)

# start docker
docker-compose up -d

# update datamodel
prisma deploy 

# access database directly
docker exec -it backend_mysql_1 mysql -u root --host 127.0.0.1 --port 3306 --password=prisma
