## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

A step-by-step series of examples that tell you how to get a development environment running:

1. **Clone the repository**

   ```bash
   git clone https://github.com/toluelemson/react-library.git
   cd react-library/app
   ```

2. **Build and run the containers**

   Use Docker Compose to build and start the services defined in your `docker-compose.yml`:

   ```bash
   docker-compose up --build
   ```

   This command builds the Docker images for both the React application and the API server and starts the containers. The `--build` option ensures that Docker builds the images before starting the containers, which is useful for the first time setup or when you make changes to the Dockerfiles.

3. **Accessing the application**

    - The React application will be accessible at [http://localhost:8080](http://localhost:8080)
    - The API server will be accessible at [http://localhost:8081](http://localhost:8081)