/* CategoryFilter section */
import React from 'react';

export class CategoryFilter extends React.Component {
    render() {
        return (
            <div>
            <h4>Refine Results</h4>
            <ul className="filter-results">
                <li>
                    All Categories
                    <span className="rf">(100)</span>
                </li>
                <li className="subcategories">
                    <a href="#">Flyers &amp; Brochures</a>
                    <span className="rf">(72)</span>
                </li>
                <li className="subcategories">
                    <a href="#">Photoshop Editing</a>
                    <span className="rf">(18)</span>
                </li>
                <li className="subcategories">
                    <a href="#">Book Covers</a>
                    <span className="rf">(3)</span>
                </li>
                <li className="subcategories">
                    <a href="">Other</a>
                    <span className="rf">(5)</span>
                </li>
                <li className="subcategories">
                    <a href="">Content Marketing</a>
                    <span className="rf">(1)</span>
                </li>
                <li className="subcategories">
                    <a href="">Arts &amp; Crafts</a>
                    <span className="rf">(1)</span>
                </li>
            </ul>
            </div>
        )
    }
}
