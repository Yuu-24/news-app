import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, desc, imageUrl, url, publishedAt, source } = this.props;
        return (
            <div>
                <div className="card my-2">
                    
                    <span className="d-flex position-absolute end-0 badge rounded-pill bg-secondary" >{source}</span>
                    
                    <img src={imageUrl == null ? "https://imgs.search.brave.com/3k2jO6GouOXlhs_pW7R0fZrwA1sgIwYvFoCxNt1Oxh0/rs:fit:1200:1052:1/g:ce/aHR0cHM6Ly93d3cu/dGhlYW5pbWVkYWls/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjIvMDgvb3No/aS1uby1rby05MS52/MS5qcGc" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}...</p>
                        <p>{publishedAt}</p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
