import React, {FC} from "react";
import plusSign from "../assets/images/plusSign.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "./FormInput";
import { imageSourcePrefix } from "../services";

export type RestaurantFormData = {
  name: string;
  photo?: FileList;
  address: string;
  city: string;
  zipCode: string;
}

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  photo: z.instanceof(FileList).optional(),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  zipCode: z.string().nonempty("Zip code is required")
})

function getLabelClass(anyPhoto: boolean) {
  const classNoBorder = "pl-0 pr-0 pt-0 pb-0 flex items-center justify-center w-24 h-24 px-4 py-6 bg-white text-blue rounded-lg cursor-pointer"

  if (anyPhoto) {
    return classNoBorder;
  }
  return classNoBorder + " border border-black border-dashed";
}

type RestaurantFormProps = {
  onSubmitHandler: SubmitHandler<RestaurantFormData>;
  defaultValues?: RestaurantFormData;
  defaultPhoto?: string;
}

const RestaurantForm: FC<RestaurantFormProps> = ({ onSubmitHandler, defaultValues, defaultPhoto }) => {
  defaultPhoto = defaultPhoto ? (imageSourcePrefix + defaultPhoto) : undefined;

  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch
  } = useForm<RestaurantFormData>({
    defaultValues: defaultValues ?? {
      name: "",
      photo: undefined,
      address: "",
      city: "",
      zipCode: "",
    },
    resolver: zodResolver(schema)
  });

  const { errors} = formState;

  const photo = watch('photo');

  const selectedPhoto = photo && photo[0];
  const anyPhoto = (selectedPhoto !== undefined) || (defaultPhoto !== undefined);

  return <form id="restaurantForm" className="border border-gray-300 rounded-lg mt-5 space-y-5" onSubmit={handleSubmit(onSubmitHandler)}>
    <div className="p-2 md:p-10">
      <h2 className="text-xl"><strong>Basic information</strong></h2>
      <div className="mt-5 flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <FormInput id="name" label="Name:" register={ register } errorMessage={ errors.name?.message } />
        </div>
        <div>
          <label htmlFor="photo">Photo</label>
          <label className={getLabelClass(anyPhoto)}>
            <img alt="add restaurant photo" className={ "w-1/4 h-auto" + (anyPhoto ? " hidden" : "")} src={plusSign}/>
            <input type='file' id="photo" className="hidden" {...register('photo')} />
            {(anyPhoto && <img src={photo !== undefined ? URL.createObjectURL(photo[0]) : defaultPhoto} className="w-24 h-24 rounded-lg" alt="restaurant photo"/>)}
          </label>

        </div>
      </div>

      <h2 className="text-xl p-0 mt-5"><strong>Address</strong></h2>
      <div className="mt-5 flex flex-col md:flex-row space-x-0 md:space-x-5">
      <div className="flex flex-col">
          <FormInput id="address" label="Address:" register={ register } errorMessage={ errors.address?.message } />
        </div>
        <div className="flex flex-col">
          <FormInput id="city" label="City:" register={ register } errorMessage={ errors.city?.message } />
        </div>
      </div>
      <div className="mt-5 flex space-x-5">
        <div className="flex flex-col mb-5">
          <FormInput id="zipCode" label="Zip code:" register={ register } errorMessage={ errors.zipCode?.message } />
        </div>
      </div>
      <div className="grid justify-items-center md:justify-items-end mt-12">
      <div className="space-x-5">
          <button onClick={() => reset()} className="text-black text-xs h-8 bg-white rounded-lg py-2 px-4 border border-black w-36" type="button">Discard changes</button>
          <button className="text-white text-xs h-8 bg-blue-700 rounded-lg py-2 px-4 w-32" type="submit">Save changes</button>
        </div>
      </div>
    </div>
  </form>
}

export default RestaurantForm;