import { Suggestion } from "../types";

export interface SuggestionQueryParams {
  q: string;
  latitude?: string;
  longitude?: string;
}

export interface SuggestionsDto {
  suggestions: Suggestion[];
}
