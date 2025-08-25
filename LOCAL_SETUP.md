# Local Development Setup Guide

This guide will help you set up the KS TV ScoreBoard application locally using Docker for the database.

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Git

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/7AlexZm7/kstv-scoreboard.git
cd kstv-scoreboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://kstv_user:kstv_password@localhost:5432/kstv_scoreboard"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

### 4. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

This will start a PostgreSQL 15 container with:
- Username: `kstv_user`
- Password: `kstv_password`
- Database: `kstv_scoreboard`
- Port: `5432`

### 5. Database Setup

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

### 6. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Useful Commands

### Database Management
```bash
# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Generate Prisma client
npx prisma generate

# View database contents
npx prisma db seed
```

### Docker Management
```bash
# View running containers
docker ps

# View logs
docker-compose logs postgres

# Stop containers
docker-compose down

# Remove containers and volumes
docker-compose down -v
```

### Application Commands
```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Troubleshooting

### Database Connection Issues

If you get connection errors:

1. **Check if PostgreSQL is running:**
   ```bash
   docker-compose ps
   ```

2. **Check database logs:**
   ```bash
   docker-compose logs postgres
   ```

3. **Verify connection string:**
   Ensure your `DATABASE_URL` in `.env.local` matches the Docker configuration.

4. **Restart PostgreSQL:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Port Already in Use

If port 5432 is already in use:

1. **Find the process:**
   ```bash
   # Windows
   netstat -ano | findstr :5432
   
   # Linux/Mac
   lsof -i :5432
   ```

2. **Change the port in docker-compose.yml:**
   ```yaml
   ports:
     - "5433:5432"  # Use 5433 instead of 5432
   ```

3. **Update DATABASE_URL:**
   ```env
   DATABASE_URL="postgresql://kstv_user:kstv_password@localhost:5433/kstv_scoreboard"
   ```

### Prisma Issues

If Prisma commands fail:

1. **Install Prisma CLI globally:**
   ```bash
   npm install -g prisma
   ```

2. **Reset Prisma:**
   ```bash
   npx prisma migrate reset
   ```

3. **Regenerate client:**
   ```bash
   npx prisma generate
   ```

## Alternative Setup (Without Docker)

If you prefer to use a local PostgreSQL installation:

1. Install PostgreSQL locally
2. Create a database named `kstv_scoreboard`
3. Update `DATABASE_URL` in `.env.local` with your local PostgreSQL credentials
4. Run Prisma migrations: `npx prisma migrate dev`

## Verification

After setup, you should be able to:

1. Access the application at [http://localhost:3000](http://localhost:3000)
2. Register a new account
3. Create a scoreboard
4. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

## Development Workflow

1. **Start the database:** `docker-compose up -d`
2. **Start the development server:** `npm run dev`
3. **Make changes to code**
4. **Database changes:** `npx prisma migrate dev`
5. **Restart services as needed**

For questions or issues, please check the GitHub repository or open an issue.