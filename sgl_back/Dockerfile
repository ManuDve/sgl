# ─── Etapa 1: Build con Maven ────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app

# Descarga dependencias en capa propia para aprovechar caché de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn clean package -DskipTests -q

# ─── Etapa 2: Runtime mínimo ─────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=builder /app/target/sgl_back-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", \
  "-Duser.timezone=America/Santiago", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-jar", "app.jar"]
