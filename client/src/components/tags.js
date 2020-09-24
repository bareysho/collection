import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Wrapper from '../utils/wrapperAxios';


export default class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });

    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));

        //console.log("new tag", tag)
        if (this.state.suggestions.findIndex(item => item.id === tag.id) === -1) {
            const wrapp = new Wrapper();
            wrapp.post(`api/tags`, tag)
                .then(res => {

                })
                .catch(err => {
                    console.log(err);
                });

        }
    }


    componentDidMount() {
        //console.log("tags props", this.props.defaultTags)
        const wrapp = new Wrapper();
        wrapp.get(`api/tags`)
            .then(res => {
                this.setState({
                    suggestions: res.data,
                    tags: this.props.defaultTags
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.tags !== prevState.tags) {
            this.props.getTags(this.state.tags);
        }
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    allowDragDrop={false}
                />
            </div>
        )
    }
};
