import MYDUMMYTASKS from '../data/dummy-data'
import { REMOVE_TASK } from './tasksActions'

const initialState = {
    allTasks: MYDUMMYTASKS,
    incompleteTasks: MYDUMMYTASKS.filter(el => el.isComplete === false) //Filter for only the elements where the isComplete property is false
}

const tasksReducer = (state = initialState, action) => {

    switch (action.type) {

        case REMOVE_TASK:
            let taskToRemove = state.incompleteTasks.filter(el => el.someId === action.id)[0] //An array is returned so just select the first (and only) element with [0]
            taskToRemove.isComplete = true //Set the isComplete property of that task to true
            let newIncompleteTasks = state.incompleteTasks.filter(el => el.isComplete === false) //Let a new array of tasks be those where isComplete is false
            console.log(state.allTasks.length, newIncompleteTasks.length);
            return {
                ...state,
                incompleteTasks: newIncompleteTasks //Return tasks as the new arrary of incomplete tasks
            }
    }
    return state
}

export default tasksReducer
