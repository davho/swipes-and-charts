import React from 'react'
import { useSelector } from 'react-redux'

import NewsContainer from '../../reusables/NewsContainer'

const NewsScreenDTS = () => {

    const articles = useSelector(state => state.articlesReducer.articles)
    const filteredArticles = articles.filter(i => i.type === 'DTS')

    return (
        <NewsContainer news={filteredArticles}/>
    )
}

export default NewsScreenDTS
