import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import Button from '../components/Button';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { handleUsers, setUsers } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';

function ForgetPassword() {
   const primaryColor = '#ff4d2d'
   const hoverColor = '#e64323'
   const bgColor = 'fff9f6'
   const borderColor = '#ddd'

   const [error, setError] = useState("")
   const [step, setStep] = useState(1)
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [email, setEmail] = useState("")
   const [newPassword, setNewPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")

   // const Users = JSON.parse(localStorage.getItem("data"))
   const Users = useSelector((state) => state.auth.users)
   const existUser = Users.findIndex((user) => {
      return user.email == email
   })
   console.log(Users)
   console.log(existUser, "index")

   function handleVarify(e) {
      e.preventDefault()
      if (!email) {
         setError("Fill the fields")
         return;
      }

      if (existUser == -1) {
         setError("Email doesn't exist")
         return;
      }
      setError("")
      setStep(3)
      toast.success("Verify Successfully")
   }

   function handleResetPassword(e) {
      e.preventDefault()
      if (!newPassword || !confirmPassword) {
         setError("Fill the fields")
         return;
      }

      if (newPassword !== confirmPassword) {
         setError("Password doesn't match")
         return;
      }
      // const temp = [...Users]
      // temp[existUser].password = newPassword
      dispatch(handleUsers({ cuser: existUser, newPassword }))
      // temp[existUser].confirmPassword = confirmPassword
      // localStorage.setItem("data", JSON.stringify(temp))
      setConfirmPassword("")
      setNewPassword("")
      setEmail("")
      navigate('/signin')
      setStep(1)
      toast.success("Password Reset Successfully")
   }

   return (
      <div className='w-full min-h-screen flex items-center justify-center p-4'
         style={{ backgroundColor: bgColor }}>
         <div className={`w-full mx-auto max-w-md shadow-lg rounded-xl mb-5 p-8 border-[1px] border-block/10 bg-white`}
            style={{ border: `1px solid ${borderColor}` }}>
            <div className='flex items-center gap-2 mb-4'>
               <IoIosArrowRoundBack size={30} onClick={() => navigate('/signin')} className='text-[#ff4d2d] cursor-pointer' />
               <h2 className="text-center text-2xl font-bold"
                  style={{ color: primaryColor }}>
                  Forget Password</h2>
            </div>

            {error && <p className='text-red-600 mt-8 text-center'>
               {error}</p>}

            {step == 1 &&
               <div>
                  <div className='mb-4'>
                     <Input
                        type="email"
                        label="Email: "
                        placeholder="Enter your email"
                        style={{ border: `1px solid ${borderColor}` }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                     />
                     <Button
                        type="submit"
                        onClick={handleVarify}
                        className={`w-full border justify-center gap-2 items-center transition
                           duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`} disabled={loading}>
                        {loading ? <ClipLoader size={20} color='white' /> : "Send Otp"}</Button>
                  </div>
               </div>
            }

            {step == 2 &&
               <div>
                  <div className='mb-4'>
                     <Input
                        type="text"
                        label="OTP: "
                        placeholder="Enter your OTP"
                        style={{ border: `1px solid ${borderColor}` }}
                     // onChange={(e) => setOtp(e.target.value)}
                     // value={otp}
                     />
                     <Button
                        type="submit"
                        // onClick={handleVarifyOtp}
                        className={`w-full border justify-center gap-2 items-center transition
                           duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`} disabled={loading}>
                        {loading ? <ClipLoader size={20} color='white' /> : "Varify Otp"}</Button>
                  </div>
               </div>
            }

            {step == 3 &&
               <div>
                  <div className='mb-4'>
                     <Input
                        type="password"
                        label="New Password: "
                        placeholder="enter new pasword"
                        style={{ border: `1px solid ${borderColor}` }}
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                     />

                     <Input
                        type="password"
                        label="Confirm Password: "
                        placeholder="confirm password"
                        style={{ border: `1px solid ${borderColor}` }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                     />
                     <Button
                        type="submit"
                        onClick={handleResetPassword}
                        className={`w-full border justify-center gap-2 items-center transition
                           duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`} disabled={loading}>
                        {loading ? <ClipLoader size={20} color='white' /> : "Reset Password"}</Button>
                  </div>
               </div>
            }
         </div>
      </div >
   )
}

export default ForgetPassword