import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './RoomList';
import Room from './Room';
import SignupForm from './SignupForm'
import { useGlobalState } from '../RoomContextProvider';

const Pages = () => {
  const [ state ] = useGlobalState();
  const room = state.selectedRoom;

  return (
    <Router>
      <Routes>
        <Route 
          path="/rooms/:roomId" 
          element={room ? <Room room={room}/> : null} 
        />
        <Route 
          path="/rooms" 
          element={state.twilioToken ? <RoomList /> : <SignupForm />} 
        />
        <Route 
          path="/" 
          element={<SignupForm />} 
        />
      </Routes>
    </Router>
  );
}

export default Pages;