# Proactive Churn

Proactive Churn enables businesses to assess a customer's likelihood of canceling their subscription, offering proactive recommendations to improve retention. With features like customer segmentation, custom recommendations, and proactive package creation, companies can optimize their strategies for high customer retention rates. The marketing team can either upload the full customer database and segment customers based on their churn probability, or they can tweak individual customer attributes to see the probability of churning.

## Project Description

This project leverages a telecom company dataset from the UCI ML Repository for a thorough business requirements analysis. Through exploratory data analysis, feature engineering, and selection, a churn prediction model has been trained. To bring it all together, the project utilizes the Django REST framework to build an API that seamlessly integrates with a React.js frontend, providing churn probabilities on-demand.

## Repository Structure

The repository structure is as follows:

- `churn/`: Contains the Django backend code for the API implementation
- `frontend/`: Contains the React.js frontend code for the user interface
- `data/`: Placeholder directory for the telecom company dataset (not included in the repository)
- `requirements.txt`: List of project dependencies


## Usage

To run the Proactive Churn application, follow these steps:

1. Install the required dependencies using the command: `pip install -r requirements.txt`
2. Set up the backend by navigating to the `churn/` directory and running the Django server: `python manage.py runserver`
3. Set up the frontend by navigating to the `frontend/` directory and installing the dependencies: `npm install`
4. Start the React development server: `npm start`
5. Access the application by opening a browser and navigating to `http://localhost:3000`

## Contributing

Contributions to Proactive Churn are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. For major changes, please discuss them in the Issues section before making modifications.

## License

This project is licensed under the [MIT License](LICENSE).
