# employee-app
employee-app demo

## Steps to Setup the Spring Boot Back end app (backend-server)

1. **Clone the application**

After clone the application install the `jdk 17` for download please follow the link `https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html`

	```bash
	git clone https://github.com/shekharchauhan100/employee-app
	cd backend
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


## Steps to login the app after backend and frontend server start

When the react application is start login page is open for login the application please use the below credential 
`UserName: admin`
`Password: admin`

## Step to access the Swagger 

After backend server up then access the api with the below url

`http://localhost:8080/swagger-ui/index.html`