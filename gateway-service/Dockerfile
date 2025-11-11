FROM eclipse-temurin:17-jdk-alpine
LABEL maintainer="ENSET Team"
LABEL description="Spring Cloud Gateway Service"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8888

ENTRYPOINT ["java", "-jar", "app.jar"]

