import { useState } from 'react'
import { MediumBlackButton } from '../components/atoms/button'
import { Background } from '../components/home'
import FileDropzone from '../components/FileDropzone'
import { useFile } from '../components/FileContext'
import { Bars } from '@agney/react-loading'
import ActionList from '../components/atoms/ActionItems'

interface ActionItem {
    task: string
    assignee: string
    deadline: string
}

export const Home = () => {
    const [message, setMessage] = useState('')
    const [sentiment, setSentiment] = useState('')
    const { fileContent } = useFile()
    const [loading, setLoading] = useState(false)
    const [actionItems, setActionItems] = useState<any[]>([])

    async function callOpenAI() {
        console.log('Call OpenAI API')

        // Prefer the file content if available, otherwise use the textarea input
        const textToAnalyze = fileContent || message

        if (!textToAnalyze) {
            alert('Please upload a .txt file or enter text before submitting.')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('http://localhost:5000/api/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: textToAnalyze }),
            })

            const data = await res.json()
            console.log(data)

            const content = data.choices[0].message.content.trim()
            setSentiment(content)

            const cleanedContent = content
                .replace(/```json\s*/g, '') // remove ```json
                .replace(/```/g, '') // remove ending ```
                .trim()

            const parsed = JSON.parse(cleanedContent)

            try {
                if (Array.isArray(parsed)) {
                    setActionItems(parsed)
                    console.log('✅ Parsed Action Items:', parsed)
                } else {
                    console.warn('⚠️ API response was not an array:', parsed)
                    setActionItems([])
                }
            } catch (err) {
                console.error('❌ Failed to parse JSON:', err)
                setActionItems([])
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Background>
                <h1>TAERI</h1>
                {/* <textarea onChange={(e) => setMessage(e.target.value)} placeholder='Paste your message here' /> */}
                <FileDropzone />
                <MediumBlackButton onClick={callOpenAI}>
                    {loading ? (
                        <div style={{ width: 24, height: 20 }}>
                            <Bars />
                        </div>
                    ) : (
                        <h1>Get action items</h1>
                    )}
                </MediumBlackButton>
                {actionItems.length > 0 && (
                    <>
                        <ActionList items={actionItems} />
                        <div>Length: {actionItems.length}</div>
                    </>
                )}
                {sentiment !== '' ? <p>{sentiment}</p> : null}
            </Background>
        </div>
    )
}
