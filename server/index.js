import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.post('/api/sentiment', async (req, res) => {
  const { message } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Analyze the sentiment of this message.' },
          { role: 'user', content: message },
        ],
      }),
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'))