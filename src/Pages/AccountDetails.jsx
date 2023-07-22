import { BiCoinStack } from 'react-icons/bi';
import { FetchUsers } from '../FetchUsers'
import profile from '/src/assets/profileDark.png'
import { HiOutlineTicket } from 'react-icons/hi';
import { Link, Outlet, useLocation } from 'react-router-dom';
const AccountDetails = () => {
    const { authorizedUser } = FetchUsers();
    const location = useLocation()

  return (
    <div className="container account-details-sections my-5">
        <div className="user-profile-container">
            <h3>Account Details</h3>
            <div className='account-details'>
                <div className='user-account-info'>
                    <div className='img-container'>
                        {authorizedUser.img !== undefined ? <img src={`${URL}/${authorizedUser.img}`}/>:<img src={profile}/>}
                    </div>
                    <div className='infos'>
                        {
                            authorizedUser.firstName  != undefined  ? 
                            <>
                                <p className='user-name'>{authorizedUser.firstName + ' ' + authorizedUser.lastName}</p>
                                <p>{authorizedUser.address}</p>
                                <p className='memberShip'>{authorizedUser.memberShip}</p>
                            </>
                            :
                                'loading...'
                        }
                    </div>
                </div>
                <div className="vouchers-and-coins-container">
                    <div className="coins-container">
                        <div className='icon-container'>
                            <div className='icon-main-container'>
                                <span className='icon'>
                                    <BiCoinStack/>
                                </span>
                                <p>Coins</p>
                            </div>
                            <p className='coins-count'>
                                    {authorizedUser.coins != undefined ? authorizedUser.coins:'0'}
                            </p>
                        </div>
                        <div className='coins-list'>
                            <p>
                                Buying more products earns you more coins! More rewards coming soon!
                            </p>
                        </div>
                    </div>
                    <div className="vouchers-container">
                        <div className='icon-container'>
                            <div className="icon-main-container">
                                <span className='icon'>
                                    <HiOutlineTicket/>
                                </span>
                                <p>Vouchers</p>
                            </div>
                            <p className='voucher-count'>{authorizedUser.vouchers != undefined ? authorizedUser.vouchers.length:'0'} </p>
                        </div>
                        <div className="vouchers-list-container">
                            <div className="lisf-of-vouchers">
                                <table>
                                <thead>
                                    <tr>
                                    <th>Voucher Name</th>
                                    <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authorizedUser.vouchers != undefined
                                    ? authorizedUser.vouchers.map((voucher, index) => (
                                        <tr key={index}>
                                            <td>{voucher.name}</td>
                                            <td>{voucher.salePercentage}%</td>
                                        </tr>
                                        ))
                                    : null}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="purchase-history mt-5">
            <div className='purchase-history-head'>
                <h3>Purchase History</h3>
                <div className="links-container">
                    <Link to='/accountDetailsAndHistory' className={`${location.pathname ==='/accountDetailsAndHistory' ? 'link-active':''}`}>To Ship</Link>
                    <Link to='/accountDetailsAndHistory/torecieve' className={`${location.pathname ==='/accountDetailsAndHistory/torecieve' ? 'link-active':''}`}>To Receive</Link>
                    <Link to='/accountDetailsAndHistory/torate' className={`${location.pathname ==='/accountDetailsAndHistory/torate' ? 'link-active':''}`}>To Rate</Link>
                    <Link to='/accountDetailsAndHistory/completed' className={`${location.pathname ==='/accountDetailsAndHistory/completed' ? 'link-active':''}`}>Completed</Link>
                    <Link to='/accountDetailsAndHistory/cancelled' className={`${location.pathname ==='/accountDetailsAndHistory/cancelled' ? 'link-active':''}`}>Cancelled</Link>
                </div>
            </div>
            <div className='components-display'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AccountDetails