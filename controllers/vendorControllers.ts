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

export const updateVendor = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;
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
      `UPDATE vendors SET
        business_name = $1,
        phone_number = $2,
        business_hours = $3,
        instagram_url = $4,
        facebook_url = $5,
        location = $6,
        payment_method = $7,
        order_instructions = $8,
        cuisine_type = $9
      WHERE id = $10
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
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ error: "Failed to update vendor" });
  }
};
