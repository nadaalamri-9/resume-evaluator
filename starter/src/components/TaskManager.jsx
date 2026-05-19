import { useState, memo, useRef, useCallback  } from 'react'


// React.memo wraps the component. It should only re-render when props change.
// But without useCallback in the parent, it can never do its job — read on.


const TaskItem = memo(function TaskItem({ task, onDelete }) {
// useRef stores the count WITHOUT causing a re-render — perfect for tracking renders.
const renderCount = useRef(0)
renderCount.current += 1


return (
<div style={{ display:'flex', gap:'8px', alignItems:'center',
padding:'8px', border:'1px solid #ccc', marginBottom:'4px', borderRadius:'4px' }}>
<span style={{ flex:1 }}>{task.text}</span>
{/* Watch this number while typing in the input above */}
<span style={{ color:'red', fontSize:'0.8rem' }}>
renders: {renderCount.current}
</span>
<button onClick={() => onDelete(task.id)}>Delete</button>
</div>
)
})


export default function TaskManager() {


const [tasks, setTasks] = useState([
{ id: 1, text: 'Learn React hooks' },
{ id: 2, text: 'Build a project' },
{ id: 3, text: 'Practice every day' },
])


const [inputText, setInputText] = useState('')


// ✗ PROBLEM: This creates a brand-new function object on every render.
// When you type a letter, setInputText runs → parent re-renders → this line
// runs again → a new handleDelete is born → TaskItem sees a "new" onDelete prop
// → React.memo says "prop changed" → TaskItem re-renders. Every. Keystroke.

// fix 
const handleDelete = useCallback((id) => {
  setTasks(prev => prev.filter(t => t.id !== id))
}, [])

const handleAdd = () => {
if (!inputText.trim()) return 
setTasks(prev => [...prev, { id: Date.now(), text: inputText.trim() }])
setInputText('')
}
return (
<div style={{ maxWidth:'420px', padding:'16px' }}>
<h3>My Tasks</h3>
<div style={{ display:'flex', gap:'8px', marginBottom:'12px' }}>
<input
value={inputText}
onChange={e => setInputText(e.target.value)}
placeholder="Type here — watch render counts!"
style={{ flex:1, padding:'6px' }}
/>
<button onClick={handleAdd}>Add</button>
</div>
{tasks.map(task => (
<TaskItem key={task.id} task={task} onDelete={handleDelete} />
))}
</div>
)

}