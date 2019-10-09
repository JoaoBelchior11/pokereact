import React, { Component } from 'react'

export default class PokeStats extends Component {
    render() {
        return (
                        <>
                       
                        <div className="row align-itens-center">
                            <div className="col-12 col-md-10">{this.props.statName}</div>
                            <div className="col-12 col-md-12">
                                <div className="progress">
                                    <div className="progress-bar"
                                    role="progressBar"
                                    style={{width: `${this.props.statValue}}%`}}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                        <small>{this.props.statValue}</small>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        </>                 
        )
    }
}
