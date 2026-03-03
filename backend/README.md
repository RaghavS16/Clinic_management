# 🏥 Med Portal Backend

This is the backend service for the **Med Portal** web application. It is built using **Spring Boot**, managed with **Apache Maven 3.9.10**, and runs on **Java 17**.

## 📁 Project Structure

med_portal/
├── backend/
│ ├── .mvn/
│ ├── mvnw / mvnw.cmd
│ ├── pom.xml
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/
│ │ │ └── resources/
│ │ └── test/


## ⚙️ Tech Stack

- Java 17.0.15 (Eclipse Adoptium)
- Spring Boot
- Apache Maven 3.9.10
- Windows 10 (64-bit)

## 🚀 Getting Started

### Prerequisites

- Java 17  
- Maven 3.9.10  
- Git (optional)

Verify installation:

java -version
mvn -version

Run the Application : 

mvn spring-boot:run
Runs at: http://localhost:8080

🔌 API Endpoints (Examples)
Method	Endpoint	Description
GET	/api/hello	Sample GET endpoint
POST	/api/login	User login
POST	/api/register	User registration

🛠 Configuration
File: src/main/resources/application.properties

properties

server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/med_portal
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
🧪 Build the Project

mvn clean install
Creates .jar in target/. Run with:


java -jar target/med_portal-0.0.1-SNAPSHOT.jar
📌 Notes
Stop server with Ctrl + C

Ensure PostgreSQL is running and credentials are correct

Set JAVA_HOME and MAVEN_HOME properly