# Dockerized Identity Server Test (DIST) Notes Web App

This project is the web application that will be used to test out a new IdentityServer4 system that runs in a Docker environment. It is built on NodeJS with Express, KnockoutJS for the view layer, and uses MongoDB as the database.

## Local Development

You'll need Docker and Docker-Compose installed on your local machine. Run the following command to start the system

```bash
docker-compose up
```

The NodeJS app will run on port 3000 with a MongoDB container back-end. You can access the site in a browser at http://localhost:3000.
