import { useState } from 'react'
import './App.css'
import { URL } from './constatnts'
import Answer from './components/Answer'

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(undefined)

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  }

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    response = await response.json()
    let dataString = response.candidates[0].content.parts[0].text
    dataString = dataString
      .split('*')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)

    setResult(dataString)
    setQuestion('')
  }

  return (
    <div className="grid grid-cols-5 h-screen text-white bg-zinc-900">
      <div className="col-span-1 bg-zinc-800 p-4">
        {/* Sidebar content (if any) */}
        <h2 className="text-xl font-bold text-center">AI Chat</h2>
      </div>

      <div className="col-span-4 p-6 flex flex-col justify-between">
        <div className="overflow-y-auto max-h-[80vh]">
          <div className="text-zinc-300">
            <ul className="space-y-2">
              {result &&
                result.map((item, index) => (
                  <li key={index} className="text-left p-1">
                    <Answer ans={item} />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-zinc-800 w-3/4 m-auto p-2 pr-4 text-white rounded-2xl border border-zinc-700 flex h-14 items-center">
            <input
              type="text"
              className="w-full h-full bg-transparent p-3 outline-none text-white"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={askQuestion}
              className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium text-sm"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
