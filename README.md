# Day 2: REST API Basics

## Overview
Practiced REST API fundamentals using Node.js built-in HTTP module.

## Concepts Covered
- URL parsing using the `URL` class
- Query parameters using `url.searchParams.get()`
- Filtering array data using JavaScript `filter()`
- Combining multiple filters
- Handling HTTP status codes: `200 OK` and `404 Not Found`
- Sending JSON responses using `JSON.stringify()`

## API Implemented

**GET `/products`**
- Returns all products.

**GET `/products?category=shoes`**
- Filters products by category.

**GET `/products?name=Nike`**
- Filters products by name.

**GET `/products?category=shoes&name=Nike`**
- Applies category and name filters together.

**Unknown routes**
- Returns a `404 Not Found` response.

## Key Learning
Learned how to parse query parameters, apply multiple filters sequentially, and handle unknown routes in a Node.js HTTP server.

## Technologies
- JavaScript
- Node.js
- HTTP module
- REST API fundamentals
