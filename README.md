# 🎬 CheckList Ultimate

**The ULTIMATE Full-Stack Entertainment Checklist Application**

> Track your favorite movies and TV series across ALL OTT platforms with powerful AI-driven features, professional UI components, robust testing framework, and production-ready deployment infrastructure.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Python](https://img.shields.io/badge/Python-3.9+-green?logo=python)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

---

## ✨ Key Features

### 🎯 Core Features
- ✅ **Track Watchlist** - Add, update, and manage all your watched content
- ✅ **Multiple OTT Platforms** - Link Netflix, Prime Video, Disney+, Hotstar, and more
- ✅ **Content Discovery** - Browse and discover new shows and movies
- ✅ **Advanced Statistics** - View detailed analytics on your viewing habits
- ✅ **Responsive Design** - Seamless experience on desktop, tablet, and mobile
- ✅ **Local Storage** - Data persists locally in your browser

### 🚀 Advanced Features
- 🤖 **AI Agent Integration** - Powered by Emergent Agent Framework
- 🛡️ **Authentication System** - Secure user authentication and authorization
- 📊 **Comprehensive Testing** - Full test coverage for backend and frontend
- 🎨 **Professional UI Library** - 50+ pre-built shadcn/ui components
- 🔌 **REST API** - Fully documented backend API
- 📱 **Progressive Web App** - Installable and works offline-ready

---

## 🏗️ Project Structure

```
checklist-ultimate/
├── frontend/                    # React.js Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # 50+ shadcn/ui components
│   │   │   ├── Content*.js     # Content management components
│   │   │   ├── Dashboard.js    # Statistics dashboard
│   │   │   ├── Discover.js     # Content discovery
│   │   │   ├── Login.js        # Authentication
│   │   │   ├── Profile.js      # User profile
│   │   │   ├── Search.js       # Content search
│   │   │   ├── Watchlist.js    # Main watchlist
│   │   │   └── Navbar.js       # Navigation
│   │   ├── context/            # Context API state management
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility libraries
│   │   ├── assets/             # Images and icons
│   │   ├── App.js              # Main app component
│   │   └── index.js            # React entry point
│   ├── package.json            # Frontend dependencies
│   └── craco.config.js         # Craco configuration for shadcn/ui
│
├── backend/                     # Python Flask Backend
│   ├── server.py               # Main server application
│   ├── requirements.txt        # Python dependencies
│   ├── tests/
│   │   ├── test_auth_features.py
│   │   └── test_new_features.py
│   └── README.md               # Backend documentation
│
├── .emergent/                  # AI Agent Configuration
├── memory/                     # Agent memory storage
├── test_reports/              # Test results and reports
├── tests/                     # Integration tests
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── package.json              # Root package.json (optional)
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.20.0
- **UI Components**: shadcn/ui (50+ components)
- **Styling**: CSS3 + Tailwind CSS
- **State Management**: Context API
- **Build Tool**: Create React App + Craco
- **Package Manager**: npm

### Backend
- **Framework**: Python Flask
- **Testing**: pytest (comprehensive test suite)
- **API**: RESTful API with JSON
- **Authentication**: JWT-based auth
- **Database**: (Ready for integration)

### DevOps & Quality
- **Version Control**: Git
- **Testing Framework**: Jest (Frontend) + Pytest (Backend)
- **Code Quality**: ESLint + Prettier
- **Deployment Ready**: CI/CD pipeline ready

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Python 3.9+ (for backend)
- pip (Python package manager)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python server.py
```

The API will be available at `http://localhost:5000`

---

## 📦 Build for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Production-ready files will be in the `build/` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

### Backend Deployment

```bash
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 server:app
```

---

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
pytest tests/
pytest tests/ -v  # Verbose output
```

---

## 📚 API Documentation

See `backend/README.md` for complete API documentation.

### Key Endpoints
- `GET /api/watchlist` - Fetch user's watchlist
- `POST /api/watchlist` - Add new content
- `PUT /api/watchlist/:id` - Update content
- `DELETE /api/watchlist/:id` - Remove content
- `GET /api/search` - Search for content
- `GET /api/statistics` - Get user statistics

---

## 🎨 UI Components

The project includes a professional UI component library powered by shadcn/ui:

- Accordion
- Alert Dialog
- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Checkbox
- Command
- Context Menu
- Dialog
- Drawer
- Dropdown Menu
- Form
- Hover Card
- Input
- Label
- Menu Bar
- Navigation Menu
- Pagination
- Popover
- Progress
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Skeleton
- Slider
- Sonner
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toaster
- Toggle
- Toggle Group
- Tooltip

And more! Import from `components/ui/*`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules (frontend)
- Follow PEP 8 (backend)
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Yashwanth Veluru**
- GitHub: [@yashwanthveluru63](https://github.com/yashwanthveluru63)
- LinkedIn: [in/yashwanth-veluru-a47450171](https://linkedin.com/in/yashwanth-veluru-a47450171)
- Location: Leander, Texas, USA

---

## 🙌 Acknowledgments

- **Shadcn/ui** - For the amazing UI component library
- **React Community** - For the excellent framework and ecosystem
- **Python Community** - For Flask and testing frameworks
- **Emergent Agent** - For AI agent framework integration

---

## ❤️ Made with passion for tracking your entertainment journey

**Happy Watching! 🎬🍿**
