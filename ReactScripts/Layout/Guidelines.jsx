import React from 'react';

export const Guidelines = (props) => (
    <section className="guidelines row-padded">
        <h3 className="mainpage-heading">Guidelines</h3>
        <p className="mainpage-paragraph">Here are ways to get the best out of Mars</p>
        <div className="ui container">
            <div className="ui three stackable cards">
                <div className="ui card noboxshadow">
                    <div className="ui wireframe image">
                        <img src="/images/scott-webb-195100-unsplash.jpg"></img>
                    </div>
                    <div className="content">
                        <h3>Programming</h3>
                        <p>Learn how to build your own website</p>
                    </div>
                </div>
                <div className="ui card noboxshadow">
                    <div className="ui wireframe image">
                        <img src="/images/evie-shaffer-501641-unsplash.jpg"></img>
                    </div>
                    <div className="content">
                        <h3>Art &amp; Design</h3>
                        <p>Learn how to paint</p>
                    </div>
                </div>
                <div className="ui card noboxshadow">
                    <div className="ui wireframe image">
                        <img src="/images/brooke-lark-200721-unsplash.jpg"></img>
                    </div>
                    <div className="content">
                        <h3>Food</h3>
                        <p>Learn how to make a new dish</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)