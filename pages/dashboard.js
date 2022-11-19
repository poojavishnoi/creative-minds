import { auth } from '../utils/firebase';
import { useAuthState} from 'react-firebase-hooks/auth';
import { useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { collection,deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Message from '../components/message';
import {BsFillTrashFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import Link from 'next/link';

export default function dashboard() {

  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [myPost, setMyPost] =  useState([]);

  const getData = () => {
    if(loading) return;
    if(!user) return route.push('/auth/login')

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where('user', '==', user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyPost(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    })

    return unsubscribe
  }

    //delete post
    const deletePost = async (id) => {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
    }


  useEffect(() => {
    getData()
  }, [user, loading])

  return(
    <div>
      <h1>Your posts</h1>
      <div>
        {
          myPost.map(post => {
            return(
          <Message key={post.id} {...post}>
          <div className='flex gap-4'>
          <button onClick={() => deletePost(post.id)} className="text-pink-600 flex items-center justify-center gap-2 pt-2 text-sm">
          <BsFillTrashFill className='text-xl'/>
          Delete</button>
          <Link href={{pathname:'/post', query:post}}>
          <button className="text-gray-600 flex items-center justify-center gap-2 pt-2 text-sm">
          <AiFillEdit className='text-2xl'/>
          Edit</button>
          </Link>
          </div>
          </Message>
        )
          })
        }
      </div>
      <button className='font-medium text-white bg-gray-800 py-2 px-4 my-6' onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
};
