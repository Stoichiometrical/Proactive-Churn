import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerChurnForm from "./ChurnForm"
import Home from "./Homepage";
import UploadOption from "./Upload";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PredictionButton from "./UploadDataset";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/upload",
        element:<UploadOption/>
    },
    {
        path:"/customer",
        element:<CustomerChurnForm/>
    },
    {
        path:"/customers",
        element:<PredictionButton/>
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

