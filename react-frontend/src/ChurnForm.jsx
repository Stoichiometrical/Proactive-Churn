import React, { useState } from 'react';
import "./App.css"
import ModelResult from "./ModelResult";
import {Link} from "react-router-dom";

function CustomerChurnForm() {
  const [state, setState] = useState({
    gender: '',
    seniorcitizen: false,
    partner: '',
    dependents: '',
    phoneservice: '',
    multiplelines: '',
    internetservice: '',
    onlinesecurity: '',
    onlinebackup: '',
    deviceprotection: '',
    techsupport: '',
    streamingtv: '',
    streamingmovies: '',
    contract: '',
    paperlessbilling: '',
    paymentmethod: '',
    tenure: 0,
    monthlycharges: 0.0,
    totalcharges: 0.0
  });
  const [submit, setSubmit] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  //function to handle change in input value
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  //Function to send form data to backend api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const response = await fetch('http://localhost:8000/api/churn_predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else if (data.prediction) {
        setPrediction(data.prediction);
      }

      console.log(data);
      setPrediction(data.churn_proba.toFixed(2));
      console.log("The probability is :", data.churn_proba);

      // console.log(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.toString());
    }
  };

  //Function to get recommendations based on churn probability
  const getRecommendations = () => {
    let highChurnProbability = [
      "Personalized Offers: Use customer data to tailor unique offers that are relevant to the customer's usage patterns and preferences.",
      "Loyalty Rewards: Implement a loyalty program that rewards customers for their long-term commitment. The rewards could include discounts, free upgrades, or exclusive access to new features or services.",
      "Proactive Customer Service: Reach out to the customers and ask for their feedback, concerns, and suggestions. Try to solve any issues they may have even before they consider leaving.",
      "Retain Program: Offer customers in this group a special 'retain program' which could include significant price reductions, exclusive features, or premium customer service.",
      "Competitor Comparison: Show them how your services or plans are better than your competitors'. This could be done through email marketing, social media, or direct communication."
    ];

    let mediumChurnProbability = [
      "Engagement Activities: Organize webinars, workshops, or other engagement activities based on the interests of these customers to keep them involved with your brand.",
      "Educate Customers: Often, customers are not aware of all the features or services they have access to. Regularly send them educational content (like how-to guides, tips and tricks) about their current plan.",
      "Surveys and Feedback: Regularly conduct surveys and ask for feedback. Show these customers that you care about their opinion and are always trying to improve.",
      "Upgrade Offers: Provide these customers with attractive upgrade offers. A new, better plan might make them reconsider their decision to leave.",
      "Relevant Cross-selling or Up-selling: Based on their usage and preferences, offer relevant additional services or products."
    ];

    let lowChurnProbability = [
      "Regular Communication: Keep these customers informed about any updates, new features, or offers. Use a personal tone in your communications to make them feel valued.",
      "Referral Programs: Offer incentives for referring new customers. This will not only help in acquiring new customers but will also increase the engagement of existing ones.",
      "Exclusive Benefits: Provide these customers with exclusive benefits like early access to new features, priority customer service, etc.",
      "Customer Success Stories: Highlight these customers in your marketing materials. Share their success stories, testimonials, or case studies to show potential customers the value of your service.",
      "Personalized Thank You: Send them personalized 'Thank You' notes or gifts. Show appreciation for their loyalty and make them feel special."
    ];

    if (prediction < 0.31) {
      setRecommendation(lowChurnProbability);
    } else if (prediction >= 0.31 && prediction <= 0.6) {
      setRecommendation(mediumChurnProbability);
    } else {
      setRecommendation(highChurnProbability);
    }
  };

  return (
    <div className="form-body">
      {/*displayed when there is an error in sending data to api*/}
      {error && <div>Error: {error}</div>}

      <h1 className="header">Please Insert Customer Details</h1>
      <div><Link to='/upload' style={{textDecoration:'none',color:'white',fontWeight:'bold',paddingTop:'10px'}}>Back To Options</Link></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Gender:
            <select name="gender" onChange={handleChange} value={state.gender}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Senior Citizen:
            <input
              type="checkbox"
              name="seniorcitizen"
              onChange={handleChange}
              checked={state.seniorcitizen}
            />
          </label>
          <label>
            Partner:
            <input
              type="checkbox"
              name="partner"
              onChange={handleChange}
              checked={state.partner}
            />
          </label>
          <label>
            Dependents:
            <input
              type="checkbox"
              name="dependents"
              onChange={handleChange}
              checked={state.dependents}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tenure:
            <input
              type="number"
              name="tenure"
              onChange={handleChange}
              value={state.tenure}
            />
          </label>
          <label>
            Phone service:
            <input
              type="checkbox"
              name="phoneservice"
              onChange={handleChange}
              checked={state.phoneservice}
            />
          </label>
          <label>
            Multiple lines:
            <input
              type="checkbox"
              name="multiplelines"
              onChange={handleChange}
              checked={state.multiplelines}
            />
          </label>
          <label>
            Internet Service:
            <select
              name="internetservice"
              onChange={handleChange}
              value={state.internetservice}
            >
              <option value="">Select...</option>
              <option value="no">No</option>
              <option value="fiber">Fiber</option>
              <option value="optic">Optic</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Online Security:
            <input
              type="checkbox"
              name="onlinesecurity"
              onChange={handleChange}
              checked={state.onlinesecurity}
            />
          </label>
          <label>
            Online Backup:
            <input
              type="checkbox"
              name="onlinebackup"
              onChange={handleChange}
              checked={state.onlinebackup}
            />
          </label>
          <label>
            Device Protection:
            <input
              type="checkbox"
              name="deviceprotection"
              onChange={handleChange}
              checked={state.deviceprotection}
            />
          </label>
          <label>
            Tech Support:
            <input
              type="checkbox"
              name="techsupport"
              onChange={handleChange}
              checked={state.techsupport}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Streaming TV:
            <input
              type="checkbox"
              name="streamingtv"
              onChange={handleChange}
              checked={state.streamingtv}
            />
          </label>
          <label>
            Streaming Movies:
            <input
              type="checkbox"
              name="streamingmovies"
              onChange={handleChange}
              checked={state.streamingmovies}
            />
          </label>
          <label>
            Contract:
            <select name="contract" onChange={handleChange} value={state.contract}>
              <option value="">Select...</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="two_year">Two year</option>
            </select>
          </label>
          <label>
            Paperless Billing:
            <input
              type="checkbox"
              name="paperlessbilling"
              onChange={handleChange}
              checked={state.paperlessbilling}
            />
          </label>
          <label>
            Payment Method:
            <select
              name="paymentmethod"
              onChange={handleChange}
              value={state.paymentmethod}
            >
              <option value="">Select...</option>
              <option value="electronic check">Electronic Check</option>
              <option value="mailed check">Mailed Check</option>
              <option value="bank transfer">Bank Transfer</option>
              <option value="credit card">Credit Card</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Monthly Charges:
            <input
              type="number"
              name="monthlycharges"
              onChange={handleChange}
              value={state.monthlycharges}
            />
          </label>
          <label>
            Total Charges:
            <input
              type="number"
              name="totalcharges"
              onChange={handleChange}
              value={state.totalcharges}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submit ? <ModelResult churn_proba={prediction} /> : <div></div>}
      {submit && <button onClick={getRecommendations}>Get Recommendations</button>}
      {recommendation && (
        <div className="recommendation" id="reco-div">
          <h3 style={{textAlign:'center'}} >Recommendations</h3>
          <ul>
            {recommendation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="footer">This churn prediction model was made by David Tendai Gondo.&copy;SMT 2023.All rights reserved</div>
    </div>
  );
}

export default CustomerChurnForm;

