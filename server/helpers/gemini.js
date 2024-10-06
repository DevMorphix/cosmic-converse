require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(message, planetInfo, previousContent) {
  // console.log(JSON.stringify(previousContent));
  
  const prompt = `Use the chat memory to remember our previous conversation: ${JSON.stringify(previousContent)} these are our old conversation you have to answer according to these msg take the as uer mamory , if you want you can take this as the memory of your self ${JSON.stringify(planetInfo)}, now  think you are ${planetInfo.name} planet now talk to me as ${planetInfo.name} , this is my question  : ${message} `;
  // console.log(prompt);
  
  // Generate content based on the prompt
  const result = await model.generateContent(prompt);

  // Extract the response
  const response = result.response;

  // Assuming response has a text() method
  const text = response.text ? await response.text() : response;

  // Split the text into an array of lines
  const lines = text.split("\n");

  // remove empty lines
  return lines.filter((line) => line.trim() !== "");

}

module.exports = run;
