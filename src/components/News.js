import React, { Component, } from 'react'
import NewItems from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

     capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsKitty`
    }


    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        // console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }

    handleprev = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews()
    }
    handlenxt = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }



    render() {
        console.log("Render")
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '40px 0px' }}>NewsKitty {this.capitalizeFirstLetter(this.props.category)} - Top Headlines</h1>
                {this.state.loading && <Spinner />}

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>

                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" onClick={this.handleprev} className="btn btn-dark">&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handlenxt} className="btn btn-dark">Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News
