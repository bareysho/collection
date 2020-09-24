import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import React, { Component } from 'react';

import CloudItem from '../components/cloudItem'
import Wrapper from '../utils/wrapperAxios';


const styles = {
    large: {
        fontSize: 60,
        fontWeight: 'bold'
    },
    small: {
        opacity: 0.7,
        fontSize: 16
    }
};

let interval; 
class TagsCloud extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            
        }
    }

    componentDidMount() {
        interval = setInterval(() => {
            this.forceUpdate();
        }, 3000);

        const wrapp = new Wrapper();
        wrapp.get(`api/tags`)
            .then(res => {
                this.setState({
                    tags: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });

    }
    
    componentWillUnmount() {
        clearInterval(interval);
    }

    render() {
        return (
            <div className='app-outer'>
                <div className='app-inner'>
                    <TagCloud
                        className='tag-cloud'
                        style={{
                            fontFamily: 'sans-serif',
                            //fontSize: () => Math.round(Math.random() * 50) + 16,
                            fontSize: 30,
                            color: () => randomColor({
                                hue: 'blue'
                            }),
                            padding: 5,
                        }}>
                        <CloudItem text="Tags Collection" />
                        {this.state.tags.map(tag => {
                            return <div key={tag._id + new Date().getMilliseconds() + 5}>
                                {tag.text}
                            </div>
                        })}

                    </TagCloud>
                </div>
            </div>
        );
    }
}

export default TagsCloud;