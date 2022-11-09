import { auth } from '../utils/firebase';
import { useAuthState} from 'react-firebase-hooks/auth';
import { useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Message from '../components/message';

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

  console.log(myPost);

  useEffect(() => {
    getData()
  }, [user, loading])

  return(
    <div>
      <h1>Your posts</h1>
      <div>
        {
          myPost.map(post => (
            <Message key={post.id} {...post}></Message>
          ))
        }
      </div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
};
