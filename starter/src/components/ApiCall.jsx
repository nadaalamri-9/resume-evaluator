
import { useState, useEffect } from 'react';

function ApiCall(){

 // --- STATE ---
// users: the array of data returned from the API. Starts empty.
const [users, setUsers] = useState([]);  
// loading: true while the request is in-flight.
// We use this to show a 'Loading...' message instead of an empty list.
const [loading, setLoading] = useState(true);
// error: stores the error message if the request fails.
// null means 'no error yet'.
const [error, setError] = useState(null);


// --- FETCHING DATA ---
// useEffect runs AFTER the component first renders.
// The empty array [] is the dependency list — it means
// 'only run this effect once, when the component mounts'.
// Without [], this would re-run every single render (infinite loop).
useEffect(() => {

fetch('https://jsonplaceholder.typicode.com/users')


// fetch() only rejects on a network failure (e.g. no internet).
// A 404 or 500 response still RESOLVES — res.ok catches those.

.then(res => {
if (res.ok== false){
    
    throw new Error('Network response was not ok');
}

// .json() reads the response body and parses it as JSON.
// It also returns a Promise, so we return it to chain the next .then.
return res.json();
})
// data is now the parsed JavaScript array/object.
// We store it in state and flip loading off.
.then(data => {

setUsers(data);
setLoading(false);

})// We store the message and flip loading off so the UI updates.
.catch(err => {
setError(err.message);
setLoading(false);
});
}, []);
// .catch handles both network errors AND our thrown Error above.
if (loading==true) return <p>Loading...</p>;
if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
// --- RENDER ---
// By the time we reach here, loading is false and error is null.
// users is a filled array — safe to map over.
return (
<ul>
{users.map(user => (
// key is required on list items so React can track
// which items changed, added, or removed efficiently.
<li key={user.id}>
<strong>{user.name}</strong> — {user.email}
<br />
<small>{user.company.name} · {user.address.city}</small>
</li>
))}
</ul>
);
}


export default ApiCall