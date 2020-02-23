export const REMOVE_TASK = 'REMOVE_TASK'

export const removeTask = (id) => {
    return {
        type: REMOVE_TASK,
        id: id
    }
}
