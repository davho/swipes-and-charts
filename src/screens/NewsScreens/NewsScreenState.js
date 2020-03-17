import React from 'react'
import { useSelector } from 'react-redux'

import NewsContainer from '../../reusables/NewsContainer'

const NewsScreenState = () => {

    const articles = useSelector(state => state.articlesReducer.articles)
    const filteredArticles = articles.filter(i => i.type === 'State')

    return (
        <NewsContainer news={filteredArticles}/>
    )
}

export default NewsScreenState
