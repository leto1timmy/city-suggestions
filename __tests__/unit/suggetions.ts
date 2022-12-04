import { getCitySuggestions } from "../../src/city/suggestions";

describe("Test getCitySuggestions", () => {
  it("should return 5 items", async () => {
    const suggestions = await getCitySuggestions("saint");
    expect(suggestions.length).toEqual(5);
  });
});
