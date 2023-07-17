import "./pages.scss"
import UploadOption from "./Upload";
import CustomerChurnForm from "./ChurnForm";
import {
    createBrowserRouter, Link,
    RouterProvider,
} from "react-router-dom";


export default function Home(){

    return(
        <>
            <div className="home-container">
                <h1>Proactive Customer Retention Management</h1>
                <h4>Once you get them,dont loose them.Find the best way to keep your customers from churning before they even consider cancelling thier subscriptions with our world class churn prediction models powered by expert marketing strategies</h4>
                <div className="get-started">
                    <Link to='/upload' style={{textDecoration:'none',color:'white'}}>Get Started</Link>
                    </div>
            </div>

        </>
    )
}