import express from 'express';
import { blogs, includeBlog1, includeBlog2, includeBlog3 } from '../controllers/blogcontroller';
const router = express.Router();

/* 
BLOG PUBLIC ROUTE - Required No LogIn
*/

router.get('/blogs', blogs);
router.get('/includeBlog1', includeBlog1);
router.get('/includeBlog2', includeBlog2);
router.get('/includeBlog3', includeBlog3);

export default router;