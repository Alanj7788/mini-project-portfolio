import React from 'react';
import './Search.css'; // Import the CSS file

const Search = () => {
  return (
    <div className="card">
      <img className="card-img-top" src="holder.js/100px180?text=Image cap" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card Title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
      </div>
      <div className="card-body">
        <a href="#" className="card-link">Card Link</a>
        <a href="#" className="card-link">Another Link</a>
      </div>
    </div>
  );
};

export default Search;
