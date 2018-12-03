import React from 'react'


export default class Country extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isChecked: false, from: '', shippingCosts: ''}
    }

    onChangeField = e => {
        let inputType = e.target.type

        if (inputType === "checkbox"){
            this.setState({isChecked: !this.state.isChecked}, () => { this.updateCsvData(inputType) })
        } else {
            if(this.state.isChecked) {
                if (e.target.name === 'shippingCosts') {
                    this.setState({shippingCosts: e.target.value}, () => { this.updateCsvData(inputType) })
                }
                if (e.target.name === 'from') {
                    this.setState({from: e.target.value}, () => { this.updateCsvData(inputType) })
                }
            }
        }
    };

    updateCsvData = (type, e) => {
        let countryCode = this.props.iso3_code;

        let countryData = {
            'Country': countryCode,
            'Region/State': '*',
            'Zip/Postal Code': '*',
            'Order Subtotal (and above)': this.state.from,
            'Shipping Price': this.state.shippingCosts
        }

        this.props.updateCsvDataWithCountryData(countryCode, countryData, type);
    }

    check = e => {
        this.setState({isChecked: true}, this.updateCsvData)
    }

    uncheck = e => {
        this.setState({isChecked: false}, this.updateCsvData)
    }

    clear = e => {
        this.setState({shippingCosts: '', from: ''}, () => { this.updateCsvData('text', e) })
    }

    render() {
        return (<tr key={this.props.iso3_code}>
            <td><input type={'checkbox'}
                       name={'country-' + this.props.iso3_code}
                       ref={'country'}
                       checked={this.state.isChecked}
                       onChange={this.onChangeField}/></td>
            <td>{this.props.name}</td>
            <td>&euro; <input type={'text'}
                              name={'from'}
                              value={this.state.from}
                              onChange={this.onChangeField}/></td>
            <td>&euro; <input type={'text'}
                              name={'shippingCosts'}
                              value={this.state.shippingCosts}
                              onChange={this.onChangeField}/></td>
            {/*<td><input type={'button'} value={'+ Add row'}/></td>*/}
        </tr>)
    }
}