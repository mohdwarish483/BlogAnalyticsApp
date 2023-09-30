import express from "express";
import {
  memoizedFetchBlogs,
  memoizedAnalyzeBlogs,
} from "../middlewares/blogApiMiddleware.js";
import { CustomError } from "../middlewares/errorMiddleware.js";

const router = express.Router();

// Route to get statistics of blogs
router.get("/blog-stats", async (req, res, next) => {
  try {
    const blogs = await memoizedFetchBlogs();
    const statistics = memoizedAnalyzeBlogs(blogs);
    res.json(statistics);
  } catch (error) {
    next(new CustomError("Error fetching or analyzing blogs", 500));
  }
});

// Route to search for blogs based on a query
router.get("/blog-search", async (req, res, next) => {
  const { query } = req.query;
  const SearchedQuery = query.toLowerCase();

  try {
    const blogs = await memoizedFetchBlogs();

    // Filter blogs based on the search query
    const searchResults = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(SearchedQuery)
    );
    const length = searchResults.length;
    if (length) {
      const result = {
        message: `total ${length} blogs found matching with your query : ${query}`,
        blogs: searchResults,
      };
      res.json(result);
    } else {
      const result = {
        message: `No blogs matching with your searched query: ${query}`,
      };
      // send 404 status if no results were found
      res.status(404).json(result);
    }
  } catch (error) {
    next(new CustomError("Error searching blogs", 500));
  }
});

export default router;
