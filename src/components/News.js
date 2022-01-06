import React, { useEffect, useState } from 'react'
import NewItems from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }




    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        // console.log(parsedData);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsKitty`;
        updateNews();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleprev = async () => {
        setPage(page - 1)
        updateNews()
    }
    const handlenxt = async () => {
        setPage(page + 1)
        updateNews()
    }





    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ margin: '40px 0px', marginTop: '60px'}}>NewsKitty {capitalizeFirstLetter(props.category)} - Top Headlines</h1>
            {loading && <Spinner />}

            <div className="row">
                {articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                    </div>

                })}
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" onClick={handleprev} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" onClick={handlenxt} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        </div>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'

}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
