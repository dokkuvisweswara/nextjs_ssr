import { useRouter } from "next/router";
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { SET_PROFILE_NAME } from "../../redux/store/profileSlice";
import { useState } from "react";

export default  function Login() {
    const [userName, setUserName] = useState('');
    const router = useRouter();
    const name = useSelector((state: RootState) => state.profile.name);
    const dispacth = useDispatch();

    console.log("----", name);
    const handleSubmit = () => {
      localStorage.setItem('userName', userName);
      dispacth(SET_PROFILE_NAME(userName));
      Router.push('/');
      }
    return(
      <div>
        <main>
          <h1>Profile name is : {name}</h1>
          <input type="text" name="name" value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="userName" /><br/>
          <input type="password" name="password" placeholder="password"/><br/>
          <button onClick={() =>handleSubmit()}>SUBMIT</button>
        </main>
      </div>
    )
}