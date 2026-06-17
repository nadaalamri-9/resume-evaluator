import { useState } from "react";
import client from "../api/client";

export default function useEvaluator() {
    const [jobDescription, setJobDescription] = useState("");
    const [prompt, setPrompt] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState(null);
    const [result, setResult] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!jobDescription && !file) {
            setStatus("error");
            setErrorMessage("Please enter a job description and upload your resume.");
            return;
        }

        if (!jobDescription) {
            setStatus("error");
            setErrorMessage("Please enter a job description.");
            return;
        }

        if (!file) {
            setStatus("error");
            setErrorMessage("Please upload your resume.");
            return;
        }

        setStatus("loading");

        try {
            const response = await client.post("/evaluate/", {
                job_description: jobDescription,
                prompt,
            });
            setStatus("success");
            setResult(response.data.result);
        } catch (err) {
            setStatus("error");
            setErrorMessage("Evaluation failed. Please try again.");
        }
    }

    return {
        jobDescription,
        setJobDescription,
        prompt,
        setPrompt,
        file,
        setFile,
        status,
        errorMessage,
        result,
        handleSubmit,
    };
}