import React, {HTMLInputTypeAttribute} from 'react';
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegister<T>;
  type?: HTMLInputTypeAttribute;
}

function FormInput<T extends FieldValues>({ id, label, placeholder, errorMessage, register, type }: FormInputProps<T>) {

  return (
    <div className="flex flex-col mt-5 md:ml-5">
      <label htmlFor={ id }>{ label }</label>
      <input className="grid w-70 sm:w-80 pl-4::placeholder: text-xs pl-2" id={ id } type={ type }  placeholder={ placeholder } { ...register(id) }/>
      <p className="error">{ errorMessage }</p>
    </div>
  );
}

export default FormInput;