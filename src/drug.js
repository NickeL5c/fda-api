import React, { Component } from 'react';

class drug extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.safetyreportid}>
                            <p>Event # {item.safetyreportid} </p>
                            <p>     Source Country: {item.primarysourcecountry} </p>
                            <p>     Transmission Date yyyy/mm/dd: {item.transmissiondate} </p>
                            <p>     Patient's Age: {item.patient.patientonsetage} </p>
                        </li>
                    ))}
                </ul>
            );
        }
    }

    componentDidMount() {
        fetch("https://api.fda.gov/drug/event.json?api_key=kPOQSAOg4cQcAY8rkM3t0TOCafPUPQObYsPMEwUX&limit=4")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.results
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


}
export default drug