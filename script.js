const form = document.getElementById("Resume-Form");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const jobDescription = document.getElementById("job-description").value;
    const customPrompt = document.getElementById("custom-prompt").value;
    const fileInput = document.getElementById("resume-file");
    const fileName = fileInput.files[0] ? fileInput.files[0].name : null;


    if (!jobDescription && !fileName) {
      document.getElementById("results").textContent = "Please Enter the Job Description and Upload Your Resume.";
      return;
    }

    if (!jobDescription) {
      document.getElementById("results").textContent = "Please Enter the Job Description.";
      return;
    }

    if (!fileName) {
      document.getElementById("results").textContent = "Please Upload Your Resume.";
      return;
    }

    document.getElementById("results").textContent =
    "Evaluating " + fileName + " against the job description... (ChatGPT integration coming in Stage 5)";
  }
);