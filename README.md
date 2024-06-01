# KGK-Backend

This repository contains a comprehensive RESTful API for a real-time bidding platform built using Node.js, Express, Socket.io, and a PostgreSQL database. The API supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, notifications, and more.

# Getting Started

To get started with this project, follow these steps:

1.  Prerequisites

# Node.js

# PostgreSQL

# Clone the repository: git clone https://github.com/nikitabaladha/KGK-Backend.git

# Navigate to the project directory:

# cd KGK-Backend

2.  Install dependencies:

# npm install

Set up the database:

# Create a PostgreSQL database.

Update the database configuration in the .env file.

# Run database migrations: npm run migrate

# Start the server: npm start

3.  Environment Variables

Ensure to set the following environment variables in a config.json file at the root of the project:

PORT=3000
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret

4.  If you want to test the image upload functionality using Postman, you can use the following steps:

# Open Postman and create a new request.

Set the request method to POST.

Enter the URL for the image upload endpoint, for example: localhost:3001/api/item.

Navigate to the Body tab.

Select form-data as the body type.

Add the required fields for the item (e.g., name, description, starting_price, end_time) as key-value pairs.

For the image field, use the key image and select the file you want to upload by clicking on Select Files.

Once you've filled in all the required fields and selected the image file, click on the Send button to submit the request.

Postman will send the request to your server, and if everything is set up correctly, it should upload the image along with the other data.

You should receive a response from your server with the details of the newly created item, including the URL of the uploaded image.

5.  API Endpoints

# Users:-

- Register a New User

# URL: /api/register

Method: POST
Description: Registers a new user.
Request Body:
username (String, required): Username of the user.
password (String, required): Password of the user.
email (String, required): Email address of the user.
Response: Returns the newly registered user data along with a JWT token.

- Authenticate User

# URL: /api/login

Method: POST
Description: Authenticates a user and returns a JWT token.
Request Body:
username (String, required): Username of the user.
password (String, required): Password of the user.
Response: Returns a JWT token for authenticated user.

- Get User Profile

# URL: /api/profile

Method: GET
Description: Retrieves the profile of the logged-in user.
Authorization: Requires a valid JWT token.
Response: Returns the profile data of the logged-in user.

# Items

- Create New Auction Item

# URL: /api/item

Method: POST
Description: Creates a new auction item.
Authorization: Requires a valid JWT token.

Request Body:
name (String, required): Name of the item.
description (String, required): Description of the item.
starting_price (Decimal, required): Starting price of the item.
end_time (Timestamp, required): End time of the auction.
image (File, optional): Image of the item.
Response: Returns the newly created item data.

- Retrieve All Auction Items

# URL: /api/item

Method: GET
Description: Retrieves all auction items with pagination.
Query Parameters:
page (Number, optional): Page number for pagination (default: 1).
limit (Number, optional): Number of items per page (default: 10).
Response: Returns a list of auction items.

- Retrieve Auction Item by ID

# URL: /api/item/:itemId

Method: GET
Description: Retrieves a single auction item by its ID.
Path Parameters:
itemId (String, required): ID of the item.
Response: Returns the item data.

- Update Auction Item

# URL: /api/item/:itemId

Method: PUT
Description: Updates an auction item by its ID.
Authorization: Requires a valid JWT token and user must be the owner of the item or an admin.
Path Parameters:
itemId (String, required): ID of the item to update.
Request Body: Same as create endpoint.
Response: Returns the updated item data.

- Delete Auction Item

# URL: /api/item/:itemId

Method: DELETE
Description: Deletes an auction item by its ID.
Authorization: Requires a valid JWT token and user must be the owner of the item or an admin.
Path Parameters:
itemId (String, required): ID of the item to delete.
Response: Returns a success message.

# Bids

- Place Bid on Item

# URL: /api/bid/:itemId

Method: POST
Description: Places a new bid on a specific item.
Authorization: Requires a valid JWT token.
Path Parameters:
itemId (String, required): ID of the item to bid on.
Request Body:
bidAmount (Decimal, required): Amount of the bid.
Response: Returns the bid data.

- Retrieve Bids by Item ID

# URL: /api/bid/:itemId

Method: GET
Description: Retrieves all bids for a specific item.
Path Parameters:
itemId (String, required): ID of the item.
Response: Returns a list of bids for the item.

# Notifications

- Retrieve Notifications

# URL: /api/notifications

Method: GET
Description: Retrieves notifications for the logged-in user.
Authorization: Requires a valid JWT token.
Response: Returns a list of notifications.

- Mark Notifications as Read

# URL: /api/notifications-mark-read

Method: POST
Description: Marks notifications as read for the logged-in user.
Authorization: Requires a valid JWT token.
Response: Returns a success message.

# WebSocket Events

Bidding Connection

Description: Establishes a new WebSocket connection.

# Bid

Event: bid
Description: Places a new bid on an item.

# Update

Event: update
Description: Notifies all connected clients about a new bid on an item.

# Notifications

Notify
Event: notify
Description: Sends notifications to users in real-time.

# Please note that all endpoints marked with "Authorization" require a valid JWT token for access.
