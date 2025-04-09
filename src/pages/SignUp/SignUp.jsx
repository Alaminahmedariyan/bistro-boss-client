import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL).then(() => {
        // create user entry in the database.
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      });
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input"
                  placeholder="Enter Your Name"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
                <label className="fieldset-label">Photo URL</label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  className="input"
                  placeholder="Photo URL"
                />
                {errors.name && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be 6 characters.
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password must be less then 20 characters.
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must have lower case, upper case, number and
                    spacial characters.
                  </span>
                )}

                {/* <button className="btn btn-neutral mt-4">SignUp</button> */}
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="sign Up"
                />
              </fieldset>
            </form>
            <p className="p-5">
              <small>
                Already Have an Account?{" "}
                <Link to="/login">
                  {" "}
                  <span className="text-red-400">Please Login</span>
                </Link>{" "}
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
