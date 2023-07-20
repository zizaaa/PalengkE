import axios from "axios";
import { useEffect, useState } from "react"
import profile from '/src/assets/profileDark.png'
import { Link, useNavigate } from "react-router-dom";

const Messages = () => {
    const navigate = useNavigate()
    const [message, setMessages] = useState([])
    const env = import.meta.env;
    const URL = env.VITE_REACT_SERVER_URL
  
    useEffect(()=>{
      const fetchMessages = async()=>{
        try {
          const { data } = await axios.get(`${URL}/messages`)
            setMessages(data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchMessages()
    },[])


    const markAsRead = async(id)=>{
        try {
            const model={
                read:true,
            }

            await axios.put(`${URL}/message/${id}`,model)
                navigate(`/adminDashboard/notifications/message/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="messages-component">
            {
        message.map((item)=>(
          <button onClick={()=>{markAsRead(item._id)}} key={item._id} className={`${item.read === false || item.read === undefined ? 'message-boxes-unread':''} message-boxes`}>
              <div className="message-left-content">
                  <div className="img-container">
                      <img src={profile}/>
                  </div>
                  <div className="message-info">
                    <p>{item.fullName}</p>
                    <p>{item.email}</p>
                    <p>{item.number}</p>
                  </div>
                  <div className="message">
                    <p>
                        "{(item.message).length <= 30 ? item.message :`${(item.message).slice(0,30)}...`}"
                    </p>
                  </div>
              </div>
          </button>
        ))
      }
    </div>
  )
}

export default Messages