import { useState } from 'react'
import './App.css'
import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import Answer from './components/Answer'

function App() {
  const [result, setResult] = useState([])

  const props = {
    name: 'file',
    accept: '.pdf',
    action: 'https://httpbin.org/post', // 🔁 Replace with real backend API
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)

        // 🔁 Simulated backend response structure for testing
        const response = {
          data: [
            {
              compliant: true,
              reports: {
                level: 'ERROR',
                issues: [
                  {
                    type: 'string',
                    diffs: [
                      {
                        expected: 'Expected Value 1',
                        actual: 'Actual Value 1',
                      },
                      {
                        expected: 'Expected Value 2',
                        actual: 'Actual Value 2',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }

        const issues = response.data?.[0]?.reports?.issues || []
        const extractedDiffs = []

        issues.forEach((issue) => {
          issue.diffs?.forEach((diff) => {
            extractedDiffs.push({
              expected: diff.expected,
              actual: diff.actual,
            })
          })
        })

        setResult(extractedDiffs)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload(file) {
      const isPdf = file.type === 'application/pdf'
      if (!isPdf) {
        message.error('You can only upload PDF files!')
      }
      return isPdf
    },
  }

  return (
    <div className="grid grid-cols-5 h-screen text-white bg-zinc-900">
      <div className="col-span-1 bg-zinc-800 p-4">
        <h2 className="text-xl font-bold text-center">AI Chat</h2>
      </div>

      <div className="col-span-4 p-6 flex flex-col justify-between">
        <div className="overflow-y-auto max-h-[80vh]">
          <div className="text-zinc-300">
            <ul className="space-y-4">
              {result.length > 0 ? (
                result.map((item, index) => (
                  <li key={index} className="p-3 rounded-lg bg-zinc-800 border border-zinc-700">
                    <p className="text-green-400 font-medium">
                      Expected: <span className="text-white">{item.expected}</span>
                    </p>
                    <p className="text-red-400 font-medium">
                      Actual: <span className="text-white">{item.actual}</span>
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-center text-zinc-500">Upload a PDF to see results</p>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Upload {...props}>
            <Button icon={<UploadOutlined />} type="primary">
              Upload PDF
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  )
}

export default App
