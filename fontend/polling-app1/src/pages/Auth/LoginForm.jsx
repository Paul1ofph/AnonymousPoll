import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Authinput from '../../components/input/Authinput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosassistance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'


const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)


  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()
  
// Handle Login form submit
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("please enter the password")
      return
    }

    setError("")

    // Login API
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      })
      const {token, user} = response.data

      if (token){
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message){
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again")
      }
    }
  }

  return (
    <AuthLayout>
    <div className='lg:w-[70%} h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px} mb-6'>
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Authinput
        value={email}
        onChange={({target}) => setEmail(target.value)}
        label="Email Address"
        placeholder="john@example.com"
        type="text"
        />
        <Authinput
        value={password}
        onChange={({target}) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          Login
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <Link className='font-medium text-primary underline' to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
    </AuthLayout>
  )
}

export default LoginForm