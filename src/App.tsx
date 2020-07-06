import React, { useState, useCallback } from 'react';
import './App.css';
import { initAuthClient, scope } from './services/google.service';


const loginWithGoogle =  async () => {
  const authInstance = await initAuthClient();
  return authInstance.signIn();
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<gapi.auth2.GoogleUser>({} as gapi.auth2.GoogleUser);
  const [data, setData] = useState({});

  const login = useCallback(() => {
    loginWithGoogle()
      .then(res => {
        if (res.isSignedIn()) {
          setIsLoggedIn(true);
        }
        setUser(res);
      });
  }, []);

  const fetchData = useCallback(() => {
    // user.grantOfflineAccess(scope);
    const authRes = user.getAuthResponse();
    const { access_token, id_token } = authRes;
    fetch('http://localhost:7000/auth/youtube/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token, id_token,
      }),
    }).then(res => res.json()).then(setData);
  }, [user]);

  return (
    <div className="App">
      {
        !isLoggedIn && (
          <button
            className="rounded-lg border border-gray-400 hover:shadow-lg hover:border-gray-600 active:bg-blue-800 active:border-gray-600 shadow-md p-2 bg-blue-500 text-white"
            onClick={login}
          >
            Login with Google
          </button>
        )
      }
      {
        isLoggedIn && (
          <button
            className="rounded-lg border border-gray-400 hover:shadow-lg hover:border-gray-600 active:bg-blue-800 active:border-gray-600 shadow-md p-2 bg-blue-500 text-white"
            onClick={fetchData}
          >
            Fetch Data
          </button>
        )
      }
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  );
}

export default App;
