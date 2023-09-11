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
      label: 'Node/Express Resource Server Example!!',
      url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    },
    {
      label: 'Java/Spring MVC Resource Server Example!!',
      url: 'https://github.com/okta/samples-java-spring/tree/master/resource-server',
    },
    {
      label: 'ASP.NET Core Resource Server Example!!',
      url: 'https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/resource-server',
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
            Administrator: 
            {userInfo.name}
            
          </p>
          <p>
            Welcome to the DCJ ID Page.

          </p>
          <h3>Search for user</h3>
          <p>Please enter a users email address in the search box</p>
          <p>Then click the push okta verify button to push an okta verify challenge to a users phone :</p>
          <ul>
            
          </ul>
          <p>
Once you have sent a challenge to the users phone, poll the phone by clicking this button
          </p>
          <body>
    <h1>Okta User Lookup</h1>
    <div>
        <label for="email">Email:</label>
        <input type="text" id="email" placeholder="Enter user's email">
        <button id="searchButton">Search</button>
    </div>
    <div id="userDetails">
        <!-- User details will be displayed here -->
    </div>

    <script>
        document.getElementById('searchButton').addEventListener('click', () => {
            const email = document.getElementById('email').value;
            if (!email) {
                alert('Please enter an email');
                return;
            }

            const oktaApiToken = '00ZySYfqE6Hv7lqEVp98dG6F5XaKvt1ohvsT8c0Xvf'; // Replace with your Okta API token
            const oktaApiEndpoint = 'https://facs.oktapreview.com/api/v1/users'; // Replace with your Okta API endpoint URL

            fetch(`${oktaApiEndpoint}?filter=profile.email eq "${email}"`, {
                method: 'GET',
                headers: {
                    'Authorization': `SSWS ${oktaApiToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Request failed with status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length === 0) {
                        alert('User not found');
                    } else {
                        const user = data[0];
                        const userDetails = `
                            <h2>User Details</h2>
                            <p>Username: ${user.profile.login}</p>
                            <p>Email: ${user.profile.email}</p>
                            <p>First Name: ${user.profile.firstName}</p>
                            <p>Last Name: ${user.profile.lastName}</p>
                        `;
                        document.getElementById('userDetails').innerHTML = userDetails;
                    }
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        });
    </script>
</body>
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
