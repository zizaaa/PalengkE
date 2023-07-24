import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Swal from 'sweetalert2';

const Notifications = () => {
  const env = import.meta.env;
  const uri = env.VITE_REACT_SERVER_URL

  const [activities, setActivities] = useState([])
  const [events, setEvents] = useState([])

  useEffect(()=>{

      const fetchAct = async()=>{
          try {
              const { data } = await axios.get(`${uri}/activities`)
                setActivities(data)
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: `${error}`,
              confirmButtonColor:'rgb(67,94,57)'
          });
          }
      }

      const fetchEvent = async()=>{
          try {
              const { data } = await axios.get(`${uri}/events`)
              setEvents(data)
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: `${error}`,
              confirmButtonColor:'rgb(67,94,57)'
          });
          }
      }


      fetchAct();
      fetchEvent();

  },[])

  const deleteAct =async(id)=>{
      try {
          await axios.delete(`${uri}/activities/${id}`)
          Swal.fire({
              icon: 'success',
              title: 'Success',
              confirmButtonColor:'rgb(67,94,57)'
          });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error}`,
          confirmButtonColor:'rgb(67,94,57)'
      });
      }
  }

  const deleteEvent =async(id)=>{
      try {
          await axios.delete(`${uri}/event/${id}`)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            confirmButtonColor:'rgb(67,94,57)'
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error}`,
          confirmButtonColor:'rgb(67,94,57)'
      });
      }
  }

  return (
    <div className="notification-sections px-3">
        <div className="notification-sections-head">
            <h1>Notifications</h1>
            <p>Keep track of all messages, activities, and events happening in your shop</p>
        </div>
        <div className="notification-content-sections">
            <div className="messages-sections">
                <div className="message-sections-head">
                  <h3>Messages</h3>
                </div>
                <div className="message-sections-content">
                    <Outlet/>
                </div>
            </div>
            <div className="event-activities-container">
              <div className="activities-sections-container">
                <div className="activities-sections-head">
                  <h3>Activities</h3>
                </div>
                <div className="activities-sections-content-wrapper">
                  {
                    activities.map((act,index)=>(
                      <div key={index} className="activities-sections-box">
                        <div className="act-message">
                            <p>{act.message}</p>
                        </div>
                        <div className="act-button">
                            <button onClick={()=>{deleteAct(act._id)}}>Delete</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="events-sections-content">
                  <div className="events-sections-head">
                      <h3>Events</h3>
                  </div>
                  <div className="events-sections-wrapper"
                  >
                    {
                      events.map((ev)=>(
                        <div className="events-sections-box" key={ev._id}>
                          <div className="event-message">
                              <p>{ev.event}</p>
                          </div>
                          <div className="event-button">
                              <button onClick={()=>{deleteEvent(ev._id)}} >Delete</button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Notifications