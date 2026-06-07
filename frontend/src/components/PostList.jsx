import { useState, useEffect } from 'react';

// axios is a third-party library — install with: npm install axios
// It wraps fetch with a cleaner API and automatic JSON parsing.
import axios from 'axios';

// Defining the URL as a constant outside the component keeps it
// easy to find and change. It also won't be re-created on every render.


const URL = 'https://jsonplaceholder.typicode.com/posts';

export default function PostList() {


const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
// useEffect's callback cannot be async directly.
// An async function returns a Promise, but useEffect expects
// either nothing or a cleanup function — so React would warn.
// Solution: define a named async function inside, then call it.


const fetchPosts = async () => {


try {
// axios.get() returns a Promise that resolves to a response object.
// Unlike fetch, axios automatically:
// 1. Parses the JSON body — no .json() step needed
// 2. Throws an error on 4xx and 5xx status codes


const response = await axios.get(URL);

console.log(response.status);
console.log(response.headers);
console.log(response.ok);

// The actual data array lives at response.data (not response itself).
// .slice(0, 10) trims it to the first 10 items — the API returns 100.
setPosts(response.data.slice(0, 10));
setLoading(false);
} 
catch (err) {
// This catches both network errors and HTTP errors (4xx/5xx).
// With fetch you'd need to check res.ok yourself — axios does it for you.
setError(err.message);
setLoading(false);
}
};
// Define then immediately call — this is the standard pattern.
fetchPosts();

}, []); // empty array = run once on mount

if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
return (
<div>
<h2>Posts</h2>
<ul>
    {posts.map(post => (
    <li key={post.id}>
    <strong>{post.title}</strong>
    <p>{post.body}</p>
    </li>
))}
</ul>
</div>
);

}

