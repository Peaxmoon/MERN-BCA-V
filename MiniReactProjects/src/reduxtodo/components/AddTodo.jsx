import React from 'react'

function AddTodo() {
    return (
        <form onSubmit={addTodoHandler} className='space-x-3 mt-12'>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    )
}

export default AddTodo