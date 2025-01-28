# Express TypeScript API with Prisma and MySQL

A RESTful API built with Express.js, TypeScript, Prisma, and MySQL, featuring users, posts, and comments functionality.

## Prerequisites

- Docker and Docker Compose
- Node.js (v22 or higher)
- npm
- Git

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/frbarbre/node-mysql-ts-example.git
cd node-mysql-ts-example
npm install
```

2. Set up environment variables:

   - Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   - Configure the following variables in `.env`:

   ```
   PORT=8000
   DATABASE_URL="mysql://root:your_password@mysql:3306/mydatabase"
   ```

3. Generate Prisma Client:

   ```bash
   npm run prisma:generate
   ```

4. Development Mode

   To run the project in development mode with hot-reload:

   ```bash
   docker-compose -f docker-compose-dev.yml up --build
   ```

   This will:

   - Start the Node.js server with hot-reload
   - Set up MySQL database
   - Initialize database schema using Prisma
   - Mount local files for development

5. Production Testing

   To test the production build:

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the TypeScript code
   - Start the Node.js server in production mode
   - Set up MySQL database
   - Initialize database schema using Prisma

## API Endpoints

The API includes endpoints for:

- Users: CRUD operations
- Posts: CRUD operations with user relationships
- Comments: CRUD operations with post relationships

API documentation is available via Bruno collection in the `/bruno` directory.

## Database Schema

The database includes three main tables (defined in Prisma schema):

- users: Store user information (name, email, title, image)
- posts: Store post content with user relationships
- comments: Store comments with post relationships

## Prisma Development Tools

For database development:

- Generate Prisma Client after schema changes

```bash
npm run prisma:generate
```
**All other migrations will be applied in the Docker Containers**

## Troubleshooting

Common issues:

1. Database Connection Issues:

   - Ensure MySQL container is healthy
   - Verify DATABASE_URL in .env
   - Check if port 3306 is available

2. Node.js Server Issues:

   - Verify PORT environment variable
   - Check if port 8000 is available
   - Review server logs using `docker-compose logs node`

3. Prisma Issues:
   - Ensure Prisma Client is generated (`npm run prisma:generate`)
   - Check if DATABASE_URL is correctly formatted
   - Verify schema syntax in `schema.prisma`

## Development

The project uses:

- TypeScript for type safety
- Express.js for the web server
- Prisma for database ORM
- MySQL for the database
- Docker for containerization

```

```
