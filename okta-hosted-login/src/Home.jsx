/*
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: '/' });
  };

  const resourceServerExamples = [
    {
      label: 'Search for Users Okta Verify Status',
      url: 'https://custom-support-app-a4a2296070eb.herokuapp.com/ft.html',
    },

  ];

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="home">
      <div>
        <Header as="h1">DCJ-ID - Proof of ID</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p id="welcome">
            Administrator : &nbsp; <b>
            {userInfo.name}</b>
            
          </p>
          <p>
            Welcome to the DCJ ID Page.

          </p>
          <h3>Search for user</h3>
          <p>This application allows you to search for a users Okta Verify details and then trigger an Okta Verify Push challenge</p>
         
               <ul>
             {resourceServerExamples.map((example) => <li key={example.url}><a href={example.url}>{example.label}</a></li>)}
          </ul>   
          
          
 <h3>Okta User Lookup</h3>

     
          
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>Access the DCJ-ID home page.</p>
          <p>
            <span>To confirm access please click the login button. </span>
           

          </p>
          <p>
            When you click the login button below, it will ensure that you have correct privledges to access to the application.
          </p>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}

      </div>


    </div>
  );
};
export default Home;
