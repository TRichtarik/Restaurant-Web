import { FC, Key } from "react";
import { Link } from "react-router-dom";
import LeftIcon from "../assets/icons/arrow-right-50.svg";
import { OpeningHours, Restaurant } from "../models/restaurantTypes";
import { imageSourcePrefix } from "../services";

function dayOfWeekAsString(dayOfWeek: number): string {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek] || '';
}

function hoursReadable(date: Date): string {
  const newDate = new Date(date);
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');
  return hours + ":" + minutes;
}


const RestaurantCard: FC<Restaurant> = ({
  photo,
  name,
  id,
  description,
  openingHours,
}) => {

  return (
    <>
      <Link to={`${id}`}>
        <div className="flex flex-col p-4 border-2 border-gray-300 rounded-xl md:flex-row hover:bg-gray-100 w-full mb-5 items-center">
          {/* Photo - Name - Description */}
          <div className="flex flex-col md:flex-row md:max-w-3xl md:items-start md:flex-grow">
            <img
              className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48"
              src={(photo === null) ? "" : (imageSourcePrefix + photo)}
              alt="Restaurant photo"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold text-gray-900">
                {name}
              </h5>
              <p className="mb-3 font-normal text-gray-900">{description}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col p-4 leading-normal md:ml-auto">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Opening Hours
            </h5>
            {openingHours?.map((day: OpeningHours, index: Key | null | undefined) => (
              <p key={index} className="font-normal text-gray-900">
                {`${dayOfWeekAsString(day.dayOfWeek)}   : ${hoursReadable(day.openingTime)} - ${hoursReadable(day.closingTime)}`}
              </p>
            ))}
          </div>

          {/* Arrow Icon */}
          <div className="hidden md:flex md:items-center md:ml-4">
            <img src={LeftIcon} alt="Go to page" className="w-6 h-6" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default RestaurantCard;
