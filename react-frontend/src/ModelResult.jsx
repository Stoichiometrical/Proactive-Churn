

export default function ModelResult({churn_proba=0.8}){
    return(
        <>

            <div className="results">
                This customer has a churn probabilty of  {churn_proba}.
                This means that they are {churn_proba *100}% likely to stop using our services
                <h4 className="r-text">Click Below to see the best ways to keep them using our services</h4>
            </div>

        </>
    )
}