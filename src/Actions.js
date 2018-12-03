import React from 'react';
import {isoCountries} from './isoCountries'

export default class Actions extends React.Component {

    checkCountries = (field, bool) => {
        const countries = isoCountries.filter(function(country) {
            return country[field] === bool;
        })

        countries.forEach(function (country) {
            console.log(country.iso3_code)
            this.props.checkCountry(country)
        }, this);
    }

    render() {
        return (
            <section className="actions">
                <input type={'button'} value={'Check all EU countries'} onClick={() => this.checkCountries('eu', true)}/><br/>
                <input type={'button'} value={'Check all non-EU countries'} onClick={() => this.checkCountries('eu', false)}/><br/>
                <input type={'button'} value={'Check all European countries'} onClick={() => this.checkCountries('europe', true)}/><br/>
                <input type={'button'} value={'Check all non-European countries'} onClick={() => this.checkCountries('europe', false)}/><br/><br/>

                {/*<input type={'button'} value={'Add empty row to selected countries'}/><br/>*/}
                {/*<input type={'button'} value={'Reset checks'}/><br/>*/}
                <input type={'button'} value={'Clear values for selected countries'} onClick={() => this.props.clearValuesForSelectedCountries()} />
                {/*<br/>*/}
                {/*<br/>*/}
                {/*Default price: <input type="text" value="12.50" id="defPrice" name="defPrice"/> <input type={'button'}*/}
                                                                                                       {/*value={'Set default Shipping Costs for checked countries'}/>*/}
                {/*<br/>*/}
                Table rates condition:
                <select defaultValue={'price'}>
                    <option value="price">Price vs. Destination</option>
                    {/*<option value="weight">Weight vs. Destination</option>*/}
                    {/*<option value="qty"># of Items vs. Destination</option>*/}
                </select>
                {/*<br/>*/}
                {/*Default From condition value: <input type="text" value="0" id="defSubtotal" name="defSubtotal"/><input*/}
                {/*type="button" name="button" onClick="setdefSubtotal()"*/}
                {/*value="Set default condition value for checked countries"/>*/}
            </section>
        )
    }

}