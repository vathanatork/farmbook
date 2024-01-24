import React ,{useState} from "react"
import { useNavigate, useLocation} from 'react-router-dom'
import { usePostLogin } from "../hooks/usePostLogin";
import { useAuth } from "../auth/auth";
import { Button,Alert} from "@material-tailwind/react";
import { Warning } from "../icons/Warning";

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [_error,setError] = useState(false);
  const [_loading,setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/'

  const onSuccess = (data) => {
    setLoading(false);
    if(data.data.code == 404 || data.data.code == 403){
      setError(true);
    }
    
    if(data.data.data){
      // Save token to localStorage
      sessionStorage.setItem('access_token', data.data.data.token);
      // Save user data to localStorage
      sessionStorage.setItem('user_data', JSON.stringify(data.data.data.user));
      setEmail('');
      setPassword('');
      auth.setAccessToken(data.data.data.token);
      navigate(redirectPath, { replace: true });
    }
  }
  
  const onError = () => {
    console.error('Unexpected data structure or missing data in the response:', data);
  }

  const {data,isLoading,refetch} = usePostLogin(email,password,onSuccess,onError);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    refetch();
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg  dark:border md:mt-0 lg:max-w-[500px] sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full ">
            <h1 className="text-xl text-center font-normal leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Sign in
            </h1>
            <form onSubmit={(e) => handleLogin(e)} className="space-y-4 md:space-y-6" >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 required"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              
              <Button type="submit" fullWidth color='blue' loading={_loading} 
                className="flex justify-center items-center"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Alert 
        open={_error} 
        onClose={() => setError(false)}
        className="w-[300px] absolute right-0 bottom-0 mb-3 mr-3"
        icon={<Warning/>}
        animate={{
          mount: { x: 0 ,opacity: 1},
          unmount: { x: '100%', opacity: 0},
        }}
      >
        {data?.data.message ? "Unauthenticate" : ''}
      </Alert>

    </section>
  );
};

export default Login;
