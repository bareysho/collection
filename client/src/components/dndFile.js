import React, { Component, useState } from "react";
import { FilePond, registerPlugin, File } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Wrapper from '../utils/wrapperAxios';
import { Image } from 'cloudinary-react';
import axios from 'axios';

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export const createCloudinary = (cloudName, unsignedUploadPreset, setCover) => ({
    process: (fieldName, file, metadata, load, error, progress, abort) => {

        // `fieldName` and `meta` are not used for now

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.upload.addEventListener('progress', e => {
            progress(e.lengthComputable, e.loaded, e.total);
        });

        xhr.onreadystatechange = e => {

            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                load(response.public_id);
                setCover(`https://res.cloudinary.com/${cloudName}/image/upload/w_300,h_200/${response.public_id}`)
                //console.log(" response.public_id", response.public_id);
                return ;
            }

            error('oh no!');
        };

        formData.append('upload_preset', unsignedUploadPreset);
        formData.append('tags', 'browser_upload');
        formData.append('file', file);
        xhr.send(formData);
        
        return {
            abort: () => {
                xhr.abort();
            }
        }
    },
    revert: null
});

class DndFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: {
                src: "#",
                alt: "Placeholder Text",
            }
        };
    }


    render() {
        return (
            <div className="DndFile">
                {/* Pass FilePond properties as attributes */}
                <FilePond
                    allowMultiple={false}
                    labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                    server={createCloudinary('dvfmqld3v', 'yczph1h5', this.props.setCover)}
                />
            </div>
        );
    }
}
export default DndFile;