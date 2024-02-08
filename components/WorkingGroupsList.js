import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Typography, Paper, Divider } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'
import WorkingGroup from "./WorkingGroup";
import MessageGroup from "./MessageGroup";
import CreateGroup from "./CreateGroup";
import { workingGroupCollection } from "../imports/api/workingGroups";

const WorkingGroupsList = () => {
  const [group, setGroup] = useState({});

  const chooseGroup = (newGroup) => {
    setGroup(newGroup);
  };

  const createGroup = () => {
    // create group and send to database
    // we need to get the information from the text boxes, i think as a state variable
    console.log("Create group pressed");
  }

  const sendMessage = () => {
    if (Object.keys(group).length > 0) {
      console.log("send message to group: ", group.groupName);
    }
  }
   // Use useTracker to reactively fetch data from the speakers collection
   const { workingGroupsDB } = useTracker(() => {
    const handler = Meteor.subscribe('workingGroups');
    const workingGroupData = workingGroupCollection.find().fetch(); 
    console.log("working groups",workingGroupData);
    return { workingGroupsDB: workingGroupData };
  });

  return (
    <>
      <div id='groups'>
        <Paper id='groupsTop' elevation={4}>
          <Typography variant='h4'>
            Working Groups
          </Typography>
        </Paper>
        <Paper id='groupsBody' elevation={4}>
          
          <div className="groupHolder">
            {/* {workingGroups.map( (workingGroup, index) => (
              <WorkingGroup key={workingGroup.groupName + index} workingGroup={workingGroup} chooseGroup={chooseGroup}/>
            ))} */}
          {workingGroupsDB.map( (workingGroup, index) => (
              <WorkingGroup key={workingGroup.name + index} workingGroup={workingGroup} chooseGroup={chooseGroup}/>
            ))} 
          </div>

          <div id='joinButton'>
            <CreateGroup />
          </div>
        </Paper>
      </div>

      <div>
        { Object.keys(group).length > 0 && (
          <>
            <Paper id='groupHolder'>
              <div id='groupDetails'>
                <Typography>{group?.groupName ?? "Group"}</Typography>
                <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
                {group?.countries?.map( (country, index) => (
                  <img className="workingGroupFlag" key={country.country + index} src={window.location.origin + `${country.flag}` } alt='United Nations Logo' />
                ))}
              </div>
              <hr className='blackLine'/>
              <Typography >Location: {group.location}</Typography>
              <Typography >Topic: {group.topic}</Typography>
              <div className="groupMessage">
                <MessageGroup onClick={sendMessage}/>
              </div>
            </Paper>
          </>
        ) }
      </div>
    </>
  );
};

export default WorkingGroupsList;