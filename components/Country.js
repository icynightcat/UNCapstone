import React, { useState, useEffect } from 'react';
import flagsData from '../flags.json';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { conferenceCollection, removeSpeaker} from '../imports/api/conference';

const Country = ({ position, countryName, blank }) => {
    const [speakersArray, setSpeakersArray] = useState([]);

    // Function to retrieve user information from localStorage
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('loggedInUser');
        return userString ? JSON.parse(userString) : null;
    };

    // Get user information from localStorage
    const user = getUserFromLocalStorage();

    // Find the country object in flagsData
    const countryObject = flagsData.countries.find(country => country.country === countryName);

    // If countryObject is not found, return null
    if (!countryObject) {
        console.error(`Flag not found for country: ${countryName}`);
        return null;
    }

    // Destructure flagPath from countryObject
    const { flagPath } = countryObject;

    // Check if the current user is the owner of the country
    const isCurrentUser = user && countryObject.country === user.country;

    // Check if the user is of type 'dias'
    let isDiasUser = user && user.userType === 'dias';

    // Use useTracker to reactively fetch data from the conference collection
    useTracker(() => {
        const handler = Meteor.subscribe('conference');
        const data = conferenceCollection.findOne({ sessionID: user.confID });
        if (data) {
            setSpeakersArray(data.speakers || []);
        }
    }, [user.confID]);

    // Define a handler function to remove the country
    const handleRemoveCountry = () => {
        if (isDiasUser) {
            // console.log("Remove country:", countryObject.country);
            // console.log("speakerID: ", speakerID);
            // Call the removeSpeaker function with the correct _id
            removeSpeaker({ sessionId: user.confID, _idspeaker: speakerID });
        }
    };

    // Define classNames based on conditions
    const classNames = isCurrentUser ? 'currentUser' : '';

    if (blank) {
        isDiasUser = false;
    }

    // Find the speaker object with the matching country
    const speakerObj = speakersArray.find(speakerObj => speakerObj.country === countryObject.country);

    // Define speakerID only if speakerObj is defined
    const speakerID = speakerObj ? speakerObj._id : null;

    // Render the component
    return (
        <li className={`countryItem ${classNames}`}>
            {isDiasUser && <button className="DeleteSpeaker" onClick={handleRemoveCountry}>X</button>}
            {position !== "" && <p className='countryname'>{position}</p>}
            <p className='countryname'>{countryObject.name}</p>
            <img id='itemflag' src={window.location.origin + flagPath} alt={`Flag of ${countryName}`} title={countryObject.name} />
        </li>
    );
};

export default Country;
