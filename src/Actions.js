import React from 'react';
import {isoCountries} from './isoCountries'

export default class Actions extends React.Component {

    checkEuCountries = () => {
        const euCountries = isoCountries.filter(function(country) {
            return country.eu === true;
        })

        euCountries.forEach(function (country) {
            this.props.checkCountry(country)
        }, this);
    }

    render() {
        return (
            <section className="actions">
                <input type={'button'} value={'Check all EU countries'} onClick={this.checkEuCountries}/><br/>
                <input type={'button'} value={'Check all non-EU countries'}/><br/>
                <input type={'button'} value={'Check all European countries'}/><br/>
                <input type={'button'} value={'Check all non-European countries'}/><br/><br/>

                {/*<input type={'button'} value={'Add empty row to selected countries'}/><br/>*/}
                {/*<input type={'button'} value={'Reset checks'}/><br/>*/}
                {/*<input type={'button'} value={'Clear values for selected countries'}/>*/}
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