# Tail Trail

Tail Trail is a server-side application built using NestJS. This application is designed to be containerized and served through a Docker container, ensuring a consistent and isolated environment for deployment.
# Working on the Tail Trail Project

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) Check the Dockerfile for the correct version (remember to install pnpm)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

## Setting Up the Project

1. **Clone the Repository**

   git clone <repository-url>
   cd tail-trail

2. **Install Dependencies**

   Use pnpm to install the project dependencies:

   pnpm install

## Running the Project

### Locally

To run the project locally, use one of the following commands:
`pnpm run start:*` <br>
Rreplace `*` picking your desired development command.

### Using Docker

1. **Build the Docker Image**

    `sudo docker build -t tail-trail-server:<tag> .`

2. **Run the Docker Container**

   `docker run -p 3000:3000 tail-trail-server:<tag>`

## Testing
To run the tests, use the following command:
`pnpm run test`

## Project Structure

- `src/`: Contains the source code of the application.
- `test/`: Contains the test files.
- `Dockerfile`: Configuration file for Docker.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: pnpm configuration file.

## Additional Commands

- **Start in Development Mode**
  `pnpm run start:dev`


- **Lint the Code**
  `pnpm run lint`


- **Format the Code**
  `pnpm run format`
