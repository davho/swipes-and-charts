export const GET_ARTICLES = 'GET_ARTICLES'

export const getArticles = (articles) => {

    return {
        type: GET_ARTICLES,
        articles: articles
    }
}
