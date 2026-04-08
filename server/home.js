
import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/auth.js';


router.get("/", verifyToken, (req, res) => {
  res.json(`Welcome ${req.user.email} to Home Page 🔥`);
});

export default router;