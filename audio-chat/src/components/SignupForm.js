import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '@twilio/voice-sdk';

import { useGlobalState } from '../RoomContextProvider';

const SignupForm = () => {
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        const nickname = state.nickname;
        setupTwilio(nickname);
        navigate('/rooms');
    };

   const setupTwilio = (nickname) => {
        fetch(`/api/token/${nickname}`)
        .then(response => response.json())
        .then(data => {
            // setup device
            const twilioToken = data.token;
            const device = new Device(twilioToken);
            device.updateOptions(twilioToken, {
                codecPreferences: ['opus', 'pcmu'],
                fakeLocalDTMF: true,
                maxAverageBitrate: 16000
            });
            device.on('error', (device) => {
                console.log("error: ", device)
            });
            setState((state) => {
                return {...state, device, twilioToken}
            });
        })
        .catch((error) => {
            console.log(error)
        })
    };


    const [state, setState] = useGlobalState();
    const updateNickname = (nickname) => {
        setState({...state, nickname});
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter nickname"
                onChange={ e => updateNickname(e.target.value)}
            />
             <input type="submit" value="Submit" />
        </form>
    );
};

export default SignupForm;