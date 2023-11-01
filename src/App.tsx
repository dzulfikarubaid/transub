import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import Jemput from './pages/TJemput';
import './theme/variables.css';
import SignUp from './pages/SignUp';
import Start from './pages/Start';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Tabs from './pages/Tabs';
import AddPost from './pages/AddPost';
import Profile from './pages/TProfile';
import PostDetail from './pages/PostDetail';
import Apply from './pages/Apply';
import Kl from './pages/Kl';
import Antar from './pages/TAntar'
import Success from './pages/Success';
import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import WhatsApp from './pages/TWa';
import Deposit from './pages/TDeposit';
import Setting from './pages/TSetting';
setupIonicReact();

const App = () => {
  
  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={'/jemput'}><Jemput/> </Route>
        <Route exact path={'/WA'}><WhatsApp/></Route>
      <Route exact path={'/antar'}>
      <Antar></Antar>
      </Route>
      <Route exact path={'/deposit'}>
      <Deposit></Deposit>
      </Route>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
        <Route exact path="/">
          <Start/>
        </Route>
        <Route exact path="/signin">
          <SignIn/>
        </Route>
        <Route exact path="/setting">
          <Setting></Setting>
        </Route>
        <Route exact path="/signup">
          <SignUp/>
        </Route>
        <Route path='/app'>
          <Tabs/>
        </Route>
        <Route path={'/addpost'}>
          <AddPost></AddPost>
        </Route>
        <Route path={'/profile'}>
          <Profile></Profile>
        </Route>
        <Route path={'/detailpost'}>
          <PostDetail></PostDetail>
        </Route>
        <Route path={'/apply'}>
          <Apply></Apply>
        </Route>
        <Route path={'/ketentuan-layanan'}>
          <Kl></Kl>
        </Route>
        <Route path={'/success'}>
          <Success></Success>
        </Route>
        

        
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)};

export default App;
