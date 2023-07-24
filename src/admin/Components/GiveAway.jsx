import axios from "axios"
import { useState,useEffect } from "react"
import { AiFillGift } from "react-icons/ai";

const GiveAway = () => {
  const luckyUser = JSON.parse(localStorage.getItem('lucky'))
  const [adminVoucher, setAdminVoucher] = useState([]);

  let vouchList = []
  let choosenUser = []
  const [isDisable, setIsDisable] = useState(false)

  const [userTemplate, setUserTemplate] = useState('')
  const [vouchTemplate, setVouchTemplate] = useState('')

  const pickWinner =()=>{
    setIsDisable(true)
    adminVoucher[0].vouchers.forEach(vouch => {
      vouchList.push(vouch)
    });
    luckyUser.forEach(user => {
      choosenUser.push(user)
    });

    setTimeout(()=>{
      const env = import.meta.env;
      const URL = env.VITE_REACT_SERVER_URL;

      const vouchRandNum = Math.floor(Math.random()*vouchList.length)
      const userRandNum = Math.floor(Math.random()*choosenUser.length)
      const winnerVouch = vouchList[vouchRandNum]
      const userWinner = choosenUser[userRandNum]

      const templateName = `Name: ${userWinner.name}`
      setUserTemplate(templateName)
      const templateVouch = `Voucher: ${winnerVouch.name} ${winnerVouch.salePercentage}%`
      setVouchTemplate(templateVouch)

      const updatedVouch = async()=>{
        try {
          await axios.put(`${URL}/user/${userWinner.id}`,{
            vouchers:[...userWinner.vouch,winnerVouch]
          })
          //remove the winner
          const newList  = choosenUser.filter((user)=> userWinner.id != user.id)
          localStorage.setItem('lucky',JSON.stringify(newList))
          setIsDisable(false)
        } catch (error) {
          console.log(error)
        }
      }
      updatedVouch()

    },100)
  }

  useEffect(() => {
    const env = import.meta.env;
    const URL = env.VITE_REACT_SERVER_URL;

    const isToday = (dateString) => {
      const currentDate = new Date();
      const providedDate = new Date(dateString);
    
      // Compare year, month, and day to check if they are the same
      return (
        currentDate.getFullYear() === providedDate.getFullYear() &&
        currentDate.getMonth() === providedDate.getMonth() &&
        currentDate.getDate() === providedDate.getDate()
      );
    };

    const fetchAct = async () => {
      try {
        const { data } = await axios.get(`${URL}/activities`);

        // Filter lucky users based on today's date
        const luckyUsersToday = data.filter((act) => isToday(act.createdAt) && act.price >= 1000);
        // setLuckyUser(luckyUsersToday);
        localStorage.setItem('lucky',JSON.stringify(luckyUsersToday))
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVouchers = async()=>{
        try {
          const { data } = await axios.get(`${URL}/admins`)
          setAdminVoucher(data)
        } catch (error) {
          console.log(error)
        }
    }

    fetchVouchers()

    fetchAct();
  }, []);

  return (
    <div className="give-away-section px-md-3">
        <div className="give-away-head">
            <h1 className="give-away-title">
                Rewards
            </h1>
            <p>
              Reward loyal customer by just click!
            </p>
        </div>
        <div className="lucky-winner-container">
            <div className="lucky-user-container">
                <p>{userTemplate}</p>
                <p>{vouchTemplate}</p>
            </div>
            <button disabled={isDisable} className="random-pick-button" onClick={pickWinner}>Random pick</button>
        </div>
        <div className="give-away-content-container">
            <div className="users-container">
                {
                  luckyUser != undefined ?
                  luckyUser.map((user,index)=>(
                    <div className="accepted-users" key={index}>
                      <div className="left-side">
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                      </div>
                      <div className="right-side">
                        <span className="icon">
                          <AiFillGift/>
                        </span>
                      </div>
                    </div>
                  )):''
                }
            </div>
            <div className="vouchers-list-container">
                {
                  adminVoucher != '' ?
                    adminVoucher[0].vouchers.map((vouch,index)=>(
                      <div className="voucher-info" key={index}>
                          <p>
                            {vouch.name}
                          </p>
                          <p>
                            {vouch.salePercentage}% off
                          </p>
                      </div>
                    ))

                    :
                    'Loading...'
                }
            </div>
        </div>
    </div>
  )
}

export default GiveAway