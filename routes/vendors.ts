import express from "express";
import { Request, Response } from "express";
import {
  getVendors,
  createVendor,
  getVendorById,
  deleteVendor,
} from "../controllers/vendorControllers";

import { updateVendor } from "../controllers/vendorControllers";

const router = express.Router();

// Get all vendors
router.get("/", getVendors);

//Get Vendor by ID
router.get("/:id", function (req, res) {
  getVendorById(req, res);
});

// Create a new vendor
router.post("/", createVendor);

// Update a vendor by id
router.put("/:id", function (req, res) {
  updateVendor(req, res);
});

// Delete vendor
router.delete("/:id", (req, res) => {
  const vendorId = req.params.id;
  res.json({ message: `Vendor ${vendorId} deleted` });
});

export default router;
