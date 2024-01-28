# employee-app
employee-app demo

## Steps to Setup the Spring Boot Back end app (backend-server)

1. **Clone the application**

	```bash
	git clone https://github.com/shekharchauhan100/employee-app
	cd server
	```

2. **Create MySQL database**

	```bash
	create database employee
	```

3. **Change MySQL username and password as per your MySQL installation**

	+ open `src/main/resources/application.properties` file.

	+ change `spring.datasource.username` and `spring.datasource.password` properties as per your mysql installation

4. **Run the app**

	You can run the spring boot app by typing the following command -

	```bash
	mvn spring-boot:run
	```

	The server will start on port 8080.

## Steps to Setup the React Front end app (frontend)

First go to the `frontend` folder -

```bash
cd frontend
```

Then type the following command to install the dependencies and start the application -

```bash
npm install && npm start
```

The front-end server will start on port `3000`.

## Step to access the Swagger 

	After backend server up then access the api with the below url

	```http://localhost:8080/swagger-ui/index.html```