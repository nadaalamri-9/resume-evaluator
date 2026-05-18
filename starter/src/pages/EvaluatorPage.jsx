// TODO Day 1: convert your Stage 1 form HTML to JSX
//             (remember: class → className, self-closing tags need />)
// TODO Day 2: add useState for jobDescription, prompt, file, status
//             make the textareas controlled inputs
// TODO Day 3: add errorMessage and result state
//             complete the handleSubmit function with validation and simulated response
//             add conditional rendering to the results area
// TODO Day 5: move all state and logic to src/hooks/useEvaluator.js
//             import and use the hook here instead
import { useState } from 'react'

export default function EvaluatorPage() {

  const [jobDescription, setJobDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') 

  function handleSubmit(e) {
    e.preventDefault()
    if (!jobDescription) { setStatus('error'); return }
    if (!file) { setStatus('error'); return }
    setStatus('loading')
  }

  return (
    <main>
      <section className="form-section">
        <h2>Evaluate a Resume</h2>
        <form onSubmit={handleSubmit}>

            <label htmlFor="job-description">Job Description:</label>
            <br /><br />
            <textarea id="job-description" name="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description here..."
            rows="6"></textarea>

            <br /><br />

            <label htmlFor="custom-prompt">Custom Prompt:</label>
            <br /><br />
            <textarea id="custom-prompt" name="custom-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your custom prompt here..."
            rows="4"></textarea>

            <br /><br />

            <label htmlFor="resume-file">Upload Your Resume:</label>
            <br /><br />
            <input
              type="file"
              id="resume-file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
            <br /><br />

            <button type="submit">Evaluate Resume</button>

          </form>
      </section>

      <section className="results-section">
        <h2>Results</h2>
        <div id="results">
          {status === 'idle' && <p>Results will appear here</p>}
          {status === 'error' && <p>Please fill in all fields and upload a resume.</p>}
          {status === 'loading' && <p>Evaluating...</p>}
        </div>
      </section>
    </main>
  )
}
