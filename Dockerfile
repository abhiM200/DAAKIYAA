# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY apps/web/package*.json ./
RUN npm ci
COPY apps/web/ ./
RUN npm run build

# Stage 2: Build the Spring Boot backend
FROM maven:3.9.6-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app/backend
COPY services/monolith-service/pom.xml .
RUN mvn dependency:go-offline -B || true
COPY services/monolith-service/src ./src
# Copy the built frontend into Spring Boot's static resources directory
COPY --from=frontend-build /app/frontend/out ./src/main/resources/static
RUN mvn clean package -DskipTests -B

# Stage 3: Run the monolith
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-XX:+UseSerialGC", "-Xmx400m", "-jar", "app.jar"]
