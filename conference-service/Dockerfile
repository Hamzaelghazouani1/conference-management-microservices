FROM eclipse-temurin:17-jdk-alpine
LABEL maintainer="ENSET Team"
LABEL description="Conference Management Microservice"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]

