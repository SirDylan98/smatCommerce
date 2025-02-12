import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext();/// create the context STEP1

// THE AUTHCONTEXTPROVIDER RETURNS AN AUTHCONTEXT.PROVIDER
export function AuthContextProvider({ children }) { // create the context provided STEP2
  const storedUser = localStorage.getItem('currentUser');
  let tempUser = JSON.parse(storedUser)
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({employeeNumber:tempUser?.employeeNumber,userName:tempUser?.userName,userRole:tempUser?.role}); // used to store the current user details
  const [congratulations,setCongratulations]=useState({})
/* THESE ARE ALL FUNCTION WE WANT TO PASS AS PROPS BUT ACCESSED GLOBALLY VIA THE CONTEXT API d*/
useEffect(() => {
  if (storedUser) {
    setCurrentUser(JSON.parse(storedUser));
    console.log("*********************************** On refresh ")
  }else{
    navigate('/')
  }
}, []);
  const updateUser=(user)=>{
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  const updateCongratulations=(details)=>{
    console.log("************************************",congratulations)
    setCongratulations(details)
  }
  const logoutUser = () => {
    setCurrentUser({});
    localStorage.removeItem('currentUser');
  };
  return (
    // The value props is where we put the props we want to subscribed from // this allows us to subscribe to 
    <AuthContext.Provider value={{setCurrentUser,setCongratulations,congratulations, currentUser,logoutUser,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);// the useContext allows us to listen to the state changes of our props
}
