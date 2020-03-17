import MYDUMMYARTICLES from '../data/dummy-article-data'
import { GET_ARTICLES } from './articlesActions'

const initialState = {
    articles: MYDUMMYARTICLES
}

const articlesReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ARTICLES:

            return {
                ...state,
                articles: state.articles
            }
    }
    return state
}

export default articlesReducer
