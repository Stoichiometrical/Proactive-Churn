import React, { useState } from 'react';
import "./pages.scss"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import {Link} from "react-router-dom";

const PredictionButton = () => {
  const [churnProbabilities, setChurnProbabilities] = useState([]);
  const[segments,setSegments]= useState([])
  const [averageChurnProb, setAverageChurnProb] = useState(0);
  const [recommendations, setRecommendation] = useState(null);
  const[detailed,setDetailed] = useState(false)

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

   const getRecommendations = () => {
    if (averageChurnProb < 0.31) {
      setRecommendation(lowChurnProbability);
    } else if (averageChurnProb >= 0.31 && averageChurnProb <= 0.6) {
      setRecommendation(mediumChurnProbability);
    } else {
      setRecommendation(highChurnProbability);
    }
  };

   const getDetailedRecommendations=()=>{
     setDetailed(true)
   }
  //Calculating average churn
  let data = segments.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {});

    data = Object.keys(data).map(key => ({name: key, value: data[key]}));


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('dataset', file);

    try {
      const response = await fetch('http://localhost:8000/api/prediction/', {
        method: 'POST',
        body: formData,
      });

      console.log(formData)
      const data = await response.json();
      console.log(data);
      const { churn_probabilities,segments } = data;

       let sum = 0;
      for(let i = 0; i < churn_probabilities.length; i++) {
          sum += churn_probabilities[i];
      }
      let avg = sum / churn_probabilities.length;

      setAverageChurnProb(avg)
      setChurnProbabilities(churn_probabilities);
      setSegments(segments)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='ups' style={{height:'100%'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',gap:'20px'}}>
            {/*Change the default button to UploadDataset*/}
            <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: "none" }} />
             <button onClick={() => document.querySelector('input[type="file"]').click()}>
             Upload Dataset
             </button>
        <div><Link to='/upload' style={{textDecoration:'none',color:'white',fontWeight:'bold',paddingTop:'10px'}}>Back To Options</Link></div>
         </div>

        {/*Only display model results after api call*/}
      {churnProbabilities && churnProbabilities.length > 0 && (
       <div className="results-sect">

    <h2>Model Results</h2>

           {/*First Section*/}
         <div className="first-sect">
             {/*Box with Average Churn Probability*/}
            <div className="churn-box">
              <h2 className="number">{(averageChurnProb*100).toFixed(2)}% </h2>
              <div className="num-small">Average Churn Probability</div>
            </div>

               {/*Bar Chart*/}
             <BarChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    className="bar"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"  />
                    <YAxis />
                    <Tooltip contentStyle={{ color: '#1e90ff' }}  itemStyle={{ color: '#1e90ff' }}/>
                    <Legend />
                    <Bar dataKey="value" fill="#ffffff" />
                </BarChart>

         </div>

           {/*Button to get Recommendations OnClick*/}
           {<button onClick={getRecommendations} style={{marginLeft:'38%',fontSize:'25px',fontWeight:'bold',marginBottom:'3%'}}>Get Recommendations</button>}

         {/*General Recommendations Section  */}
          {recommendations && (
            <div >
                <div className="recommendation" id="reco-div">
                      <h2 style={{textAlign:'center',color:'#1e90ff'}} >General Recommendations</h2>
                      <ul style={{color:'#1e90ff'}}>
                            {recommendations.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}

                          {/*Button to get Detailed Recommendations*/}
                           {<button onClick={getDetailedRecommendations} style={{marginLeft:'8%',fontSize:'15px',fontWeight:'bold'}}>See More Specific Retention Strategies For Each Group</button>}
                      </ul>
                </div>

                {/*Detailed Retention Strategies only Returned If The Button Is Clicked*/}
                {detailed &&
                    <div className="rec-sections">
                        <div className="sec-1">
                            <h3 style={{textAlign:'center'}} >Low Churn Customers</h3>
                              <ul>
                                {highChurnProbability.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                                  <button style={{marginLeft:'8%'}}>Get Customers</button>

                              </ul>
                        </div>

                        <div className="sec-1">
                              <h3 style={{textAlign:'center'}} >Medium Churn Customers</h3>
                              <ul>
                                {mediumChurnProbability.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                                   <button style={{marginLeft:'8%'}}>Get Customers</button>

                              </ul>
                        </div>

                        <div className="sec-1">
                              <h3 style={{textAlign:'center'}} >High Churn Customers</h3>
                              <ul>
                                {highChurnProbability.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}

                              </ul>
                                         <button style={{marginLeft:'8%'}}>Get Customers</button>
                        </div>
                </div>
                }

            </div>

          )}

  </div>
)}

    </div>
  );
};

export default PredictionButton;
