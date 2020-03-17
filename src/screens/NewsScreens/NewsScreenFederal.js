import React from 'react'
import { useSelector } from 'react-redux'

import NewsContainer from '../../reusables/NewsContainer'

const NewsScreenFederal = () => {

    const articles = useSelector(state => state.articlesReducer.articles)
    const filteredArticles = articles.filter(i => i.type === 'Federal')

    return (
        <NewsContainer news={filteredArticles}/>
    )
}

export default NewsScreenFederal
