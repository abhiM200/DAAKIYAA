# DAAKIYAA Deployment Guide

This document describes how to deploy the DAAKIYAA microservices and Next.js frontend architecture.

---

## Architecture Overview

The codebase consists of:
1. **Next.js Web Frontend** (Runs on port `3000` by default).
2. **Spring Boot API Gateway** (Runs on port `8080`, acts as the central router).
3. **9 Backend Microservices** (Auth, User, Content, Interaction, Messaging, Match, Jobs, Property, Marketplace).
4. **Infrastructure**: PostgreSQL, Redis, Zookeeper, and Kafka.

---

## Option 1: Containerized Deployment via Docker Compose (Recommended)

To deploy everything onto a single virtual machine (like AWS EC2, DigitalOcean, or Azure VM):

### Step 1: Add Dockerfiles to Each Service

You will need a `Dockerfile` in the root of the frontend app and each backend service. 

#### Backend Service `Dockerfile` (Spring Boot Java 21/25)
Create this file as `Dockerfile` inside each directory under `services/` (e.g., `services/auth-service/Dockerfile`):
```dockerfile
# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Frontend Web `Dockerfile` (Next.js)
Create this file as `apps/web/Dockerfile`:
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

### Step 2: Update `docker-compose.yml` to Include Application Services

Modify your root `docker-compose.yml` to compile and run the backend microservices and frontend, linking them to Postgres, Redis, and Kafka:

```yaml
version: '3.8'

services:
  # Infrastructure
  postgres:
    image: postgres:16-alpine
    container_name: daaakiya-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: daaakiya
      POSTGRES_PASSWORD: password
      POSTGRES_DB: daaakiya_db
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - daaakiya-network

  redis:
    image: redis:7-alpine
    container_name: daaakiya-redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - daaakiya-network

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    container_name: daaakiya-zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    networks:
      - daaakiya-network

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    container_name: daaakiya-kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    networks:
      - daaakiya-network

  # Backend Services
  api-gateway:
    build: ./services/api-gateway
    container_name: api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - auth-service
      - user-service
    networks:
      - daaakiya-network

  auth-service:
    build: ./services/auth-service
    container_name: auth-service
    depends_on:
      - postgres
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/daaakiya_db
    networks:
      - daaakiya-network

  user-service:
    build: ./services/user-service
    container_name: user-service
    depends_on:
      - postgres
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/daaakiya_db
    networks:
      - daaakiya-network

  # [Add other backend services similarly here...]

  # Next.js Frontend
  web:
    build: ./apps/web
    container_name: daaakiya-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8080
    networks:
      - daaakiya-network

volumes:
  postgres-data:
  redis-data:

networks:
  daaakiya-network:
    driver: bridge
```

### Step 3: Run Deployment Command
To build images and deploy the entire stack:
```bash
docker-compose up --build -d
```

---

## Option 2: Bare-Metal Deployment (Running JARs & Node Locally/VM)

If you wish to deploy without containerizing the applications:

### Step 1: Ensure Prerequisites are Running
Ensure **PostgreSQL**, **Redis**, and **Kafka** are running and accessible on `localhost`.

### Step 2: Build all Backend Microservices
Run the clean package command on all backend microservices:
```bash
# Example for one service (do this for all 10)
cd services/api-gateway
./mvnw.cmd clean package -DskipTests
```

### Step 3: Run the Backend Microservices
Start each packaged jar using Java JRE:
```bash
# Example
java -jar services/api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
```

### Step 4: Build and Start Frontend Web App
```bash
cd apps/web
npm run build
npm run start
```

---

## Option 3: Production Cloud Orchestration (Kubernetes/AWS)

For horizontal scaling and high availability:

1. **Build and Tag Container Images**:
   Use a CI/CD pipeline (e.g. GitHub Actions) to compile the services, build Docker images, and push them to **Docker Hub**, **Amazon ECR**, or **Google Artifact Registry**.
2. **Deploy to Container Orchestrator**:
   - **AWS ECS (Elastic Container Service)**: Set up a Task Definition for each microservice and host them behind an Application Load Balancer (ALB).
   - **Kubernetes (EKS/GKE)**: Write deployment YAML files (Deployment, Service, Ingress) for each service.
3. **Database & Infrastructure Hosting**:
   Instead of containerized self-hosted databases, use managed services:
   - Database: **Amazon RDS (PostgreSQL)** or **Google Cloud SQL**.
   - Cache: **Amazon ElastiCache (Redis)**.
   - Event Broker: **Confluent Cloud** or managed **Amazon MSK (Kafka)**.
