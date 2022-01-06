import React from 'react';

const NewItems  = (props)=> {
    
        let {title,description,imgUrl,newsUrl,date,author} = props;
        return (
            <div className="my-3">
                <div className="card" >
                    <img src={imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small>By {!author?"Unknown":author} published on { new Date(date).toGMTString() }</small></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    
}

export default NewItems
