import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AIJobsFilter () {

const [query, setQuery] = useState('');

const [loading, setLoading] = useState(true); 

const [error, setError] = useState(null);

const [AIJobs, setAIJobs] = useState([]);

useEffect(
    
() => {

axios.get('https://aidevboard.com/api/v1/jobs')
.then((res) => { 
    setAIJobs(res.data.jobs);   
     setLoading(false)
})
.catch((err) =>{ 
    setError(err.message);
    setLoading(false);
});
}, []);



const filtered = AIJobs.filter(AIJobs =>
  AIJobs.title.toLowerCase().includes(query.toLowerCase())
);

if (loading) return <p>Loading...</p>;
if (error)   return <p style={{color: 'red'}}>Error: {error}</p>;


return (


<div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
<input
type='text'
placeholder='Search by title, location, workplace, job_type, experience_level or tags ...'
value={query}


onChange={e => setQuery(e.target.value)}
style={{ width: '100%', padding: 8, marginBottom: 8 }}
/>

{query && (
<button onClick={() => setQuery('')}>Clear</button>
)}

<p style={{ color: '#64748B', fontSize: 13 }}>
Showing {filtered.length} of {AIJobs.length} Jobs
</p>

{filtered.length === 0 ? (
<p>No results found for '{query}'</p>
) : (
<ul>
{filtered.map(job => (
  <li key={job.id}>
    <strong>Title: {job.title}</strong>
    <p>Location: {job.location}</p>
    <p>Work Place: {job.workplace}</p>
    <p>Job Type: {job.job_type}</p>
    <p>Experience Level: {job.experience_level}</p>
    <p>Tags: {job.tags?.join(', ')}</p>
  </li>
))}
</ul>
)}
</div>
);
}


