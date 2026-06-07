import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AxiosFilter() {

// users holds the FULL list from the API — we never modify this.
// Think of it as the source of truth.
const [users, setUsers] = useState([]);

// query tracks what the user has typed in the search box.
// Every keystroke updates this value and triggers a re-render.

const [query, setQuery] = useState('');

const [loading, setLoading] = useState(true); 

const [error, setError] = useState(null);


useEffect(
    
() => {

axios.get('https://jsonplaceholder.typicode.com/users')
.then((res) => { 
    setUsers(res.data); 
    setLoading(false)
})
.catch((err) =>{ 
    setError(err.message);
    setLoading(false);
});

// No loading/error state here to keep the example focused. (Add it)
// In production you'd want both.
}, []);


// --- DERIVED STATE (not useState!) ---
// filtered is a plain variable, not state.
// React re-runs this entire function body on every render,
// so filtered is always recalculated from the latest query and users.
// Storing it in useState would mean two sources of truth — avoid that.


const filtered = users.filter(user =>
// Search name OR email — the || means either match works.

user.name.toLowerCase().includes(query.toLowerCase())


// .toLowerCase() on both sides makes the search case-insensitive.
// 'Alice' and 'alice' and 'ALICE' all match a query of 'alice'.
|| user.email.toLowerCase().includes(query.toLowerCase())
);

if (loading) return <p>Loading...</p>;
if (error)   return <p style={{color: 'red'}}>Error: {error}</p>;


return (


<div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
<input
type='text'
placeholder='Search by name or email...'
// Controlled input: value is always driven by React state.
// This keeps the input and query perfectly in sync.
value={query}

// e.target.value is the current text in the input box.
// Calling setQuery with it re-renders the component,
// which recalculates filtered with the new query.
onChange={e => setQuery(e.target.value)}
style={{ width: '100%', padding: 8, marginBottom: 8 }}
/>
{/* Only show Clear button when the user has typed something. */}
{/* Clicking it resets query to '' which shows all users again. */}
{query && (
<button onClick={() => setQuery('')}>Clear</button>
)}
{/* Result count — updates live as the user types. */}
<p style={{ color: '#64748B', fontSize: 13 }}>
Showing {filtered.length} of {users.length} users
</p>
{/* Conditional rendering: show empty state or the list. */}
{/* filtered.length === 0 means no matches for the current query. */}
{

filtered.length === 0 ? (
<p>No results found for '{query}'</p>
) : (
<ul>
{filtered.map(user => (
<li key={user.id}>
<strong>{user.name}</strong>
<br />
<small>{user.email}</small>
</li>
))}
</ul>
)}
</div>
);
}