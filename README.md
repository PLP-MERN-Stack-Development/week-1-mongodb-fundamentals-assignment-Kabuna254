# MongoDB Week 1 Project — PLP Bookstore

## Overview

This project demonstrates the fundamentals of MongoDB including database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing using a sample bookstore database.

---

## Project Structure

- `insert_books.js` — Script to insert 10 sample book documents into the `books` collection.
- `queries.js` — MongoDB queries for CRUD operations, filtering, sorting, pagination, and aggregation.
- Screenshots of MongoDB Compass/Atlas showing collections and sample data.

---

## Prerequisites

- MongoDB Community Edition installed locally **OR** a MongoDB Atlas cluster set up.
- Access to `mongosh` (MongoDB Shell) or MongoDB Compass.

---

## How to Run

### 1. Setup Database & Collection

Open `mongosh` and run:


use plp_bookstore


### 2. Insert Sample Data
Load the insert script to populate the books collection:

`load("insert_books.js")`
Or copy-paste the contents of insert_books.js directly in the shell.

### 3. Run Queries
Load and run all queries from queries.js:

`load("queries.js")`
You can also run queries individually in the shell or via MongoDB Compass.