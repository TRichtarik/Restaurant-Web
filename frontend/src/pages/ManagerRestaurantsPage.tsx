import { FC, useState } from "react";
import ManagerOperation from "../components/ManagerOperation";
import RestaurantCard from "../components/RestaurantCard";
import PageHeader from "../components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "../services";
import { TextComponent } from "../components/TextComponent";



export const ManagerRestaurantsPage: FC = () => {
  const { data: restaurants, isError, isLoading } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => RestaurantsApi.getAll(),
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <TextComponent message="Loading ..."/>;
  if (isError) return <TextComponent message="An error occurred"/>;

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 p-5">
      <div className="flex justify-between items-center">
        <PageHeader title="Restaurants" />

      </div>
      <div className="w-full mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white"
          placeholder="Search for restaurants by name"
        />
      </div>
      <div className="w-full border-2 border-gray-300 p-6 rounded-lg flex flex-col justify-between ">
        <ManagerOperation
          linkUrl={"new"}
          description={"Create New"}
        />
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            photo={restaurant.photo}
            name={restaurant.name}
            description={restaurant.description}
            openingHours={restaurant.openingHours ?? []}
            id={restaurant.id}
          />
        ))}
      </div>
    </main>
  );
};
