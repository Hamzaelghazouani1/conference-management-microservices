FROM eclipse-temurin:17-jdk-alpine
LABEL maintainer="ENSET Team"
LABEL description="Spring Cloud Config Service"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 9999

ENTRYPOINT ["java", "-jar", "app.jar"]

