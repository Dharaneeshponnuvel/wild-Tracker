# Wild Track

Wild Track is an animal tracking and management system built using **Spring Boot** and **PostgreSQL**. The application allows users to manage animal details, including adding, updating, and deleting entries in the database.

## Features

- **Admin Dashboard**: Perform CRUD operations on animal data.
- **Dynamic Data Handling**: Animal data is dynamically fetched and displayed.
- **Image Management**: Admins can upload images, and file paths are stored in the database.
- **Authentication**: Secure login and access control for different user types (admin, user, etc.).

## Tech Stack

- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL
- **Frontend**: React.js (optional if integrated for UI)
- **Image Storage**: File paths stored in PostgreSQL; images saved in a designated directory.

## Prerequisites

- Java 17 or later
- PostgreSQL 13 or later
- Maven 3.8+
- A suitable IDE (e.g., IntelliJ IDEA)
- React.js setup (if applicable)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd wild-track
```
## 2. Set Up the Database
Create a PostgreSQL database named wildtrack.

Use the following credentials in your application:

User: postgres
Password: 2010
Port: 5432
Create the wildtrack table:

##sql
Copy code
```bash
CREATE TABLE wildtrack (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image_url VARCHAR(255),
    description TEXT
);
```
## 3. Configure the Application
Update the application.properties file in the src/main/resources directory:

properties
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/wildtrack
spring.datasource.username=postgres
spring.datasource.password=2010

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
### 4. Build and Run the Application
Build the project using Maven:

```bash
mvn clean install
Run the Spring Boot application:
mvn spring-boot:run
```
## 5. Access the Application
- Backend API: http://localhost:8080
- React Frontend (if integrated): http://localhost:3000
 -API Endpoints
- Admin Endpoints
- HTTP Method	Endpoint	Description
- GET	/wildtrack	Fetch all animal records
- POST	/wildtrack	Add a new animal record
- PUT	/wildtrack	Update an animal record
- DELETE	/wildtrack/{id}	Delete an animal by ID
## Directory Structure
```bash
wild-track/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.wildtrack/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   ├── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties
├── target/
├── pom.xml
└── README.md
```
## Future Enhancements
Integrate advanced search and filter options.
Implement user roles with detailed permissions.
Add analytics dashboards for population trends.
Improve frontend visuals with ReactJS and TailwindCSS.
Contributing
Contributions are welcome! Please follow the contribution guidelines.

## License
This project is licensed under the MIT License.

This format will render properly when viewed on GitHub or any Markdown-compatible viewer. Let me know if you need further adjustments!





