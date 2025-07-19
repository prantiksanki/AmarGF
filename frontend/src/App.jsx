import React, { useState } from 'react';

function App() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/gemini-cat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            setResponse(data.text);
        } catch (error) {
            console.error(error);
            setResponse('Error generating content');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Gemini Content Generator</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    cols={50}
                    placeholder="Enter your prompt here..."
                />
                <br />
                <button type="submit">Generate</button>
            </form>
            <h3>Response:</h3>
            <p>{response}</p>
        </div>
    );
}

export default App;
