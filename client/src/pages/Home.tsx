import { useState } from 'react'
import { MediumBlackButton } from '../components/atoms/button'
import { Background } from '../components/home'

export const Home = () => {
    const [message, setMessage] = useState('')
    const [sentiment, setSentiment] = useState('')

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

    return (
        <div>
            <Background>
                <h1>TARI</h1>
                <textarea onChange={(e) => setMessage(e.target.value)} placeholder='Paste your message here' />
                <MediumBlackButton onClick={callOpenAI}>Get the sentiment from OpenAI API</MediumBlackButton>
                {sentiment !== '' ? <h3>This message is: {sentiment}</h3> : null}
            </Background>
        </div>
    )
}
