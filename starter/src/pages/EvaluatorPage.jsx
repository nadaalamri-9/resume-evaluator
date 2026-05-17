// TODO Day 1: convert your Stage 1 form HTML to JSX
//             (remember: class → className, self-closing tags need />)
// TODO Day 2: add useState for jobDescription, prompt, file, status
//             make the textareas controlled inputs
// TODO Day 3: add errorMessage and result state
//             complete the handleSubmit function with validation and simulated response
//             add conditional rendering to the results area
// TODO Day 5: move all state and logic to src/hooks/useEvaluator.js
//             import and use the hook here instead

export default function EvaluatorPage() {
  return (
    <main>
      <section className="form-section">
        <h2>Evaluate a Resume</h2>
        <form id="Resume-Form" method="post">

            <label htmlFor="username">Your Name:</label>
            <br /><br />
            <input type="text" id="username" name="username" placeholder="Enter your name"/>

            <br /><br />

            <label htmlFor="job-description">Job Description:</label>
            <br /><br />
            <textarea id="job-description" name="job-description"
            placeholder="Enter the job description here..."
            rows="6"></textarea>

            <br /><br />

            <label htmlFor="custom-prompt">Custom Prompt:</label>
            <br /><br />
            <textarea id="custom-prompt" name="custom-prompt"
            placeholder="Enter your custom prompt here..."
            rows="4"></textarea>

            <br /><br />

            <label htmlFor="resume-file">Upload Your Resume:</label>
            <br /><br />
            <input type="file" id="resume-file" name="resume-file" accept=".pdf"/>

            <br /><br />

            <button type="submit">Evaluate Resume</button>

          </form>
      </section>

      <section className="results-section">
        <h2>Results</h2>
        <div id="results">
          <div id="results">Results will appear here...</div>
        </div>
      </section>
    </main>
  )
}
