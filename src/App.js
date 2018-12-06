import React, {Component} from 'react'
import ReactGA from 'react-ga'
import './App.css'
import Preview from './Preview'
import Actions from './Actions'
import Country from './Country'
import {CSVLink} from 'react-csv'
import {isoCountries} from './isoCountries'
import cloneDeep from 'lodash/cloneDeep';

class App extends Component {
    constructor(props) {
        super(props)

        isoCountries.map(function (isoCountry) {
            isoCountry.key = isoCountry['iso3_code'] + '-1'
            isoCountry.id = isoCountry.key
            return isoCountry;
        });

        this.state = {
            csvData: [],
            countryList: isoCountries,
            condition: 'subtotal'
        }

        ReactGA.initialize('UA-1292775-30')
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    isCountryInData = countryKey => (
        this.state.csvData.filter(function (country) {
            return country.key === countryKey
        }).length > 0);

    updateCsvDataWithCountryData = (countryData, inputType) => {
        let countryKey = countryData.key

        // Check if country is already in csvData
        let countryInCsvData = this.isCountryInData(countryKey)

        if (!countryInCsvData) { // If not, add the country
            this.setState(prevState => ({
                    csvData: [...prevState.csvData, countryData]
                })
            )
        } else { // If country already in csvData
            if (inputType === 'checkbox') { // We want to delete the country if unchecked
                this.setState(prevState => ({
                        csvData: prevState.csvData.filter(function (country) {
                            return country.key !== countryKey
                        })
                    })
                )
            } else if (inputType === 'text') { // Or update the countryData if textfield changed
                this.setState(prevState => ({
                        csvData: [...prevState.csvData.filter(function (country) {
                            return country.key !== countryKey
                        }), countryData]
                    })
                )
            }
        }
    };

    checkCountry = (country) => {
        this.refs['country-' + country.key].check()
    };

    clearValuesForSelectedCountries = () => {
        this.state.csvData.forEach(function (country) {
            this.refs['country-' + country.key].clear()
        }, this);
    }

    setShippingCostsForSelectedCountries = shippingCosts => {
        this.state.csvData.forEach(function (country) {
            this.refs['country-' + country.key].setShippingCosts(shippingCosts)
        }, this);
    }

    setFromForSelectedCountries = from => {
        this.state.csvData.forEach(function (country) {
            this.refs['country-' + country.key].setFrom(from)
        }, this);
    }

    setCondition = condition => {
        this.setState({condition: condition})
        this.state.countryList.forEach(function (country) {
            this.refs['country-' + country.key].setCondition(condition)
        }, this);
    }

    getCountryDataFromIsoCountriesList = countryCode => {
        let countryFound = false

        isoCountries.forEach(function (country)  {
            if (country.iso3_code === countryCode) {
                countryFound = country;
            }
        })

        return countryFound
    }

    addToCountryList = country => {
        let countryFound = this.getCountryDataFromIsoCountriesList(country.props.iso3_code)

        let oldIncrement = countryFound.key.charAt(countryFound.key.length-1)
        let newIncrement = parseInt(oldIncrement) + 1
        let newKey = countryFound.iso3_code + '-' + newIncrement

        let countryData = {
            name: countryFound.name,
            iso2_code: countryFound.iso2_code,
            iso3_code: countryFound.iso3_code,
            eu: countryFound.eu,
            europe: countryFound.europe,
            key: newKey,
            id: newKey
        }

        let countryList = this.state.countryList
        countryList.push(countryData)
        countryList.sort(this.compare)

        this.setState({countryList: countryList})
    }

    compare = (a, b) => {
        let nameA = ''
        let nameB = ''
        if (a.hasOwnProperty('name')) {
            nameA = a.name.toUpperCase();
            nameB = b.name.toUpperCase();
        } else {
            nameA = a.Country.toUpperCase();
            nameB = b.Country.toUpperCase();
        }

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

    getCsvData = () => {
        let data = cloneDeep(this.state.csvData)
        console.log(data)

        data.map(function (el) {
            delete el.key
            return el
        });

        if (data.length > 1) {
            data.sort(this.compare)
        }

        return data
    }

    render() {
        return (
            <div className="tableratesgenerator">
                <header>
                    <h1>Table Rates Generator</h1>
                </header>
                <Actions
                    checkCountry={this.checkCountry}
                    clearValuesForSelectedCountries={this.clearValuesForSelectedCountries}
                    setShippingCostsForSelectedCountries={this.setShippingCostsForSelectedCountries}
                    setFromForSelectedCountries={this.setFromForSelectedCountries}
                    setCondition={this.setCondition}
                />
                <div className="main">
                    <Preview data={this.state.csvData}/>
                    <section className="generator">
                        <h2>Settings</h2>
                        <table>
                            <thead>
                            <tr key={'header'}>
                                <td></td>
                                <td>Country</td>
                                <td>From {this.state.condition}</td>
                                <td>Shipping Costs</td>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.countryList.map((country) => {
                                return (
                                    <Country ref={'country-' + country.key}
                                             {...country}
                                             condition={this.state.condition}
                                             updateCsvDataWithCountryData={this.updateCsvDataWithCountryData}
                                             addToCountryList={this.addToCountryList}
                                    />)
                            })}
                            </tbody>
                        </table>
                        <CSVLink data={this.getCsvData()} filename={"tablerates.csv"} className="btn btn-primary"
                                 target="_blank" onClick={this.gatherData}>
                            Generate tablerates.csv
                        </CSVLink>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;
