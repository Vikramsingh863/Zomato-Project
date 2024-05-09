import React from "react";
import '../Style/frontPage.css';    // importing the CSS
import Banner from './Banner';
import QuickSearch from "./QuickSearch";
import axios from "axios";
const URL ="https://zomato-project-dulo.onrender.com"
class Homepage extends React.Component{
    constructor(){
        super();
        this.state ={
            loc: [],
            mealtype: []
        }
    }

    componentDidMount(){
        // location API
        axios({
            url: `${URL}/location`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ loc: res.data.location })
        })
        .catch((err => console.log(err)))

        // Mealtype API
        axios({
            url: `${URL}/mealtype`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ mealtype: res.data.meal })
        })
        .catch((err => console.log(err)))
    }

    render(){
        const { loc, mealtype } = this.state;
        // console.log(mealtype);
        return(
            <div>
                {/* <!--Banner Part (upper part)--> */}
                <Banner locationData = { loc } />

                {/* <!--Quick Searches Part (lower)--> */}
                <QuickSearch mealtypeData = { mealtype } />
                
            </div>
        )
    }
}

export default Homepage;