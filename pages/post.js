import {auth, db} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useRouter} from 'next/router';
import {  useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function post() {

  const [post, setPost] = useState({description: ""});
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const submitPost = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "posts");

    //run checks
    if(!post.description) {
      toast.error("Description field empty😃",{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1500
      })
    }
    
    if(post.description.length > 300) {
      toast.error("Description too long",{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1500
      })
    }

    // make a post
    await addDoc(collectionRef,{
      ...post, 
      timestamp : serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName
    });

    setPost({description:""});
    return route.push('/');
  }

  return (
    <div className='my-20 py-12 px-7 shadow-lg rounded-lg max-w-md mx-auto'>
      <form onSubmit={submitPost}>
        <h1 className='text-2xl font-bold'>Create a new post</h1>
        <div>
          <h3 className='text-lg font-medium py-2'>Description</h3>
          <textarea value={post.description} onChange={e => setPost({...post, description: e.target.value})} className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-small'></textarea>
          <p className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? 'text-red-500' : ""}`}>{post.description.length}/300</p>
        </div>
        <button type='submit' className='py-2 px-4 mt-2 text-sm bg-cyan-500 text-white rounded-lg font-medium w-full'>submit</button>
      </form>
    </div>
  )
};
