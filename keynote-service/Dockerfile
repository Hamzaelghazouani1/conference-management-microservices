FROM eclipse-temurin:17-jdk-alpine
LABEL maintainer="ENSET Team"
LABEL description="Keynote Management Microservice"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]

