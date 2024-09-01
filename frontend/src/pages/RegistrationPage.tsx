import React from "react";
import { type SubmitHandler } from "react-hook-form";
import { AuthApi } from "../services";
import AccountForm, { AccountFormData, AccountFormMode } from "../components/AccountForm";
import {Link, useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: registrationData, mutate: register } = useMutation({
    mutationFn: AuthApi.register,
    retry: false,
    onSuccess: () => {
      void queryClient.invalidateQueries(['auth']);
      navigate("/auth/homepage");
    },
  });

  const onSubmit: SubmitHandler<AccountFormData> = (data: AccountFormData, event) => {
    event?.preventDefault();

    register({
      name: data.name,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
      password: data.password,
      email: data.email,
      address: {
        address: data.address,
        zipCode: data.zipCode,
        city: data.city
      }
    });

    console.log(registrationData);
  }

  return (
    <div className="lg:pt-20 lg:pb-36 container mx-auto py-4 px-4">
      <AccountForm onSubmitHandler={ onSubmit } mode={ AccountFormMode.REGISTRATION } ></AccountForm>
      <div className="flex justify-center text-xs mt-2.5">
        <p className="text-sm">Already have an account? <Link to="/login"><strong className="text-blue-700">Sign in</strong></Link></p>
      </div>
    </div>
  )
}