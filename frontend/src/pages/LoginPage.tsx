import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import logo from '../assets/images/coronaLogo.png';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

type LoginPage = {
    email: string;
    password: string;
    keepSigned: boolean;
}

const schema = z.object({
    email: z.string().nonempty("Email is required").email("Email is not valid"),
    password: z.string().refine((password) => password.length >= 8, {
        message: "Password must have a minimum length of 8 characters",
    })
})

const LoginPage: React.FC = () => {

    const { login } = useLogin({ redirect: '/auth/homepage' });

    const { register, handleSubmit, formState } = useForm<LoginPage>({
        defaultValues: {
            email: "",
            password: "",
            keepSigned: false,
        },
        resolver: zodResolver(schema),
    });

    /*
    const [keepSigned, setKeepSigned] = useState(false);

    const handleChange = () => {
        setKeepSigned(!keepSigned);
    };
    */

    const {errors} = formState;

    const onSubmit: SubmitHandler<LoginPage> = (data: LoginPage, event) => {
        event?.preventDefault();
        // data.keepSigned = keepSigned;
        void login({ email: data.email, password: data.password });
    }

    return (
      <div className="flex justify-center bg-white container mx-auto my-auto p-5">
          <form className=" h-full flex-col pr-0 mr-0 mt-10" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl mb-5"><strong>Login</strong></h1>
              <p className = "text-xs mb-10">Sign in with your data that you entered during your registration.</p>

              <div className="flex flex-col mb-5">
                  <label htmlFor="email">Email:</label>
                  <input className = "w-9/10 pl-4::placeholder: text-xs pl-2" id="email"  placeholder="name@example.com" {...register("email")}/>
                  <p className="error">{errors.email?.message}</p>
              </div>

              <div className="flex flex-col mb-10">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className = "w-9/10 pl-4::placeholder: text-xs pl-2" id="password" placeholder="min. 8 characters" {...register("password")} />
                  <p className="error">{errors.password?.message}</p>
              </div>
              {/*
              <div className="flex items-center mb-10">
                  <input
                    type="checkbox"
                    checked={keepSigned}
                    onChange={handleChange}
                    className="form-checkbox checkbox"
                  />
                  <span className="text-xs ml-2">Keep me logged in</span>
              </div>
                   */}
              <div className="flex flex-col mb-4">
                  <button className="text-white text-xs h-8 bg-blue-700 rounded-lg w-9/10" type="submit">Login</button>
              </div>

              <div className="flex justify-center text-xs mb-12">
                  <a href="#"><strong className="text-blue-700">Forgot password?</strong></a>
              </div>

              <div className="flex justify-center text-xs">
                  <p>Don&apos;t have an account? <Link to="/register"><strong className="text-blue-700">Sign up</strong></Link></p>
              </div>

          </form>
          <div className="pl-0 ml-10 hidden md:block">
              <img src={logo} alt="Restaurant logo" className="transform scale-75">
              </img>
          </div>
      </div>

    )
};

export default LoginPage;