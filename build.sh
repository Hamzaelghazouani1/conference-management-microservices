#!/bin/bash

echo "============================================"
echo "Building Conference Management Application"
echo "============================================"

# Build Maven projects
echo ""
echo "Building Maven projects..."
mvn clean package -DskipTests

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Maven build failed!"
    exit 1
fi

echo ""
echo "============================================"
echo "Building Docker images..."
echo "============================================"

# Build Docker images
docker-compose build

echo ""
echo "============================================"
echo "Build completed successfully!"
echo "============================================"
echo ""
echo "To start all services, run:"
echo "  docker-compose up -d"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop all services:"
echo "  docker-compose down"

