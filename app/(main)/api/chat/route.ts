import axios from 'axios';

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Specify the model
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer sk-mnopqrstuvwxabcdmnopqrstuvwxabcdmnopqrst`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data.choices[0].message);
  } catch (error:any) {
    console.error(error.response?.data || error.message);
    console.log("-----------------------");
    console.log(error);
    console.log("-----------------------");
    
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
