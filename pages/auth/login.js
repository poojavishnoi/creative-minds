import {FcGoogle} from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from '../../utils/firebase';
import  {useRouter}  from 'next/router';
import { useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function login() {
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      route.push("/")
    }else{
      console.log("login");
    }
  }, [user]);
  
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // route.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  

  return(
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button onClick={GoogleLogin} className="text-white w-full bg-gray-700 font-medium rounded-lg p-4 gap-2 flex align-middle">
        <FcGoogle className="text-2xl"/>
        Sign in with Google</button>
      </div>
    </div>
  );
};
