#Blog Analytics and Blog Search application

this Express.js application serve as a blog analytics and search tool, utilizing Lodash for data analysis and Express middleware for data retrieval. It offers insightful statistics based on data fetched from a third-party blog API and provides a search functionality.

## How to Use

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server with `npm start` or `npm run dev`.
4. Access the API using endpoints described above.

## Hosted Link 
- I have also hosted this on render
- https://blogsearchanalytics.onrender.com

## Port Number

- The server runs on port `4000` by default. You can change it in the `app.js` file.

## Functionality

### 1. Data Retrieval

- Endpoint: `/api/blog-stats`
- Description: This route fetches data from the provided third-party blog API using a `GET` request.

**Curl Request:**
```bash
curl --request GET \
  --url https://intent-kit-16.hasura.app/api/rest/blogs \
  --header 'x-hasura-admin-secret: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
```

### 2. Data Analysis

- Total number of blogs fetched.
- Blog with the longest title.
- Number of blogs with titles containing the word "privacy."
- Array of unique blog titles (no duplicates).

### 3. Response

- Responds with a JSON object containing the following statistics:

<==============json object====================>
{
  "totalBlogs": 461,
  "longestBlog": "After 24 days at the box office, Sunny Deol's action film Gadar 2 became the second Hindi film to gross over ₹500 crore",
  "privacyBlogs": 4,
  "uniqueTitles": [collection of blogs].
}

### 4. Blog Search Endpoint

- Endpoint: `/api/blog-search`
- Description: This route accepts a query parameter (`/api/blog-search?query=how to`) and filters the blogs based on the provided query string (case-insensitive).

### 5. Error Handling

- Handles errors during data retrieval, analysis, or search process. Provides appropriate error messages. Implemented by extending Error class and using Error middleware

### 6. Bonus Challenge (Caching Mechanism)

- I have also Implemented bonus challenge using Lodash's `memoize` function.
- It Caches analytics results and search results for a certain period (default: 1 hour).
- If the same requests are made within the caching period, returns cached results instead of re-fetching and re-analyzing the data.

## Author

[Mohd Warish]

## Purpose 

assignment for backend development at SubSpace.
