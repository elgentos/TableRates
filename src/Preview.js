import React from 'react'
import {convertArrayToCSV} from "convert-array-to-csv";
import cloneDeep from 'lodash/cloneDeep';

export default class Preview extends React.Component {
    compare = (a, b) => {
        const nameA = a.Country.toUpperCase();
        const nameB = b.Country.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

    render() {
        let data = cloneDeep(this.props.data)

        data.map(function (el) {
            delete el.key
            return el
        });

        if (data.length > 1) {
            data.sort(this.compare)
        }

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