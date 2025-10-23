export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateApiKey(apiKey: string | undefined): ValidationResult {
  if (!apiKey) {
    return {
      isValid: false,
      error: "OpenAI API key is not configured",
    };
  }

  if (!apiKey.startsWith("sk-")) {
    return {
      isValid: false,
      error: "Invalid API key format",
    };
  }

  if (apiKey.length < 20) {
    return {
      isValid: false,
      error: "API key appears to be invalid",
    };
  }

  return { isValid: true };
}
