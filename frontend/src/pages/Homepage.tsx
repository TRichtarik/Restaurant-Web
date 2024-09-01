import React, { FC } from "react";
import { Link } from "react-router-dom";
import food1 from "../assets/images/food1.jpg";
import food2 from "../assets/images/food2.jpg";
import food3 from "../assets/images/food3.jpg";

type CardProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  linkUrl: string;
};

const PresentationCard: FC<CardProps> = ({ imgSrc, imgAlt, title, description, linkUrl }) => {
  return (
    <Link to={linkUrl}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
        <img
          className="rounded-t-lg h-56 object-cover w-full"
          src={imgSrc}
          alt={imgAlt}
        />
        <div className="p-5">
          <h5 className="mb-3 text-2xl font-bold text-gray-900 ">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export const Homepage: FC = () => {
  return (
    <>
      <div className="container mx-auto px-40 pt-5">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to Our Restaurant!
          </h1>
          <p className="text-xl text-center">
            Experience the unique fusion of tradition and innovation in our
            dishes. Each plate is a culinary journey that you'll never forget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PresentationCard
            imgSrc={food1}
            imgAlt="Food 1"
            title="Corona: An Unforgettable Culinary Journey"
            description="Corona: A culinary journey of global flavors, traditional recipes, and a commitment to quality."
            linkUrl="/auth/restaurant"
          />
          <PresentationCard
            imgSrc={food2}
            imgAlt="Food 2"
            title="Our Story"
            description="From crisis to cuisine: Discover our journey as a Corona-themed restaurant."
            linkUrl="/auth/restaurant"
          />
          <PresentationCard
            imgSrc={food3}
            imgAlt="Food 3"
            title="Come Dine with Us"
            description="Indulge in a delightful dining experience with us. Come dine and savor the flavors!"
            linkUrl="/auth/restaurant"
          />
        </div>
      </div>
    </>
  );
};
