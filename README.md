# Admin Dashboard - Candidate Management System

A modern, responsive admin dashboard built with Node.js, Express, MongoDB, and vanilla JavaScript for managing candidates with full CRUD operations.

## Features

- 🔐 **Authentication System**: Secure login/signup with JWT tokens
- 👥 **Candidate Management**: Full CRUD operations (Create, Read, Update, Delete)
- 📊 **Analytics Dashboard**: Real-time statistics and insights
- 🔍 **Search & Filter**: Advanced search and status filtering
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔒 **Secure**: Password hashing, JWT authentication, input validation

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - ES6+ features
- **Font Awesome** - Icons

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd admin-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### 5. Run the application
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 6. Access the application
Open your browser and navigate to:
- **Login Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard (after login)

## Usage

### Authentication
1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Use your credentials to access the dashboard
3. **Logout**: Click the logout button in the sidebar

### Candidate Management
1. **Add Candidate**: Click "Add Candidate" button and fill the form
2. **View Candidates**: All candidates are displayed in a responsive table
3. **Edit Candidate**: Click the "Edit" button to modify candidate information
4. **Delete Candidate**: Click the "Delete" button and confirm
5. **Search**: Use the search box to find specific candidates
6. **Filter**: Use the status filter to view candidates by status

### Analytics
- View real-time statistics including total candidates, applied, interviewing, and hired counts
- Navigate between different sections using the sidebar

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Candidates
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get single candidate
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `PATCH /api/candidates/:id/status` - Update candidate status

## Project Structure

```
admin-dashboard/
├── models/
│   ├── User.js          # User model with password hashing
│   └── Candidate.js     # Candidate model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── candidates.js    # Candidate CRUD routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── public/
│   ├── index.html       # Login/signup page
│   ├── dashboard.html   # Main dashboard
│   ├── styles.css       # All styles
│   ├── auth.js          # Authentication logic
│   └── dashboard.js     # Dashboard functionality
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Features in Detail

### Security Features
- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin resource sharing protection

### User Experience
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: CSS transitions and animations
- **Real-time Updates**: Instant feedback for all operations
- **Search & Filter**: Quick candidate lookup
- **Status Management**: Track candidate progress

### Data Management
- **Comprehensive Fields**: Name, email, phone, position, experience, skills, education, status, notes
- **Status Tracking**: Applied, Interviewing, Hired, Rejected
- **Education Details**: Degree, institution, graduation year
- **Skills Array**: Comma-separated skills list

## Customization

### Styling
- Modify `public/styles.css` to change colors, fonts, and layout
- Update gradient colors in CSS variables
- Customize animations and transitions

### Functionality
- Add new fields to the Candidate model in `models/Candidate.js`
- Extend API endpoints in `routes/candidates.js`
- Add new features in `public/dashboard.js`

### Database
- Modify MongoDB connection in `server.js`
- Add new models in the `models/` directory
- Update validation rules in routes

## Deployment

### Environment Variables
Make sure to update the following for production:
- `JWT_SECRET`: Use a strong, unique secret key
- `MONGODB_URI`: Use your production MongoDB connection string
- `PORT`: Set your desired port number

### Production Considerations
- Use HTTPS in production
- Set up proper CORS configuration
- Implement rate limiting
- Add logging and monitoring
- Use environment-specific configurations

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify MongoDB installation

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing process on port 3000

3. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `.env`
   - Verify token expiration

4. **CORS Errors**
   - Check API_BASE_URL in frontend JavaScript
   - Verify server CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository. 