import React from "react";
import { type SubmitHandler } from "react-hook-form";
import AccountForm, { AccountFormData, AccountFormMode } from "../components/AccountForm";
import useAuth from "../hooks/useAuth";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserApi } from "../services/index";
import { EditUserData } from "../models/user";
import { TextComponent } from "../components/TextComponent";

const customFormSchema = z.object({
  name: z.string().nonempty("First name is required").refine((firstName) => firstName.trim().replace(/ +/g, " ").split(" ").length === 1, {
    message: "Must contain single word",
  }),
  surname: z.string().nonempty("Last name is required").refine((lastName) => lastName.trim().replace(/ +/g, " ").split(" ").length === 1, {
    message: "Must contain single word",
  }),
  email: z.string().nonempty("Email is required").email("Email is not valid"),
  phoneNumber: z.union([
    z.string().refine((phoneNumber) => phoneNumber.replace(/ +/g, "").startsWith("+421"), {
      message: "Must start with +421 or +420",
    }),
    z.string().refine((phoneNumber) => phoneNumber.replace(/ +/g, "").startsWith("+420"), {
      message: "Must start with +421 or +420",
    })
  ]),
  password: z.string().refine((password) => password === "" || password.length >= 8, "Password must be empty or contain at least 8 characters"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  zipCode: z.string().nonempty("Zip code is required")
});

export const AccountPage: React.FC = () => {

  const { auth: data, isLoading, isError } = useAuth();

  if (isLoading) {
    return <TextComponent message="Loading ..."/>;
  }

  if (!data || isError) {
    return <TextComponent message="Unexpected error occurred ..."/>;
  }

  const queryClient = useQueryClient();
  const { mutateAsync: editAccount} = useMutation({
    mutationFn: (data: EditUserData) => UserApi.editAccount(data),
    onSuccess: () => {
      void queryClient.invalidateQueries(['auth']);
      alert('Saved successfully!');
    },
  })

  const onSubmit: SubmitHandler<AccountFormData> = (data: AccountFormData, event) => {
    event?.preventDefault();
    void editAccount( { ...data, password: data.password.length === 0 ? undefined : data.password, address: { ...data } })
  }

  return (
    <AccountForm
      onSubmitHandler={ onSubmit }
      mode={ AccountFormMode.ACCOUNT_UPDATE }
      defaultData={ { ...data, ...data.addresses[0], password: "" } }
      customSchema={ customFormSchema }
    />
  )
}