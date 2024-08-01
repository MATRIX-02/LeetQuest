import React, { useState } from 'react';
import MyList from '../pages/MyList';
import UserList from '../pages/UserList';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('my-list');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('my-list')}>My List</button>
        <button onClick={() => setActiveTab('user-list')}>User List</button>
        <button onClick={() => setActiveTab('empty')}>Empty</button>
      </nav>
      <div>
        {activeTab === 'my-list' && <MyList />}
        {activeTab === 'user-list' && <UserList />}
        {activeTab === 'empty' && <div>Empty Tab</div>}
      </div>
    </div>
  );
};

export default Tabs;
