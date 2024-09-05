
## Endpoints

### 1. User Authentication

#### Register a New User
- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
Response: User registration success message or error.
User Login
URL: /login
Method: POST
Description: Logs in an existing user.
Request Body:
{
  "email": "string",
  "password": "string"
}
Response: JWT token or error.
Google Login
URL: /google-login
Method: POST
Description: Logs in using Google OAuth.
Request Body: Google authentication token.
Response: JWT token or error.
2. Coin Data (Authenticated Routes)
Fetch Coin List
URL: /coins
Method: GET
Description: Retrieves a list of available coins.
Response: List of coins.
Fetch Coin Detail
URL: /coins/:name
Method: GET
Description: Retrieves details of a specific coin.
URL Parameters:
name: The name of the coin.
Response: Coin details.
Fetch Historical Price Data
URL: /coins/:name/historical-price-data
Method: GET
Description: Retrieves historical price data for a specific coin.
URL Parameters:
name: The name of the coin.
Response: Historical price data.
Run Gemini Analysis
URL: /coins/:name/analysis
Method: POST
Description: Runs analysis on the specified coin.
URL Parameters:
name: The name of the coin.
Request Body: Analysis options (if any).
Response: Analysis results.
3. Portfolio Management (Authenticated Routes)
Fetch My Portfolio
URL: /my-portfolio
Method: GET
Description: Retrieves the user's portfolio.
Response: User portfolio details.
Add a Portfolio
URL: /portfolio/:name
Method: POST
Description: Adds a new coin to the user's portfolio.
URL Parameters:
name: The name of the coin.
Request Body:
{
  "quantity": "number",
  "purchasePrice": "number"
}
Response: Portfolio addition success message or error.
Edit Portfolio Notes
URL: /portfolio/:portfolioId
Method: PATCH
Description: Edits notes for a specific portfolio item.
URL Parameters:
portfolioId: The ID of the portfolio item.
Request Body:
json
Salin kode
{
  "notes": "string"
}
Response: Notes update success message or error.
Delete Portfolio
URL: /portfolio/:portfolioId
Method: DELETE
Description: Deletes a specific portfolio item.
URL Parameters:
portfolioId: The ID of the portfolio item.
Response: Deletion success message or error.