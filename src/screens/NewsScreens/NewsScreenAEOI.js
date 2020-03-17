import React from 'react'
import { useSelector } from 'react-redux'

import NewsContainer from '../../reusables/NewsContainer'

const NewsScreenAEOI = () => {

    const articles = useSelector(state => state.articlesReducer.articles)
    const filteredArticles = articles.filter(i => i.type === 'AEOI')

    return (
        <NewsContainer news={filteredArticles}/>
    )
}

export default NewsScreenAEOI
