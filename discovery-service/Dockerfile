FROM eclipse-temurin:17-jdk-alpine
LABEL maintainer="ENSET Team"
LABEL description="Eureka Discovery Service"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]

