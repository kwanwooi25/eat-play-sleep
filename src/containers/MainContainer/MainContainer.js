import React from 'react';

/** Components */
import Header from '../../components/Header/Header';
import TopNavigation from '../../components/TopNavigation/TopNavigation';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

const MainContainer = ({ route, children }) => {
  console.log(route);
  return (
    <main className={`main route-${route}`}>
      <Header />
      {route === 'charts' && <TopNavigation />}
      <div className="page-content">
        {children}
      </div>
      <BottomNavigation />


    </main>
  )
}

export default MainContainer;