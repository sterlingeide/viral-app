import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import './Signup.css';
import axios from 'axios';
import CountyOptions from './CountyOptions';
const { REACT_APP_SERVER_URL } = process.env;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            state: "",
            redirect: false,
            data: []
        };
    }

    componentDidMount() {
        axios.get(`${REACT_APP_SERVER_URL}/countyData/counties`)
            .then((response) => {
                this.setState({
                    data: response.data.countyNameArr
                });
            })
            .catch((error) => {
                console.log('ERROR', error);
            })
    }

    handleName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handleUserName(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
        });
    }

    handleState(e) {
        this.setState({
            state: e.target.value,
        });
    }

    handleCounty(e) {
        this.setState({
            county: e.target.value,
        });
    }

    displayCounties() {

        const display = this.state.data.map((c, idx) => {
            return (
                <CountyOptions
                    key={idx}
                    name={c}
                />
            )
        })

        return display;
    }

    handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function
        // make sure password and confirm password are equal
        // password length >= 8 characters
        if (this.state.password === this.state.confirmPassword && this.state.password.length >= 8) {
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                state: this.state.state,
                county: this.state.county
            };
            axios
                .post(`${REACT_APP_SERVER_URL}/users/signup`, newUser)
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        redirect: true,
                    });
                    return alert('Account Created');
                })
                .catch((error) => console.log("===> Error in Signup", error));
        } else {
            if (this.state.password !== this.state.confirmPassword)
                return alert("Passwords don't match");
            alert("Password needs to be at least 8 characters. Please try again.");
        }
    };

    render() {
        if (this.state.redirect) return <Navigate to="/login" />;

        return (
            <div className="signup-container">
                <div className="form-container">
                <h1>Sign up for Viral</h1>
                <h4>keep track of the latest covid data & your vacc card</h4>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="field">
                            <div className="control">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleEmail.bind(this)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    autoComplete="username"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.handleUserName.bind(this)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handlePassword.bind(this)}
                                    required
                                />
                            </div>
                        </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        autoComplete="password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleConfirmPassword.bind(this)}
                                        required
                                    />
                                </div>
                            </div>
                        <div className="field">
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    autoComplete="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleName.bind(this)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <select 
                                    onChange={this.handleState.bind(this)} 
                                    name="state" 
                                    defaultValue={""}>
                                    <option value="test" >Select State</option>
                                    <option value="AL" >Alabama</option>
                                    <option value="AK" >Alaska</option>
                                    <option value="AZ" >Arizona</option>
                                    <option value="AR" >Arkansas</option>
                                    <option value="CA" >California</option>
                                    <option value="CO" >Colorado</option>
                                    <option value="CT" >Connecticut</option>
                                    <option value="DE" >Delaware</option>
                                    <option value="FL" >Florida</option>
                                    <option value="GA" >Georgia</option>
                                    <option value="HI" >Hawaii</option>
                                    <option value="ID" >Idaho</option>
                                    <option value="IL" >Illinois</option>
                                    <option value="IN" >Indiana</option>
                                    <option value="IA" >Iowa</option>
                                    <option value="KS" >Kansas</option>
                                    <option value="KY" >Kentucky</option>
                                    <option value="LA" >Louisiana</option>
                                    <option value="ME" >Maine</option>
                                    <option value="MD" >Maryland</option>
                                    <option value="MA" >Massachusetts</option>
                                    <option value="MI" >Michigan</option>
                                    <option value="MN" >Minnesota</option>
                                    <option value="MS" >Mississippi</option>
                                    <option value="MO" >Missouri</option>
                                    <option value="MT" >Montana</option>
                                    <option value="NE" >Nebraska</option>
                                    <option value="NV" >Nevada</option>
                                    <option value="NH" >New Hampshire</option>
                                    <option value="NJ" >New Jersey</option>
                                    <option value="NM" >New Mexico</option>
                                    <option value="NY" >New York</option>
                                    <option value="NC" >North Carolina</option>
                                    <option value="ND" >North Dakota</option>
                                    <option value="OH" >Ohio</option>
                                    <option value="OK" >Oklahoma</option>
                                    <option value="OR" >Oregon</option>
                                    <option value="PA" >Pennsylvania</option>
                                    <option value="RI" >Rhode Island</option>
                                    <option value="SC" >South Carolina</option>
                                    <option value="SD" >South Dakota</option>
                                    <option value="TN" >Tennessee</option>
                                    <option value="TX" >Texas</option>
                                    <option value="UT" >Utah</option>
                                    <option value="VT" >Vermont</option>
                                    <option value="VA" >Virginia</option>
                                    <option value="WA" >Washington</option>
                                    <option value="WV" >West Virginia</option>
                                    <option value="WI" >Wisconsin</option>
                                    <option value="WY" >Wyoming</option>
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                {/* <input
                                    type="text"
                                    placeholder="County"
                                    autoComplete="county"
                                    name="county"
                                    value={this.state.county}
                                    onChange={this.handleCounty.bind(this)}
                                    required
                                /> */}
                                <select 
                                    onChange={this.handleCounty.bind(this)} 
                                    name="county" 
                                    defaultValue={""}>
                                    <option value="test" >Choose County</option>
                                    {this.displayCounties()}
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;

//TODO REDIRECT TO HOMEPAGE