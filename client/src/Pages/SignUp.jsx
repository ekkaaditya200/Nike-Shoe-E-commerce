import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import backarrow from '../assets/backarrow.svg';
import toast from "react-hot-toast";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://nike-shoe-ecommerce-store.onrender.com/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await res.json();
      console.log(result);
      if (result.status == 201) {
        toast.success("SignUp Successful !");
        navigate('/signin');
      }
    } catch (error) {
      toast.error("SignUp Failed !");
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      <button className="absolute top-5 left-9" onClick={() => navigate('/')}>
        <img src={backarrow} className="w-8 active:scale-75"></img>
      </button>
      <div className="w-auto h-[400px] md:h-auto flex rounded-lg shadow-md border-2 border-blue-500 md:flex-col">
        <div className="flex w-auto flex-col items-center justify-center gap-10 bg-blue-500 rounded-l-md md:rounded-none p-10">
          <h1 className="text-white font-bold text-3xl self-center">Welcome Back</h1>
          <Link to="/signin">
            <button type="button" className="border-none outline-none py-2 px-0 bg-white rounded-full w-48 font-bold text-lg cursor-pointer">
              Login
            </button>
          </Link>
        </div>
        <div className="flex-2 flex items-center bg-white rounded-2xl">
          <form className="p-7 flex flex-col gap-5 items-center" onSubmit={handleSubmit} >
            <h1 className="text-2xl font-bold mt-5">Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
              className="outline-none border-2 p-2 w-[300px] border-radius-10 rounded-lg bg-edf5f3 text-base"
            />
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
            {/* {error && <div className={styles.error_msg}>{error}</div>}
                    {message && <div className={styles.success_msg}>{message}</div>} */}
            <button type="submit" className="border-none outline-none py-2 px-0 bg-blue-500 rounded-full w-48 font-bold text-lg cursor-pointer text-white">
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>


  )
}

export default SignUp
