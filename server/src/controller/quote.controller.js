import { Quote } from "../models/quote.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { pickFields } from "../utils/pickFields.js";

const required_fields = [
  "from",
  "where",
  "deliver_item",
  "weight_item",
  "delivery_type",
  "username",
  "phone_number",
];

const allowed_fields = [...required_fields];

/**
 * CREATE QUOTE
 */
export const postQuoteData = asyncHandler(async (req, res) => {
  const missingFields = required_fields.filter((field) => !req.body[field]);

  if (missingFields.length) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields,
    });
  }

  const quote = await Quote.create(pickFields(req.body, allowed_fields));

  res.status(201).json({
    success: true,
    data: quote,
  });
});

/**
 * GET ALL QUOTES
 */
export const getAllQuotes = asyncHandler(async (_req, res) => {
  const quotes = await Quote.findAll();

  res.status(200).json({
    success: true,
    count: quotes.length,
    data: quotes,
  });
});

/**
 * UPDATE QUOTE
 */
export const updateQuote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const quote = await Quote.findByPk(id);
  if (!quote) {
    return res.status(404).json({ message: "Quote not found" });
  }
  const updateData = pickFields(req.body, allowed_fields);
  if (!Object.keys(updateData).length) {
    return res.status(400).json({
      message: "No valid fields to update",
    });
  }

  await quote.update(updateData);

  res.status(200).json({
    success: true,
    data: quote,
  });
});

/**
 * DELETE QUOTE
 */
export const deleteQuote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const quote = await Quote.findByPk(id);
  if (!quote) {
    return res.status(404).json({ message: "Quote not found" });
  }

  await quote.destroy();

  res.status(200).json({
    success: true,
    message: "Quote deleted successfully",
  });
});
