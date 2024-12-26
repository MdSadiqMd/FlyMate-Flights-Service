# FlyMate-Flights-Service 

# docker build -t flymate-flights-service .                                             # Build the Image
# docker run -it --init -p 3000:3000 -v "$(pwd)":/app flymate-flights-service:latest    # start the build image
# docker volume create flymate-flights-service-node-modules                             # create a volume with a name (we are creating a volume to store node_modules)
# docker run -it --init -p 3000:3000 -v "$(pwd)":/app -v flymate-flights-service-node-modules:/app/flymate-flights-service/node_modules flymate-flights-service:latest                                                          # start the build image with volume