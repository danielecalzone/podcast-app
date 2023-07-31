# Podcaster

Podcaster is a web application that allows users to explore and listen to a wide range of podcasts. Users can discover top podcasts, view podcast details, and listen to episodes. The app provides a user-friendly interface for seamless podcast browsing and listening.

## Features

-  Top Podcasts: Displays a list of 100 podcasts in various categories.
-  Podcast Details: Provides detailed information about a selected podcast, including episodes.
-  Episode Details: Allows users to view information about a specific episode and listen to it.
-  Search: Enables users to search for podcasts based on title or author.
-  Responsive Design: The app is fully responsive, providing an optimal viewing experience on different devices.

## Technologies Used

- React: JavaScript library for building user interfaces.
- React Router: Library for routing and navigation in a React application.
- React Testing Library: Testing utility for testing React components.
- Jest: JavaScript testing framework.
- HTML: Markup language for structuring the app's content.
- CSS: Styling language for visually enhancing the app.

## How to Execute the App in Development Mode

1. Clone the repository: `git clone https://github.com/danielecalzone/podcast-app.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open the app in your browser: `http://localhost:3000`

## How to Execute the App in Production Mode

To run the app in production mode, follow these steps:

1. Build the production version of the app by running the following command: `npm run build`
   
This will create an optimized build of the app in the build directory.

2. Install a static server to serve the built files. For example, you can use serve: `npm install -g serve`
  
3. Start the static server and serve the production build: `serve -s build`
4. Open your browser and visit the provided URL to access the app in production mode.
   The app is now running in production mode and is optimized for better performance.

Note: In production mode, the app's files are minified, and unnecessary development code is removed, resulting in a smaller and more efficient bundle. 
This mode is recommended for deployment to production servers.

## Project Structure

- `/src`: Contains the source code of the app.
    - `/components`: Reusable React components.
    - `/hooks`: Custom hooks for fetching data from APIs.
    - `/styles`: CSS stylesheets for styling the app.
    - `/tests`: React tests for the app.

## Tests

The app includes unit tests to ensure the correctness of its components and functionality. You can run the tests using the following command:
`npm test`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
