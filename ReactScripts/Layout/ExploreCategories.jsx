import React from 'react';

export class ExploreCategories extends React.Component {
    render() {
        return (
            <section className="explore">
                <div className="ui container">
                    <div className="row-padded">
                        <h3 className="mainpage-heading">Explore categories></h3>
                        <p className="mainpage-paragraph">Look for people to trade skills with</p>
                    </div>
                    <div className="row-padded">
                        <div className="ui grid explore-category">
                            <div className="row">
                                <div className="four wide column">
                                    <img src="/icons/mars-design.png"></img><h3>Graphics &amp; Design</h3>
                                    <p>Logo Design, Business Cards,<br />Illustration &amp; lots more</p>
                                </div>
                                <div className="four wide column">
                                    <img src="/icons/mars-market.png"></img><h3>Digital Marketing</h3>
                                    <p>Social Media, SEO,<br />Content Marketing &amp; lots moreship Advice &amp; lots more</p>
                                </div>
                                <div className="four wide column">
                                    <img src="/icons/mars-writing.png"></img><h3>Writing &amp; Translation</h3>
                                    <p>Resumes, Proofreading,<br />Translations &amp; lots more</p>
                                </div>
                                <div className="four wide column">
                                    <img src="/icons/mars-video.png"></img><h3>Video &amp; Animation</h3>
                                    <p>Whiteboard, Animated Logos,<br />Brand Videos &amp; lots more</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="four wide column">
                                    <img src="/icons/mars-mic.png"></img><h3>Music &amp; Audio</h3>
                                    <p>Voice Over, Mixing, Producers,<br />Composers &amp; lots more</p>
                                </div>
                                <div className="four wide column">
                                    <img src="/icons/mars-computer.png"></img><h3>Programming &amp; Tech</h3>
                                    <p>Wordpress, Chatbots,<br />Programming &amp; lots more</p>
                                </div>
                                <div className="four wide column">
                                    <img src="/icons/mars-briefcase.png"></img><h3>Business</h3>
                                    <p>Virtual Assistant, Market Research,<br />Business Plans &amp; lots more</p>
                                </div>
                                <div className="four wide column">
                                    <img src="/icons/mars-lifestyle.png"></img><h3>Fun &amp; Lifestyle</h3>
                                    <p>Online Lessons, Crafts,<br />Relationship Advice &amp; lots more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}