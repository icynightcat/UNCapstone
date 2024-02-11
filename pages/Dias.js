import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import './DiasIndex.css';
import Header from "../components/Header";
import CoolButton from "../components/CoolButton";
import CreateConference from "../components/Create Conference/CreateConference";
import MyConference from "../components/MyConferences";
import countries from '../flags.json';
import { Accounts } from "meteor/accounts-base";
import bcrypt from 'bcryptjs';

// Placeholder for Dias screen
const Dias = () => {

  const [openModal, setOpenModal] = useState(false)

  const conferenceGroups = [
    {
      "conferenceName": "Aimun 2024",
      "status": "Active",
      "dateCreated": "24/03/01"
    },
    {
      "conferenceName": "Mini-Mun 2024",
      "status": "Archived",
      "dateCreated": "24/03/01"
    }
  ]

/*
Accounts.createUser(info, function(error) {

  if (Meteor.user()) {
    insertDias({ user: values.username, pass: values.password1 });
    localStorage.setItem('loggedInUser', JSON.stringify({ username: values.username, userType: 'dias' }));              navigate('/dias');
  } else {
    updateError({'error': error.reason})
  }
});

Accounts.createUser({username: 'Irelandxyz', password: 'xyz', country: 'Ireland', conference: 'xyz'})
*/
const accounts = [];

  const initializeDB = () => {
    // update this later and give it the actual conference ID of the conference created
    const conferenceId = 'xyz';
    countries.countries.forEach(country => {
      let pass = bcrypt.hashSync(conferenceId, 1);

      accounts.push({
        username: `${country.country + conferenceId}`, 
        services: {
          password: {
            bcrypt: pass
          },
          resume: {
            logintokens: []
          }
        }, 
        country: country.name, 
        conference: `${conferenceId}`});
    });
    
    Meteor.call('users.createAllDelegates', accounts, (error, result) => {
      if (error) {
        console.error('Failed to insert users:', error);
      } else {
        console.log('Users inserted successfully:', result);
      }
    });
  }
 
  return (
    <div className="fullPage">
        {openModal && <CreateConference closeModal={setOpenModal}/>}
        
        <Header version={'dias'}/>

        <div className="headerBar">
            <h6 className="myConference">My Conferences</h6>
        </div>

        <div className="mainBox">
          <div className="container">

          {conferenceGroups.map( (conferenceGroup, index) => (
              <MyConference key={conferenceGroup.conferenceName + index} conferenceGroup={conferenceGroup}/>
            ))}

            <div className="lineBlock">
              <div className="line">
              </div>
            
              <div className="buttonBlock">
              <CoolButton buttonText={"New"} onClick={() => {setOpenModal(true);}} buttonColor={'#FF9728'} textColor='white' />
              </div>
            </div>
            
          </div>
        </div>
        <CoolButton buttonText={"Initialize DB"} onClick={initializeDB}/>

    </div>
  );
}

export default Dias;



/*

{
  "_id": {
    "$oid": "65c80f73612fa5ba59f8ece0"
  },
  "username": "Afghanistanxyz",
  "services": {
    "password": {
      "bcrypt": "$2a$10$51/89ByAXryUY2lDW4FDCOKlREuCrJFRd1xe9IU9Mo3AUoGrJiZ5e"
    }
  },
  "country": "Afghanistan",
  "conference": "xyz"
}


,
{
  "_id": "pFbxKgHMSmr7jmPcr",
  "createdAt": {
    "$date": "2024-01-31T00:07:39.909Z"
  },
  "services": {
    "password": {
      "bcrypt": "$2b$10$wgRU9yB7U2afhoJCWPHf7exYp4oFbvhuUPmP9VYUaPwkGHEuuY7PC"
    },
    "resume": {
      "loginTokens": [
        {
          "when": {
            "$date": "2024-01-31T00:07:39.914Z"
          },
          "hashedToken": "LpsnWmmdhUAbg0bScSkWn+0cc0Tt3UwE2sC6C1Hd/Lw="
        }
      ]
    }
  },
  "username": "Irelandxyz",
  "country": "Ireland",
  "conference": "xyz"
},


*/