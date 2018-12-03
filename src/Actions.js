import React from 'react';
import {isoCountries} from './isoCountries'

export default class Actions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {defaultShippingCosts: 12.50, defaultFrom: 0, condition: 'subtotal'};
    }

    checkCountries = (field, bool) => {
        const countries = isoCountries.filter(function(country) {
            return country[field] === bool;
        })

        countries.forEach(function (country) {
            this.props.checkCountry(country)
        }, this);
    }

    setDefaultShippingCosts = e => {
        this.setState({defaultShippingCosts: e.target.value});
    }

    setDefaultFrom = e => {
        this.setState({defaultFrom: e.target.value});
    }

    setCondition = e => {
        this.setState({condition: e.target.value});
        this.props.setCondition(e.target.value);
    }

    render() {
        return (
            <section className="actions">
                <input type={'button'} value={'Check all EU countries'} onClick={() => this.checkCountries('eu', true)}/><br/>
                <input type={'button'} value={'Check all non-EU countries'} onClick={() => this.checkCountries('eu', false)}/><br/>
                <input type={'button'} value={'Check all European countries'} onClick={() => this.checkCountries('europe', true)}/><br/>
                <input type={'button'} value={'Check all non-European countries'} onClick={() => this.checkCountries('europe', false)}/><br/><br/>

                {/*<input type={'button'} value={'Add empty row to selected countries'}/><br/>*/}
                <input type={'button'} value={'Clear values for selected countries'} onClick={() => this.props.clearValuesForSelectedCountries()} />
                <br/>
                <br/>
                Default From condition value: <input type="text" defaultValue={this.state.defaultFrom} onChange={this.setDefaultFrom}/>
                <input type={'button'} value={'Set for checked countries'} onClick={() => this.props.setFromForSelectedCountries(this.state.defaultFrom)}/>
                <br/>
                Default shipping costs: <input type="text" defaultValue={this.state.defaultShippingCosts} onChange={this.setDefaultShippingCosts} />
                <input type={'button'} value={'Set for checked countries'} onClick={() => this.props.setShippingCostsForSelectedCountries(this.state.defaultShippingCosts)}/>
                <br/>
                Table rates condition:
                <select defaultValue={this.state.condition} onChange={this.setCondition}>
                    <option value="subtotal">Destination vs. Price</option>
                    <option value="weight">Destination vs. Weight</option>
                    <option value="quantity">Destination vs. # of Items</option>
                </select>
            </section>
        )
    }

}