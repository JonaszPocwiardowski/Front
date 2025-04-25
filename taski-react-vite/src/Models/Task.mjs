const Task = (content) => {
    return{
        id: crypto.randomUUID(),
        content: content,
        done: false
    }
}

export default Task;