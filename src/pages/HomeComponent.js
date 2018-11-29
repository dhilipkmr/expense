import React, {Component} from 'react';
import Helmet from 'react-helmet';

class Home extends Component {
    buttonClick() {
        console.log('Hello Button Clicked');
    }
    head() {
        return (
            <Helmet>
                <title>My title</title>
            </Helmet>
        );
    }
    render() {
        return (
            <div>
                {this.head()}
                <div>
                    <h1>Home</h1>
                </div>
                <div>
                    <p>Server Side Rendered</p>
                    <button onClick={this.buttonClick}>Click Me!</button>
                </div>
            </div>
        );
    }
}
export default Home;