import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanString(input: string) {
  // Trim whitespace from the start and end
  let trimmed = input.trim();

  // Remove quotes from the start if they exist
  if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
    trimmed = trimmed.slice(1);
  }

  // Remove quotes from the end if they exist
  if (trimmed.endsWith('"') || trimmed.endsWith("'")) {
    trimmed = trimmed.slice(0, -1);
  }

  return trimmed;
}

export const sanitizePrompt = (prompt: any) => {
  console.log("PROMPT", prompt);
  let input = Array.isArray(prompt)
    ? // @ts-ignore
      prompt.map((p) => p.value || prompt.title).join(",")
    : typeof prompt === "object"
    ? prompt.value || prompt.label || prompt.accepted_message || prompt.title
    : prompt;

  let userText = Array.isArray(prompt)
    ? prompt
        .map(
          (p) =>
            p.accepted_message ||
            p.display_message ||
            p.label ||
            // @ts-ignore
            prompt.title ||
            p.value
        )
        .join(", ")
    : typeof prompt === "object"
    ? prompt.accepted_message ||
      prompt.display_message ||
      prompt.value ||
      prompt.label ||
      prompt.title
    : prompt;

  return { input, userText };
};

export function formatString(input: string) {
  // Replace underscores with spaces
  let result = input.replace(/_/g, " ");

  // Capitalize the first letter of the result
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}