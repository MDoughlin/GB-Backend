import express, { Router, Request, Response } from "express";
import { getVendors, createVendor } from "../controllers/vendorControllers";

const router = express.Router();

//get all vendors
router.get("/", getVendors);

//get a single vendor
router.get("/:id", (req, res) => {
  const vendorId = req.params.id;
  res.json({ message: `get vendor with ID: ${vendorId}` });
});

//create a new vendor
router.post("/", createVendor);

//PUT - update vendor

router.put("/:id", (req, res) => {
  const vendorId = req.params.id;
  const updates = req.body;
  res.status(201).json({ message: `Vendor ${vendorId} updated` });
});

//delete - delete vendor
router.delete("/:id", (req, res) => {
  const vendorid = req.params.id;
  res.json({ message: `Vendor ${vendorid} deleted` });
});

export default router;
