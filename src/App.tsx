import React, { useState, useCallback } from 'react';
import './App.css';
import { initAuthClient, scope } from './services/google.service';
import { Button } from './components/Button';


const loginWithGoogle =  async () => {
  const authInstance = await initAuthClient();
  return authInstance.signIn();
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSpotifyLogin, setIsSpotifyLogin] = useState(false);
  const [user, setUser] = useState<gapi.auth2.GoogleUser>({} as gapi.auth2.GoogleUser);

  const loginWithGoogleFunc = useCallback(() => {
    loginWithGoogle()
      .then(res => {
        if (res.isSignedIn()) {
          setIsLoggedIn(true);
        }
        setUser(res);
      });
  }, []);

  const loginWithSpotify = useCallback(() => {
    window.location.replace('http://localhost:50459/login/spotify');
  }, []);

  return (
    <div className="App flex justify-center items-center h-screen flex-col">
      {/* {
        !isLoggedIn && (
          <Button
            onClick={loginWithGoogleFunc}
          >
            Login with Google
          </Button>
        )
      } */}
      {
        !isSpotifyLogin && (
          <Button
            onClick={loginWithSpotify}
          >
            Login with Spotify.
          </Button>
        )
      }
    </div>
  );
}

export default App;
