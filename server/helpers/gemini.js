require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function run(message) {
//   const prompt = `Talk me as Mars${message}`;
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = await response.text();
//   return text;
// }
// module.exports = run;

async function run(message, planetInfo, previousContent) {
  const prompt = `Talk to me as ${planetInfo.name}: ${message} - ${previousContent}`;

  // Generate content based on the prompt
  const result = await model.generateContent(prompt);

  // Extract the response
  const response = result.response;

  // Assuming response has a text() method
  const text = response.text ? await response.text() : response;

  // Split the text into an array of lines
  const lines = text.split("\n");

  return lines;
}

module.exports = run;
