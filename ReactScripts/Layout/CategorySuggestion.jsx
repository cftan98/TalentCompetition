import React from 'react';

export class CategorySuggestion extends React.Component {
    render() {
        return (
            <section className="suggestions">
                <div className="ui container">
                    <div className="row-padded">
                        <h3 className="mainpage-heading">Take the First Step</h3>
                        <p className="mainpage-paragraph">Here are some suggestions for you to get started</p>
                    </div>
                    <div className="row-padded">
                        <div className="ui five stackable cards">
                            <div className="card noboxshadow">
                                <a href="#">
                                    <div className="ui wireframe image">
                                        <img src="/images/evie-shaffer-501641-unsplash.jpg"></img>
                                    </div>
                                </a>
                                <div className="content">
                                    <a className="header" href="#">Art/Design</a>
                                    <div className="meta">
                                        <a>Sketching, painting, sculpting</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card noboxshadow">
                                <a href="#">
                                    <div className="ui wireframe image">
                                        <img src="/images/brooke-lark-200721-unsplash.jpg"></img>
                                    </div>
                                </a>
                                <div className="content">
                                    <a className="header" href="#">Food</a>
                                    <div className="meta">
                                        <a>Cooking, baking</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card noboxshadow">
                                <a href="#">
                                    <div className="ui wireframe image">
                                        <img src="/images/scott-webb-195100-unsplash.jpg"></img>
                                    </div>
                                </a>
                                <div className="content">
                                    <a className="header" href="#">Information Technology</a>
                                    <div className="meta">
                                        <a>Web development</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card noboxshadow">
                                <a href="#">
                                    <div className="ui wireframe image">
                                        <img src="/images/hunter-bryant-48373-unsplash.jpg"></img>
                                    </div>
                                </a>
                                <div className="content">
                                    <a className="header" href="#">Exercise</a>
                                    <div className="meta">
                                        <a>Personal trainer</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card noboxshadow">
                                <a href="#">
                                    <div className="ui wireframe image">
                                        <img src="/images/kelly-sikkema-487603-unsplash.jpg"></img>
                                    </div>
                                </a>
                                <div className="content">
                                    <a className="header" href="#">Crafts</a>
                                    <div className="meta">
                                        <a>Pottery</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>    
            
        )
    }
}