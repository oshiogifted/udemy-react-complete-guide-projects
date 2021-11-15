import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn'); // return the value of 'isLoggedIn' key

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true); // its fine now, cuz we run it in useEffect()
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // save to local storage => 1 - logged in, 0 - not logged in
    localStorage.setItem('isLoggedIn', '1');

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    //localStorage.setItem('isLoggedIn', '0'); // when user hits logout button, clear local storage (use 0 - diff from 1) or...
    localStorage.removeItem('isLoggedIn'); // ...same as above
    setIsLoggedIn(false);
  };
 */
  const ctx = useContext(AuthContext);

  return (
   /*  <React.Fragment>  no longer needed since AuthContext acts as the root now*/
      /* <AuthContext.Provider value={{ // 'value' is built in to Context provider
        isLoggedIn: isLoggedIn, // all child components can now listen to changes to isLoggedIn state
        onLogout: logoutHandler
      }}> */
      <React.Fragment>
        <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home  />}
        </main>
      </React.Fragment>
       /* </AuthContext.Provider> */ 
    /*  </React.Fragment> */ 
  );
}

export default App;
