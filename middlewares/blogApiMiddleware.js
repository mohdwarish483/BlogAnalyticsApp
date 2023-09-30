import _ from "lodash";
import fetch from "node-fetch";
import { CustomError } from "../middlewares/errorMiddleware.js";

// Cached data initially set to null
let cachedBlogs = null;
let cachedStats = null;

// Function to fetch blogs from the API
const fetchBlogs = async () => {
  if (!cachedBlogs) {
    const options = {
      method: "GET",
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    };

    try {
      const response = await fetch(
        "https://intent-kit-16.hasura.app/api/rest/blogs",
        options
      );

      // If the response is not successful, throw a error with status
      if (!response.ok) {
        throw new CustomError(
          `API returned ${response.status}`,
          response.status
        );
      }
      const fetchedResult = await response.json();
      cachedBlogs = fetchedResult.blogs;

      // setTimeout for Clearing cachedBlogs after 1 hour
      setTimeout(() => {
        cachedBlogs = null;
      }, 60 * 60 * 1000);
    } catch (error) {
      throw new CustomError(
        "Error fetching blogs from the third-party API",
        500
      );
    }
  }
  return cachedBlogs;
};

// Function to analyze blogs and calculate statistics
const analyzeBlogs = (blogs) => {
  if (!cachedStats) {
    const totalBlogs = _.size(blogs);
    const longestBlog = _.maxBy(blogs, (blog) => blog.title.length);
    const privacyBlogs = _.filter(blogs, (blog) =>
      _.includes(blog.title.toLowerCase(), "privacy")
    );
    const uniqueTitles = _.uniqBy(blogs, "title");
    // stats data to be sent
    cachedStats = {
      totalBlogs,
      longestBlog: longestBlog.title,
      privacyBlogs: _.size(privacyBlogs),
      uniqueTitles: _.map(uniqueTitles, "title"),
    };

    // Clear cachedStats after 1 hour
    setTimeout(() => {
      cachedStats = null;
    }, 60 * 60 * 1000);
  }
  return cachedStats;
};

// Memoize the fetchBlogs and analyzeBlogs functions for caching the results
const memoizedFetchBlogs = _.memoize(fetchBlogs);
const memoizedAnalyzeBlogs = _.memoize(analyzeBlogs);

export { memoizedFetchBlogs, memoizedAnalyzeBlogs };
