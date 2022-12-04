import express, { Request, Response } from "express";
import { SuggestionQueryParams, SuggestionsDto } from "./city/interfaces";
import { getCitySuggestions } from "./city/suggestions";

const router = express.Router();

interface ResponseError {
  error: string;
}

router.get(
  "/suggestions",
  async (
    req: Request<{}, {}, {}, SuggestionQueryParams>,
    res: Response<SuggestionsDto | ResponseError>
  ) => {
    const { q, latitude, longitude } = req.query;
    if (!q) return res.status(400).json({ error: "q param required" });

    const suggestions = await getCitySuggestions(
      q,
      latitude ? parseInt(latitude, 10) : undefined,
      longitude ? parseInt(longitude, 10) : undefined
    );

    return res.status(200).json({ suggestions });
  }
);

export default router;
