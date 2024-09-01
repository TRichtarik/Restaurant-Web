import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SomeZodObject, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import PageHeader from "./PageHeader";
import useLogout from "../hooks/useLogout";

const formSchema = z.object({
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
  password: z.string().min(8, "Password must contain at least 8 characters"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  zipCode: z.string().nonempty("Zip code is required")
});

type AccountFormProps = {
  onSubmitHandler: SubmitHandler<AccountFormData>;
  defaultData?: AccountFormData;
  mode: AccountFormMode;
  customSchema?: SomeZodObject;
}

export type AccountFormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
}

export enum AccountFormMode {
  REGISTRATION,
  ACCOUNT_UPDATE
}

const AccountForm: React.FC<AccountFormProps> = ({
  onSubmitHandler,
  defaultData,
  mode,
  customSchema
}) => {

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<AccountFormData>({
    defaultValues: defaultData ?? {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      zipCode: ""
    },
    resolver: zodResolver(customSchema ?? formSchema),
  });

  const { logout } = useLogout({ redirect: "/login" });

  const { errors} = formState;

  const onLogoutClicked = () => {
    void logout();
  }

  return (
    <div className="flex bg-white">
      <div className=" mx-auto h-full flex-col">
        <PageHeader title={ mode === AccountFormMode.REGISTRATION ? "Create a new account" : "Account" } />
        <form id="registrationForm" className="border border-gray-300 rounded-lg mt-5 space-y-5" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="p-2 md:p-10">
            <h2 className="text-xl"><strong>Personal information</strong></h2>
            <div className="mt-5 flex flex-col md:flex-row">
              <FormInput id="name" label="First name:" register={ register } placeholder={"John"} errorMessage={ errors.name?.message } />
              <FormInput id="surname" label="Last name:" register={ register } placeholder={"Doe"} errorMessage={ errors.surname?.message } />
            </div>
            <div className="mt-0 md:mt-5 flex flex-col md:flex-row">
              <FormInput id="email" label="Email:" register={ register } placeholder={"name@example.com"} errorMessage={ errors.email?.message } />
              <FormInput
                id="password"
                label={ mode === AccountFormMode.REGISTRATION ? "Change password:" : "Password:" }
                register={ register }
                placeholder={"min. 8 characters"}
                type={"password"}
                errorMessage={ errors.password?.message } />
            </div>
            <div className="mt-0 md:mt-5 flex flex-col md:flex-row">
              <FormInput id="phoneNumber" label="Phone number:" register={ register } placeholder="+421" errorMessage={ errors.phoneNumber?.message } />
            </div>

            <h2 className="text-xl p-0 mt-10"><strong>Address</strong></h2>
            <div className="mt-0 md:mt-5 flex flex-col md:flex-row">
              <FormInput id="address" label="Address:" register={ register } errorMessage={ errors.address?.message } />
              <FormInput id="city" label="City:" register={ register } errorMessage={ errors.city?.message } />
            </div>
            <div className="mt-0 md:mt-5 flex flex-col md:flex-row">
              <FormInput id="zipCode" label="Zip code:" register={ register } errorMessage={ errors.zipCode?.message } />
            </div>
            <div className={ "flex mt-12" + (mode === AccountFormMode.REGISTRATION ? " justify-center md:justify-end" : " justify-between") }>
              { mode === AccountFormMode.ACCOUNT_UPDATE ?
                <div>
                  <button onClick={ onLogoutClicked } className="text-red-600 text-xs h-8 bg-white rounded-lg py-2 px-4 border border-black w-20" type="button">Log out</button>
                </div> : "" }
              <div className="flex flex-col md:flex-row justify-center">
                <button onClick={() => reset()} className="text-black text-xs h-8 bg-white rounded-lg py-2 px-4 border border-black w-36" type="button">Discard changes</button>
                <button className="mt-5 md:mt-0 ml-2 text-white text-xs h-8 bg-blue-700 rounded-lg py-2 px-4 w-32" type="submit">
                  { mode === AccountFormMode.REGISTRATION ? "Register" : "Save changes" }
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AccountForm;