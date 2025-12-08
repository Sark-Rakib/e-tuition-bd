import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import userAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = userAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log(data.photo[0]);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((res) => {
        reset();
        console.log(res.user);
        // update user profile
        const formData = new FormData();
        formData.append("image", profileImg);

        // send the photo url
        const img_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(img_Api_Url, formData).then((res) => {
          console.log(res.data);

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then((res) => {
              console.log(res);
              navigate(location?.state || "/");
            })
            .then((error) => {
              console.log(error);
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-4xl">Create an Account</h1>
      <p>Register with ZapShift</p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* name */}

          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* photo */}

          <label className="label">Photo</label>

          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
            placeholder="Your Photo"
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          {/* email */}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password */}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one uppercase, at least one lowercase,
              at least one number, and at least one special characters
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-[#CAEB66] mt-4">Register</button>
        </fieldset>
        <p className="text-center">Or</p>
      </form>
      <SocialLogin></SocialLogin>
      <h1>
        Already have an account?{" "}
        <Link
          state={location.state}
          className="underline text-red-400"
          to="/login"
        >
          Login
        </Link>{" "}
      </h1>
    </div>
  );
};

export default Register;
