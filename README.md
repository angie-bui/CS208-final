# CS208 Full Stack Final Project - Downtown Donuts

- Name: Angie Bui
- Term: Spring 2026

## Project Description

This is my full-stack application for CS208, built with Node.js, Express, and
MariaDB (MySQL). I built a web application for a small donut shop called
Downtown Donuts that allows customers to view the menu, learn about the shop,
and leave comments. Please read the following instructions carefully because
some of the setup only needs to be done once.

## Install the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running. You
only need to run this script once per Codespace.

```bash
./setup_scripts/install_db.sh
```

## Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, you can access the application by forwarding port 3000. Open the
forwarded port in your browser to view the application.

## Additional Setup Documentation

For more detailed setup and troubleshooting instructions, see
[docs/example_project.md](docs/example_project.md).
