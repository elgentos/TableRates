import React, { Component } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Preview from './Preview'
import Actions from './Actions'
import Country from './Country'
import { CSVLink } from "react-csv";
import {isoCountries} from './isoCountries'

class App extends Component {
  constructor() {
    super()

    this.state = {
      csvData: []
    }

    ReactGA.initialize('UA-1292775-30');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

    updateCsvDataWithCountryData = (countryCode, countryData) => {
        // Check if country is already in csvData
        let countryInCsvData = this.state.csvData.filter(function (country) {
            return country.Country === countryCode
        }).length > 0;

        if (!countryInCsvData) { // We want to add the country
            this.setState(prevState => ({
                    csvData: [...prevState.csvData, countryData]
                })
            )
        } else { // We want to delete the country
            this.setState(prevState => ({
                    csvData: prevState.csvData.filter(function (country) {
                        return country.Country !== countryCode
                    })
                })
            )
        }
    };

  checkCountry = (country) => {
      this.refs['country-' + country.iso3_code].check()
  }

  render() {
    return (
      <div className="tableratesgenerator">
        <header>
            <h1>Table Rates Generator</h1>
        </header>
        <Actions checkCountry={this.checkCountry} />
          <div className="main">
            <Preview data={this.state.csvData}/>
        <section className="generator">
            <h2>Settings</h2>
          <table>
            <thead>
                <tr key={'header'}><td></td><td>Country</td><td>From subtotal</td><td>Shipping Costs</td><td></td></tr>
            </thead>
            <tbody>
            {isoCountries.map((country) => {
                return (<Country ref={'country-' + country.iso3_code} {...country} key={country.iso3_code} updateCsvDataWithCountryData={this.updateCsvDataWithCountryData} />)
            })}
            </tbody>
          </table>
          <CSVLink data={this.state.csvData} filename={"tablerates.csv"} className="btn btn-primary" target="_blank" onClick={this.gatherData}>
              Generate tablerates.csv
          </CSVLink>
        </section>
          </div>
      </div>
    );
  }
}

export default App;
