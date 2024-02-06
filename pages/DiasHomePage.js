import { Typography, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import './DiasHomePageIndex.css';
import '../components/components.css';
import CoolButton from "../components/CoolButton";
//import Country from '../components/Country';
import SettingsIcon from '@mui/icons-material/Settings';
import PresentAbsentList from "../components/PresentAbsentList";
import StatusBox from "../components/StatusBox/StatusBox.js";
import MotionsDias from "../components/MotionsDias.js";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

// Placeholder for Dias screen
const DiasHome = () => {
  const countries = [
    { position: 1, countryName: 'Country A', flagPath: '/path/to/flagA.png' },
    { position: 2, countryName: 'Country B', flagPath: '/path/to/flagB.png' },
    // Add more countries as needed
  ];

  const countriesLists = [
    {
      "countryName": "Argentina"
    },
    {
      "countryName": "Canada"
    }
  ]

  const motionsListDias = [
    {
      "motionChosen": "SpeakerTime: 60 Seconds"
    },
    {
        "motionChosen": "Informal Session: 30 Minutes"
    }
  ]

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="HomePageDias">
        
        <div className="diasBar">
            <Paper id='logoback' elevation={0}>
                <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
            </Paper>
            <div className="diasTabs">
                <button className="tablinks" onClick={() => openTab(event,'RollCall')}>Roll Call</button>
                <button className="tablinks" onClick={() => openTab(event,'Formal')}>Formal</button>
                <button className="tablinks" onClick={() => openTab(event,'Informal')}>Informal</button>
                <button className="tablinks" onClick={() => openTab(event,'VotingProcedure')}>Voting Procedure</button>
                <button className="tablinks" onClick={() => openTab(event,'NotesDias')}>Notes to the Dias</button>
            </div>
            
            <button className="statusButton" onClick={() => {setOpenModal(true);}}>Status</button>
            <SettingsIcon id='settings'/>
        </div>

        {openModal && <StatusBox closeModal={setOpenModal}/>}

        <div id="RollCall" className="tabcontent">
            <div className="RollCallBlock">
                <div className="RollCallList">
                    <div className="searchBlock">
                            <input className="searchBox" placeholder="Search" type="text" />
                    </div>
                    <div className="titleBlock">
                        <h5 className="titles">Member State</h5>
                        <h5 className="titles">Absent</h5>
                        <h5 className="titles">Present</h5>
                        <h5 className="titles">Present & Voting</h5>
                    </div>
                    <div className="presentAbsentBlock">
                    {countriesLists.map( (countryList, index) => (
                    <PresentAbsentList key={countryList.countryName + index} countryList={countryList}/>
                    ))}
                    </div>
                </div>
            </div>

            <div className="buttonBlock1">
                <div className="firstBlock">
                <CoolButton buttonText={"Start Roll Call"} buttonColor={'#FF9728'} textColor='white' />
                <CoolButton buttonText={"Export"} buttonColor={'#00DB89'} textColor='white' />
                </div>
                <div className="secondBlock">
                <CoolButton buttonText={"Reset"} buttonColor={'#FF9728'} textColor='white' />
                </div>
            </div>
        </div>

        <div id="Formal" className="tabcontent">
            <div className="FormalBlock">
                <div className="SpeakerListBlock">
                    <div className="SpeakerListButtonBlock">
                        <div className="SpeakersListButton">Speakers List</div>
                    </div>
                    <div className="currentlySpeakingAndControl">
                        <div className="currentlySpeaking">
                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">Currently Speaking:</div>
                            </div>

                            <div className="currentlySpeakingBlock"></div>

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">In Queue:</div>
                            </div>

                            <div className="inQueueBlock"></div>

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">Speaker Timer:</div>
                            </div>

                            <div className="SpeakerTimerBlock">
                                <div className="Timer"></div>
                            </div>

                            <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Reset"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Pause"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Next"} buttonColor={'#FF9728'} textColor='white' />
                            </div>


                        </div>
                        <div className="control">
                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">Control</div>
                            </div>
                            <div className="controlInputBox">
                                <input className="controlInput" placeholder="Search" type="text" />
                            </div>
                            <div className="addButtonBlock">   
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                            </div>

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="controlList"></div>

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Clear List"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Close Speaker List"} buttonColor={'#FF9728'} textColor='white' />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="MotionsBlock">
                    <div className="MotionsButtonBlock">
                        <div button className="MotionsButton">Motions</div>
                    </div>

                    <div className="motionBlock">
                        <div className="addMotionBox">
                            <input className="MotionInput" placeholder="Type here..." type="text" />
                        </div>

                        <div className="addButtonBlock">   
                            <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="motionsAdded">
                        {motionsListDias.map( (aMotionDias, index) => (
                            <MotionsDias key={aMotionDias.motionChosen + index} aMotionDias={aMotionDias}/>
                            ))}
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>
                        
                        <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Clear All"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Send"} buttonColor={'#00DB89'} textColor='white' />
                        </div>


                    </div>

                    <div className="timerBlock">
                        <div className="controlTitleBlock">
                                <div h2 className="speakerTimerTitle">Speakers Timer: 60 Seconds</div>
                        </div>
                        
                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="timerLogos">
                            <div className="logos">
                            <CheckIcon style={{ color: "green" }} fontSize="large"/>
                            <CloseIcon style={{ color: "red" }} fontSize="large"/>
                            <RemoveIcon style={{ color: "yellow" }} fontSize="large"/>
                            </div>
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="controlTitleBlock">
                                <div h2 className="responders">Responded: / </div>
                        </div>

                    </div>

                    <div className="presentationButtonBlock">
                    <CoolButton buttonText={"Presentation"} buttonColor={'#00DB89'} textColor='white' />
                    </div>


                </div>
            </div>
        </div>

        <div id="Informal" className="tabcontent">
            <h3 className="head">Informal</h3>
        </div>

        <div id="VotingProcedure" className="tabcontent">
            <h3 className="head">Voting Procedure</h3>
        </div>

        <div id="NotesDias" className="tabcontent">
            <h3 className="head">Notes to the Dias</h3>
        </div>
    </div>
    );
}


export default DiasHome;