import { useContext ,useState} from "react";
import { createContext } from "react";
import { axiosClient } from "../utils/axiosClient";


const AuthContext = createContext({
    currentUser: null,
    accessToken: null,
    isAuth: () => {},
    isGuest: () => {},
    setAccessToken : () => {},
    setCurrentUser : () => {},
    logout : () => {},
    isLogout: false
});

export const AuthProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState({})
    const [accessToken, _setAccessToken] = useState(sessionStorage.getItem('access_token'));
    const [isLogout,setIsLogout] = useState(false);

    const setAccessToken = (token) => {
        _setAccessToken(token);
        if(token) {
            sessionStorage.getItem('access_token');
        }else {
            sessionStorage.removeItem('access_token');
        }
    }

    const isAuth = () => {
        if(accessToken){
            return true;
        }else{
            return false;
        }
    };

    const isGuest = () => {
        if(!accessToken){
            return true;
        }else{
            return false;
        }
    }

    const logout =async () => {
        try {
          const {data} = await axiosClient('/admin/logout');
          
          if(data.code === 200 || data.code === 403){
            //console.log(data.message);
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user_data');
            setIsLogout(true);
          }
          if(data.code === 404 ){
            console.log(data.message);
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user_data');
            setIsLogout(true);
          }
        } catch (error) {
          // Handle the error here
          if(error.code === 404 || error.code === 403){
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user_data');
            setIsLogout(true);
          }
          console.error(error);
        }
    }

    return (
        <AuthContext.Provider 
            value={{ currentUser ,isLogout,logout, isAuth , isGuest , setAccessToken,accessToken,setCurrentUser}}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)
}