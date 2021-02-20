import React from 'react';
import ServiceNavigation from '../Service/ServiceNavigation.jsx';
import { Result } from './Result.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';
import { DeliveryTimeFilter } from './DeliveryTimeFilter.jsx';
import { PriceRangeFilter } from './PriceRangeFilter.jsx';
import { SellerRankFilter } from './SellerRankFilter.jsx';
import { SellerLanguageFilter } from './SellerLanguageFilter.jsx';


export default class SearchResult extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ServiceNavigation />
                <div className="ui container">
                    <div className="ui text menu">
                        <span className="ui right item">
                            Sort By: &nbsp; &nbsp;
                        <select className="ui dropdown item">
                                <option value="0">Relevance</option>
                                <option value="1">Best Selling</option>
                                <option value="2">Newest Arrival</option>
                            </select>
                        </span>
                    </div>
                    <div className="ui divider"></div>
                    <div className="row-padded">
                        <section className="search-results">
                            <div className="ui grid">
                                <div className="four wide column">
                                    <CategoryFilter />
                                    <form className="ui form">
                                        <DeliveryTimeFilter />
                                        <PriceRangeFilter />
                                        <SellerRankFilter />
                                        <SellerLanguageFilter />
                                    </form>
                                </div>
                                <div className="twelve wide column">
                                    <Result />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
