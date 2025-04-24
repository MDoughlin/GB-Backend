import { Request, Response } from "express";
import pool from "../db";

export const getVendors = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM vendors");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching vendors", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createVendor = async (req: Request, res: Response) => {
  const {
    business_name,
    phone_number,
    business_hours,
    instagram_url,
    facebook_url,
    location,
    payment_method,
    order_instructions,
    cuisine_type,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO vendors
    (business_name,
    phone_number,
    business_hours,
    instagram_url,
    facebook_url,
    location,
    payment_method,
    order_instructions,
    cuisine_type
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        business_name,
        phone_number,
        business_hours,
        instagram_url,
        facebook_url,
        location,
        payment_method,
        order_instructions,
        cuisine_type,
      ]
    );
    res.status(201).json(result.rows[0]);
    console.log("Received body:", req.body);
  } catch (err) {
    console.error("Error creating vendor:", err);
    res.status(500).send("Server Error");
  }
};
