import { useState } from 'react'
import { MediumBlackButton } from '../components/atoms/button'
import { HomeBackground } from '../components/home/background'

export const Practice = () => {
    const [message, setMessage] = useState('')
    const [sentiment, setSentiment] = useState('')

    // "Content-Type: application/json" \
    //   -H "Authorization: Bearer $OPENAI_API_KEY"

    const APIBody = {
        model: 'gpt-4o',
        input: [
            {
                role: 'system',
                content: [
                    {
                        type: 'input_text',
                        text: 'What is the sentiment of this message?' + message,
                    },
                ],
            },
            {
                role: 'user',
                content: [
                    {
                        type: 'input_text',
                        text: 'I loved the new Batman movie!',
                    },
                ],
            },
        ],
        temperature: 1,
        max_output_tokens: 256,
    }

    async function callOpenAI() {
        console.log('Call OpenAI API')
        const res = await fetch('http://localhost:5000/api/sentiment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                console.log(data)
                setSentiment(data.choices[0].message.content.trim())
            })
    }

    console.log(message)

    return (
        <div>
            <HomeBackground>
                practice
                <textarea onChange={(e) => setMessage(e.target.value)} placeholder='Paste your message here' />
                <MediumBlackButton onClick={callOpenAI}>Get the sentiment from OpenAI API</MediumBlackButton>
                {sentiment !== '' ? <h3>This message is: {sentiment}</h3> : null}
            </HomeBackground>
        </div>
    )
}
