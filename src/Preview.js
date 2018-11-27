import React from 'react'
import {convertArrayToCSV} from "convert-array-to-csv";

export default class Preview extends React.Component {
    render() {
        let data = this.props.data
        const csvFromArrayOfObjects = convertArrayToCSV(data);
        return (
            <section className="preview">
                <h2>Preview</h2>
                <pre>
                    {csvFromArrayOfObjects}
                </pre>
            </section>
        )
    }
}