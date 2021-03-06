import React from 'react';
import { removeUserSession } from '../../Utils/Common';
import ToolBar from '../NavBar/Toolbar';
import NavBar from '../SideMenu/sideMenu';
import './HomeCleaner.css';
function HomeCleaner(props) {

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem('name');
    props.history.push('/');
  }
  return (
    <div className="contentPageGuest">
      <ToolBar name={localStorage.getItem('name')} />
      <div className="elementsHomePage">
          <NavBar />
        <div className="content">
          <h1>Content Cleaner Home Page.</h1>
          <input id="buttonLogOut" type="button" onClick={handleLogout} value="Logout" />
        </div>
      </div>

    </div>
  );
}

export default HomeCleaner;