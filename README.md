# Hotel Booking Platform

Welcome to the Hotel Booking Platform, a modern and interactive application designed to offer users a seamless and engaging experience for discovering and booking hotel rooms. This project emphasizes robust functionality, secure authentication, and responsive design to deliver a trustworthy platform for users.

## Features

- **Responsive Design**: The platform is fully responsive and optimized for mobile, tablet, and desktop devices.
- **Secure Authentication**: Utilizes Firebase Authentication to ensure user data security.
- **Room Booking**: Users can browse available rooms and book their desired accommodations easily.
- **User Reviews**: Users can leave reviews and ratings for rooms to share their experiences.
- **Interactive Design**: Includes an image slider and other interactive elements for a visually engaging experience.
- **Environment Variables**: Sensitive keys (Firebase and MongoDB credentials) are securely stored using environment variables.
- **Modern Design**: The platform features an aesthetically pleasing color palette, proper alignment, and adequate spacing for optimal user experience.

## Technologies Used

### Frontend
- React
- TailwindCSS with DaisyUI
- PostCSS
- Vite

### Backend
- Node.js with Express.js
- MongoDB for database management

### Other Tools
- ESLint for code quality
- Firebase for authentication

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/hotel-booking-platform.git
   cd hotel-booking-platform
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     VITE_FIREBASE_API_KEY=your-firebase-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id
     VITE_FIREBASE_APP_ID=your-firebase-app-id

     MONGO_URI=your-mongodb-connection-string
     ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Project Highlights

- **Slider Component:** A dynamic image slider showcases rooms, enhancing visual appeal.
- **Review System:** Users can submit reviews and ratings for rooms.
- **Booking Feature:** An intuitive booking system allows users to select dates and confirm their reservations.
- **Secure Configurations:** Firebase keys and MongoDB credentials are stored securely using environment variables.

## Design Philosophy

The platform prioritizes:
- User-friendly navigation
- Proper alignment and spacing for all elements
- Eye-pleasing color contrast

## Important Notes

- This project is an original implementation aimed at showcasing the ability to build a unique, modern platform. **Any similarity to existing projects (module assignments or conceptual ideas) will result in a penalty, as outlined in the guidelines.**
- Special care has been taken to ensure the design does not resemble Gobindo's design approach or style.

## Screenshots

*(Add screenshots of your platform here to visually demonstrate the features.)*

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for checking out the Hotel Booking Platform! If you have any questions or feedback, feel free to reach out.
