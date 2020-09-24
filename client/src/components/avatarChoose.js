import React, { Component } from "react";
import Avatar from 'react-avatar-edit'

export default class AvatarChoose extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preview: props.src,
            src: props.src
        }
        console.log("AvatarChoose", this.props.src)
        this.onCrop = this.onCrop.bind(this)
        this.onFileLoad = this.onFileLoad.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    onClose() {
        this.setState({ preview: this.props.src || null})
    }

    onCrop(preview) {
        this.setState({ preview })
        //console.log("image ", this.state.src)
    }


    onFileLoad(file){
        this.props.updateAvatar(file);
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <Avatar
                        width={200}
                        height={200}
                        onCrop={this.onCrop}
                        onClose={this.onClose} 
                        onFileLoad={this.onFileLoad}                       
                        src={this.props.src}
                    />
                </div>
            </div>
            
        )
    }
}


