import React, {FC} from "react";
import PageHeader from "../components/PageHeader";
import { SubmitHandler } from "react-hook-form";
import RestaurantForm, { RestaurantFormData } from "../components/RestaurantForm";
import { useParams } from "react-router";
import { RestaurantsApi } from "../services/index";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditRestaurantData } from "../models/restaurantTypes";
import { v4 as uuid } from 'uuid';
import { SupabaseClient } from "@supabase/supabase-js";
import ManagerOperation from "../components/ManagerOperation";
import { TextComponent } from "../components/TextComponent";
import { useNavigate } from "react-router-dom";

type EditRestaurantProps = {
  restaurantId: string;
}

const uploadPhoto = async (supabase: SupabaseClient, photo: File): Promise<string | undefined> => {
  const id = uuid();

  const {
    data: uploadData,
    error
  } = await supabase.storage.from('images').upload(id, photo);

  if (!uploadData?.path) {
    alert(error?.message);
    return undefined;
  }

  return id;
}

const EditRestaurantForm: FC<EditRestaurantProps> = ({ restaurantId }) => {
  const supabase = useSupabaseClient();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => RestaurantsApi.getSingle(restaurantId)
  });

  const { mutateAsync: editRestaurant } = useMutation({
    mutationFn: (data: EditRestaurantData) => RestaurantsApi.update(restaurantId, data),
    onSuccess: () => {
      alert('Saved successfully!');
    },
  })

  if (isLoading) {
    return <TextComponent message="Loading ..."/>;
  }

  const onSubmit: SubmitHandler<RestaurantFormData> = async (data, event) => {
    event?.preventDefault();

    void editRestaurant({
      ...data,
      photo: data.photo ? await uploadPhoto(supabase, data.photo[0]) : undefined,
      description: "Lorem ipsum dolor.",
      address: {
        ...data
      }
    });
  }

  const defaultValues = {
    name: restaurant?.name ?? "",
    photo: undefined,
    address: restaurant?.address?.address ?? "",
    city: restaurant?.address?.city ?? "",
    zipCode: restaurant?.address?.zipCode ?? ""
  }

  return <>
    <PageHeader title="Edit Restaurant" />
    <RestaurantForm onSubmitHandler={ onSubmit } defaultValues={ defaultValues } defaultPhoto={ restaurant?.photo ?? undefined } />
  </>
}

const CreateRestaurantForm: FC = () => {
  const supabase = useSupabaseClient();
  const navigateToEdit = useNavigate();

  const { mutateAsync: editRestaurant } = useMutation({
    mutationFn: (data: EditRestaurantData) => RestaurantsApi.create(data),
    onSuccess: (data) => {
      alert('Saved successfully!');
      navigateToEdit(`/auth/manager/restaurant/${data.id}`);
    },
  })

  const onSubmit: SubmitHandler<RestaurantFormData> = async (data, event) => {
    event?.preventDefault();
    console.log(data);
    void editRestaurant({
      ...data,
      photo: data.photo ? await uploadPhoto(supabase, data.photo[0]) : undefined,
      description: "Lorem ipsum dolor.",
      address: {
        ...data
      }
    });
  }

  return <>
    <PageHeader title="New Restaurant" />
    <RestaurantForm onSubmitHandler={ onSubmit } defaultValues={ undefined } />
  </>
}

export const ManagerRestaurantPage: FC = () => {
  const { restaurantId } = useParams();

  return (
    <main>
      <div className="flex bg-white container mx-auto py-4 px-4">
        <div className=" mx-auto h-full flex-col">
          { restaurantId && !isNaN(Number(restaurantId))
            ? <EditRestaurantForm restaurantId={ restaurantId } />
            : <CreateRestaurantForm />
          }
          <div className="mt-4">
            {
              restaurantId && !isNaN(Number(restaurantId))
                ? <ManagerOperation linkUrl={"menu"} description={"Add Menu"} />
                : ""
            }

          </div>
        </div>
      </div>
    </main>
  )
}