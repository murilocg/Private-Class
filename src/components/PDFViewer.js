import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import api from '../api';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
}

class PDFViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numPages: 1
        }
    }

    onLoadSuccess = ({ numPages }) => {
        console.log("teste");
        this.setState({ numPages })
    }

    renderPages() {
        let pages = [];
        for (let index = 1; index <= this.state.numPages; index++)
            pages.push(<Page style={{ width: 'calc(100% - 200px)' }} key={index} pageNumber={index} />);
        return pages;
    }

    render() {
        return (
            <div style={{ margin: "0 auto" }}>
                <Document file={this.props.file} onLoadSuccess={this.onLoadSuccess}>
                    {this.renderPages()}
                </Document>
            </div>);
    }
}

export default PDFViewer;