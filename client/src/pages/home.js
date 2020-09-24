import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';
import TagsCloud from '../components/tagsCloud'

import Wrapper from '../utils/wrapperAxios';
import CardCollection from '../components/cardCollection'

export default class Home extends Component {
    constructor(props) {
        super(props);

        const store = getStore();

        this.state = {
            collections: []
        }
        //console.log("Store redux home:  ", store.getState());
    }

    sortByItems(arr) {
        arr.sort((a, b) =>
            a.items.length > b.items.length ? -1 : 1
        );
    }

    componentDidMount() {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/`)
            .then(res => {
                const collections_ = res.data;
                this.sortByItems(collections_)
                this.setState({ collections: collections_ });
            })
            .catch(err => {
                console.log(err);
            });
    }




    render() {
        return (
            <>
                <div>
                    <Container>
                        <div className="cloudTags">
                            <TagsCloud />
                        </div>

                        <h4 style={{ marginTop: 20 + 'px' }}>All Collections</h4>
                        <div className="row">
                            {
                                this.state.collections.map(item => {
                                    return <div className=" card-deck col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" style={{ marginTop: 3 + '%' }} key={item._id + 76}>
                                        <CardCollection
                                            item={item}
                                        />
                                    </div>
                                })
                            }
                        </div>
                    </Container>

                    <footer className='myFooter'>
                        <h6>by Vladzislava Ignatyeva 2020</h6>
                    </footer>

                </div>
            </>
        )
    }
}