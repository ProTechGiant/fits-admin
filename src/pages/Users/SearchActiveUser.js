import React, { useEffect } from 'react'

const SearchActiveUser = ({accountCheck,handleAccountStatus}) => {
    

  const [usersData, setUsersData] = React.useState([]);
  const [userAccountStatus, setUserAccountStatus] = React.useState("");
  useEffect(()=>{
    setUsersData(accountCheck)
  },[])
  const handle=(e)=>{
    setUserAccountStatus(e.target.value)
    const query = e.target.value;
    const serachingRes=query===""?usersData:usersData.filter((item) => {
    return item.accountVerified === query;
  });
handleAccountStatus(serachingRes)

  }
  return (
    <div style={{ overflow: "hidden", textOverflow: "ellipses",width:"40%" }}>
    <select
      name="AccountStatus"
      id="AccountStatus"
      className={`form-control`} 
      onChange={(e) => handle(e)}
      value={userAccountStatus}
    
    >
      <option
        value=""
      >
        Select
      </option>
      <option
        value="approved"
        disabled={userAccountStatus ===  "approved" ? true : false}
      >
        Approved
      </option>
      <option
        value="pending"
        disabled={userAccountStatus === "pending" ? true : false}
      >
        Pending
      </option>
      <option
        value="disapproved"
        disabled={userAccountStatus === "disapproved" ? true : false}
      >
        Disapproved
      </option>
     
    </select>
  </div>
  )
}

export default SearchActiveUser