// TODO Day 1: convert your Stage 1 form HTML to JSX
//             (remember: class → className, self-closing tags need />)
// TODO Day 2: add useState for jobDescription, prompt, file, status
//             make the textareas controlled inputs
// TODO Day 3: add errorMessage and result state
//             complete the handleSubmit function with validation and simulated response
//             add conditional rendering to the results area
// TODO Day 5: move all state and logic to src/hooks/useEvaluator.js
//             import and use the hook here instead

import useEvaluator from "../hooks/useEvaluator";

export default function EvaluatorPage() {
  const {
    jobDescription,
    setJobDescription,
    prompt,
    setPrompt,
    status,
    errorMessage,
    result,
    handleSubmit,
    setFile,
  } = useEvaluator();

  return (
    <main>
      <section className="form-section">
        <h2>Evaluate a Resume</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="job-description">Job Description:</label>

          <textarea
            id="job-description"
            name="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description here..."
            rows="6"
          ></textarea>

          <label htmlFor="custom-prompt">Custom Prompt:</label>

          <textarea
            id="custom-prompt"
            name="custom-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your custom prompt here..."
            rows="4"
          ></textarea>

          <label htmlFor="resume-file">Upload Your Resume:</label>

          <input
            type="file"
            id="resume-file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />

          <button type="submit" disabled={status === "loading"}>
            Evaluate Resume
          </button>
        </form>
      </section>

      <section className="results-section">
        <h2>Results</h2>

        <div id="results">
          {status === "idle" && (
            <div className="empty-state">
              <strong>No evaluation yet</strong>
              <p>
                Add a job description, upload a PDF resume, then start the
                evaluation.
              </p>
            </div>
          )}

          {status === "loading" && (
            <div className="loading-state">
              <strong>Evaluating...</strong>
              <p>We are analyzing the resume against the job description.</p>
            </div>
          )}

          {status === "error" && (
            <div className="error-state">
              <strong>Error</strong>
              <p>{errorMessage}</p>
            </div>
          )}

          {status === "success" && (
            <div className="result-card">
              {result.split("\n").map((line, index) => (
                <p key={index}>{line.replace(/\*\*/g, "")}</p>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}