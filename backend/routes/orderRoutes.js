import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";


import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";


const router = express.Router();

router.post("/", protect, createOrder);
router.get("/admin/all",protect,adminOnly,getAllOrders);

router.get("/my-orders", protect, getMyOrders);
router.put( "/admin/:id/status", protect, adminOnly, updateOrderStatus );
router.get("/:id", protect, getOrderById);


export default router;