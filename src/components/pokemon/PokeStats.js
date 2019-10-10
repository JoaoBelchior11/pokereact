import React, { Component } from 'react'

export default class PokeStats extends Component {
    render() {
        return (
                        <React.Fragment>
                        <div className="row align-left">
                            <div className="col-12 col-md-2">{this.props.statName}</div>
                            <div className="col-12 col-md-3">
                                <div className="progress">
                                    <div className="progress-bar"
                                    role="progressBar"
                                    style={{width: `${this.props.statValue}%`}}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                        <small>{this.props.statValue}</small>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        </React.Fragment>                 
        )
    }
}
