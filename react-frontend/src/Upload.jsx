import "./pages.scss"
import {Link} from "react-router-dom";

export default function UploadOption(){
    return(

        <div className="upload-container">
            <h2>WELCOME TO SMT</h2>
            <h3>
                Start your analysis by either uploading your customer data or tweaking for a specific customer
            </h3>
            <div className="upload-options">
                <button><Link to='/customers' style={{textDecoration:'none',color:'white'}}>Upload Dataset</Link></button>
                <button><Link to='/customer' style={{textDecoration:'none',color:'white'}}>Review One Customer</Link></button>
            </div>


        </div>
    )

}