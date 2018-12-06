import React from 'react'


export default class Country extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isChecked: false, from: '', shippingCosts: '', condition: props.condition}
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

    setShippingCosts = shippingCosts => {
        this.setState({shippingCosts: shippingCosts}, () => { this.updateCsvData('text') })
    };

    setFrom = from => {
        this.setState({from: from}, () => { this.updateCsvData('text') })
    };

    setCondition = condition => {
        this.setState({condition: condition})
    };

    updateCsvData = (type, e) => {
        let countryCode = this.props.iso3_code;

        let countryData = {
            'Country': countryCode,
            'Region/State': '*',
            'Zip/Postal Code': '*',
            'Condition': this.state.from + '', // cast to string for zero
            'Shipping Price': this.state.shippingCosts + '', // cast to string for zero
            key: this.props.id
        }

        this.props.updateCsvDataWithCountryData(countryData, type);
    }

    check = e => {
        this.setState({isChecked: true}, this.updateCsvData)
    }

    uncheck = e => {
        this.setState({isChecked: false}, this.updateCsvData)
    }

    clear = e => {
        this.setState({shippingCosts: '', from: ''}, () => { this.updateCsvData('text') })
    }

    addRow = e => {
        return React.createElement(this.class, {
            ...this.props
        })
    }

    render() {
        return (<tr key={this.props.id}>
            <td><input type={'checkbox'}
                       name={'country-' + this.props.iso3_code}
                       ref={'country'}
                       checked={this.state.isChecked}
                       onChange={this.onChangeField}/></td>
            <td>{this.props.name}</td>
            <td>{this.state.condition === 'subtotal' && '€ '}<input type={'text'}
                              name={'from'}
                              value={this.state.from}
                              onChange={this.onChangeField}/></td>
            <td>&euro; <input type={'text'}
                              name={'shippingCosts'}
                              value={this.state.shippingCosts}
                              onChange={this.onChangeField}/></td>
            <td><input type={'button'} value={'+ Add row'} onClick={() => this.props.addToCountryList(this) }/></td>
        </tr>)
    }
}