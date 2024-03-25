import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from '../app/authSlice';
import backarrow from '../assets/backarrow.svg'
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId:'',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://nike-shoe-e-commerce-server.vercel.app/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      const result = await res.json();
      if (result.status == 201) {
        dispatch(login({userId:result.rest._id,username:result.rest.username, email:result.rest.email}));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
    <button className="absolute top-5 left-9" onClick={()=>navigate('/')}>
      <img src={backarrow} className="w-8 active:scale-75"></img>
    </button>
      <div className="w-auto h-[400px] flex rounded-lg shadow-md border-2 border-blue-500">
        <div className="flex-2 flex items-center bg-white rounded-l-2xl">
          <form className="p-7 flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mt-5">Login to yout account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className="outline-none border-2 p-2 w-[300px] border-radius-10 rounded-lg bg-edf5f3 text-base"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="outline-none border-2 p-2 w-[300px] border-radius-10 rounded-lg bg-edf5f3 text-base"
            />
            <button type="submit" className="border-none outline-none py-2 px-0 bg-blue-500 rounded-full w-48 font-bold text-lg cursor-pointer text-white">
              Login
            </button>
          </form>
        </div>
        <div className="flex w-auto flex-col items-center justify-center gap-10 bg-blue-500 rounded-r-lg p-10">
          <h1 className="text-white font-bold text-3xl self-center">New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="border-none outline-none py-2 px-0 bg-white rounded-full w-48 font-bold text-lg cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
