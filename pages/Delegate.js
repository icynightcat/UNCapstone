import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import './delegate.css'
import SpeakersList from "../components/SpeakersList";
import CoolButton from "../components/CoolButton";
import DelegateToggle from "../components/DelegateToggle";
import CurrentMotion from "../components/CurrentMotion";
import MessageDias from "../components/MessageDias";
import WorkingGroupsList from "../components/WorkingGroupsList";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Notifications from "../components/Notifications";

// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(false);
  const [motion, setMotion] = useState({});
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(false);

  const notificationClick = () => {
    setOpenNotification(!openNotification);
    console.log('clicked notifications')
  };

  const toggleClick = () => {
    setFormal(!formal);
    console.log("formal", formal);
  };

  useEffect( () => {
    // get notifications from database, have to do it as database updates
    setNotifications([
      {
        "id": 1,
        "type": "message",
        "content": "this is a good message",
        "sender": "Group 1",
        "read": false
      },
      {
        "id": 2,
        "type": "invite",
        "content": "join our group!",
        "sender": "Group 2",
        "read": false
      }
    ]);
  }, []);

  const readNotification = (id) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, ["read"]:true };
      }
      return notification;
    }))
  }

  useEffect( () => {
    console.log(notifications);
    setUnreadNotifications(notifications.some(notification => notification.read === false));
  }, [notifications]);

  useEffect(()=>{
    console.log("unreadNotifications", unreadNotifications);
  }, [unreadNotifications]);

  return (
    <div id="container">
      <Header version={'delegate'} country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
      <div id="main">
        <div id="toggleButton">
          <DelegateToggle formal={formal} onClick={toggleClick}/>
        </div>
        { formal ? (
          // this will be the formal delegate dashboard
          <>
            <SpeakersList />
            <div id="motion">
              <CurrentMotion motion={motion}/>
            </div>
            <div id="bottomButton">
              <CoolButton buttonColor={'#00DBD4'} textColor={'white'} buttonText={'view presentation screen'}/>
            </div>
            <div id="rightButton">
              <MessageDias />
            </div>
          </>
        ) : (
          // and here is the informal
          <>
            <WorkingGroupsList />
            <div className="notifications">
              {unreadNotifications ? (
                <NotificationsActiveIcon className="notifIcon" style={{fontSize:'56px', color:'#cb0000'}} onClick={notificationClick}/>
              ) : (
                <NotificationsIcon className="notifIcon" style={{fontSize:'56px'}} onClick={notificationClick}/>
              )}
            </div>
            <div className="notifications" style={{zIndex:'1'}} >
              { openNotification && (
                <Notifications notifications={notifications} readNotification={readNotification} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Delegate;
