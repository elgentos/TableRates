import React from 'react'


export default class Country extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {isChecked:false}

        this.check = this.check.bind(this)
        this.uncheck = this.uncheck.bind(this)
    }

    onChangeField = e => {
        let inputType = e.target.type
        if (inputType === "checkbox"){
            this.setState({isChecked: !this.state.isChecked}, this.updateCsvData(inputType))
        } else {
            if(this.state.isChecked) {
                this.setState(this.updateCsvData(inputType))
            }
        }
    };

    updateCsvData = (type, e) => {
        let countryCode = this.props.iso3_code;

        let countryData = {
            'Country': countryCode,
            'Region/State': '*',
            'Zip/Postal Code': '*',
            'Order Subtotal (and above)': this.refs.from.value,
            'Shipping Price': this.refs.shippingCosts.value
        }

        this.props.updateCsvDataWithCountryData(countryCode, countryData, type);
    }

    check = e => {
        this.setState({isChecked: true}, this.updateCsvData)
    }

    uncheck = e => {
        this.setState({isChecked: false}, this.updateCsvData)
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
                              name={'from-' + this.props.iso3_code}
                              ref={'from'}
                              onChange={this.onChangeField}/></td>
            <td>&euro; <input type={'text'}
                              name={'shipping-costs-' + this.props.iso3_code}
                              ref={'shippingCosts'}
                              onChange={this.onChangeField}/></td>
            {/*<td><input type={'button'} value={'+ Add row'}/></td>*/}
        </tr>)
    }
}