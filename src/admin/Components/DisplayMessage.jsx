import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

const DisplayMessage = () => {
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

    const { id } = useParams()
    const toDisplayMessage = message.find((item) => item._id === id)


    const deleteMessage = async(id)=>{
      try {
        await axios.delete(`${URL}/message/${id}`)
        navigate('/adminDashboard/notifications')
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="display-message-component">
        {
          toDisplayMessage != undefined ? 
            <div className="display-message-wrapper">
              <div className="header">
                <div className="header-info">
                  <p>{toDisplayMessage.fullName}</p>
                  <p>{toDisplayMessage.email}</p>
                  <p>{toDisplayMessage.number}</p>
                </div>
                <div className="header-button">
                  <button onClick={()=>{deleteMessage(toDisplayMessage._id)}} className="header-delete-button">Delete</button>
                </div>
              </div>
              <div className="user-message-content">
                {toDisplayMessage.message}
              </div>
            </div>
          :
            ''
        }
    </div>
  )
}

export default DisplayMessage