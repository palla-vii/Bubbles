/**
 * App.jsx - Main entry point for the React application
 *
 * This component serves as the root of our React app.
 * It will eventually contain:
 * - AuthContext provider (to wrap authentication state)
 * - SocketContext provider (to wrap Socket.io connection)
 * - Router (to handle page navigation)
 *
 * For now, it's a simple component that shows we're ready to build!
 */

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="welcome-card">
        <h1>💬 Welcome to MERN Chat App</h1>
        <p>
          This is Phase 1 of your learning journey. The frontend is set up and
          ready!
        </p>

        <div className="phase-info">
          <h2>📋 Build Phases</h2>
          <ul>
            <li>
              <span className="phase-badge done">✅</span> Phase 1: Project
              Setup
            </li>
            <li>
              <span className="phase-badge next">→</span> Phase 2: Database &
              Models
            </li>
            <li>
              <span className="phase-badge">3</span> Phase 3: JWT Auth
            </li>
            <li>
              <span className="phase-badge">4</span> Phase 4: REST API Routes
            </li>
            <li>
              <span className="phase-badge">5</span> Phase 5: Socket.io
              Real-Time
            </li>
            <li>
              <span className="phase-badge">6</span> Phase 6: React Frontend UI
            </li>
          </ul>
        </div>

        <div className="server-status">
          <h3>🔧 Next Steps:</h3>
          <ol>
            <li>Make sure both servers are running:</li>
            <ul>
              <li>Backend: <code>cd server && npm run dev</code></li>
              <li>Frontend: <code>cd client && npm run dev</code></li>
            </ul>
            <li>Check backend health: Open <a href="http://localhost:5000/api/health" target="_blank">http://localhost:5000/api/health</a></li>
            <li>Continue with Phase 2: Connect MongoDB and create Mongoose models</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
