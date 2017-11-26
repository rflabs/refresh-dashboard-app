import React, {Component} from 'react'

import Weather from '../../components'

class WeatherContainer extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className={this.props.layoutClass}>
                <Weather />
            </div>
        )
    }
}