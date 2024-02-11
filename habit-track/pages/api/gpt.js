const BASE_URL = 'https://api.openai.com/v1';

export default async function handler(req, res) {
  try {
    // Async logic here
    const message = req.body.message
    const data = await fetchData(message); // Example: fetching data asynchronously
    console.log(data.choices[0].message.content)
    res.status(200).json(data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function fetchData(message) {
  // Async function to fetch data
  const apiRequestBody = {
    "model": "gpt-3.5-turbo",
    "messages": [
      { role: "system", content: message }
    ],
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Accessing environment variable
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  });
  const data = await response.json();
  return data;
}