import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: true
        }
    }
    update = async () => {
        console.log("liar")
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        console.log("enemy")
        console.log(this.props.apikey)
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        console.log("i m dead")
        await this.update();
    }
    // prevPageHandler = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     await this.update()
    // }
    // nextPageHandler = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     await this.update()
    // }
    refresh = async () => {
        this.update()
        console.log("refreshed");
    }
    fetchData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url)
        let parsedData = await data.json()
        
        this.setState({
            articles: this.state.articles.concat(parsedData.articles)
        })
    }
    render() {
        return (
            <>
                <div className="container my-4">
                    <h2 className='text-center' style={{marginTop:"90px"}}>News Aqua - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
                    {this.state.loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>§(*￣▽￣*)§ u r caught up with world</b>
                            </p>
                        }
                        // below props only if you need pull down functionality
                        refreshFunction={this.refresh}
                        pullDownToRefresh
                        pullDownToRefreshThreshold={50}
                        pullDownToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                        }
                    >
                        <div className="container">
                            <div className="row my-4">
                                {this.state.articles.map((e, index) => {
                                    return (
                                        <div className="col-md-3" key={index}>
                                            <NewsItem title={e.title?.slice(0, 44)} desc={e.description?.slice(0, 88)} imageUrl={e.urlToImage} url={e.url}
                                                publishedAt={e.publishedAt} author={e.author} source={e.source.name} />
                                        </div>)
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="fixed-bottom d-flex justify-content-between mx-1 my-1">
                    <button disabled={this.state.page <= 1} className="btn btn-sm btn-dark" onClick={this.prevPageHandler}>Prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-sm btn-dark" onClick={this.nextPageHandler}>Next</button>
                </div> */}
            </>
        )
    }
}
