import React, {FC, useEffect, useState} from 'react';
import DownIcon from "../assets/icons/arrow-toggle-down-svgrepo-com.svg";
import UpIcon from "../assets/icons/arrow-toggle-up-svgrepo-com.svg";
import PlusIcon from "../assets/icons/plus-circle-1425-svgrepo-com.svg"
import MinusIcon from "../assets/icons/minus-circle-1429-svgrepo-com.svg"
import AddToCartIcon from "../assets/icons/add-to-cart-svgrepo-com.svg"
import PageHeader from "../components/PageHeader";
import { useSetRecoilState } from "recoil";
import { currentOrderAtom } from "../state/atoms";
import { useParams } from "react-router";
import { OrderState, OrderType } from "../models/orderTypes";
import { RestaurantsApi } from '../services';
import { MenuApi } from '../services/index';
import { useQuery } from '@tanstack/react-query';
import { Menu, MenuItemType } from "../models/menuTypes";
import photo from "../assets/images/pribor-tanier.png";
import { TextComponent } from '../components/TextComponent';

const titleForCourseType = (type: MenuItemType) => {
    switch (type) {
        case MenuItemType.MAIN_COURSE:
            return "Main course";
        case MenuItemType.SOUP:
            return "Soup";
        case MenuItemType.DESSERT:
            return "Dessert";
        case MenuItemType.NON_ALCOHOLIC_BEVERAGE:
            return "Non-Alcoholic beverage";
        case MenuItemType.ALCOHOLIC_BEVERAGE:
            return "Alcoholic beverage"
    }
}

export type MenuItemProps = {
    imageSrc: string | undefined;
    name: string;
    description: string;
    price: number;
    setTotalCounter: (quantity: number) => void;
};

export const MenuItem: FC<MenuItemProps> = ({ name, description, price, setTotalCounter }) => {
    const [counter, setCounter] = useState(0);

    const handleIncrease = () => {
        if (counter < 10) {
            setCounter(counter + 1);
            setTotalCounter(counter+1);
        }
    };

    const handleDecrease = () => {
        if (counter > 0) {
            setCounter(counter - 1);
            setTotalCounter(counter-1);
        }
    };

    return (
      <div className="flex items-start space-x-4 mb-4">
          <img src={photo} alt="Food image" className="w-24 h-24 object-cover rounded-lg" />
          <div className="flex-1">
              <h4 className="font-bold">{name}</h4>
              <p>{description}</p>
          </div>
          <div className="flex items-center space-x-2">
              <span className="font-bold">${price}</span>
              <div className="flex items-center space-x-2">
                  <button onClick={handleDecrease}>
                      <img src={MinusIcon} alt="Decrease" className="w-6 h-6" />
                  </button>
                  <span>{counter}</span>
                  <button onClick={handleIncrease}>
                      <img src={PlusIcon} alt="Increase" className="w-6 h-6" />
                  </button>
              </div>
          </div>
      </div>
    );
};

export type CourseBoxProps = {
    title: string;
    children: React.ReactNode;
};

export const CourseBox: FC<CourseBoxProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div className="border-2 border-gray-300 rounded-lg cursor-pointer my-4">
          <div className="flex justify-between items-center p-4" onClick={toggleBox}>
              <h3 className="text-lg font-bold">{title}</h3>
              <img src={isOpen ? UpIcon : DownIcon} alt="Toggle" className="w-4 h-4" />
          </div>
          {isOpen && <div className="p-4">{children}</div>}
      </div>
    );
};

export type DayBoxProps = {
    day: string;
    children: React.ReactNode;
};

export const DayBox: FC<DayBoxProps> = ({ day, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div className="border-2 border-gray-300 rounded-lg cursor-pointer">
          <div className="flex justify-between items-center p-4" onClick={toggleBox}>
              <h2 className="text-xl font-bold">{day}</h2>
              <img src={isOpen ? UpIcon : DownIcon} alt="Toggle" className="w-6 h-6" />
          </div>

          {isOpen && <div className="p-4">{children}</div>}
      </div>
    );
};

export const MenuPage: FC = () => {

    const { restaurantId } = useParams();

    const setOrder = useSetRecoilState(currentOrderAtom);
    const [menuItems, setMenu] = useState<Menu[]>([]);

    const { data: menuData, isLoading, isError } = useQuery(
      ["menu", restaurantId],
      () => MenuApi.getAll(restaurantId ?? "")
    );

    useEffect(() => {
        if (menuData) {
            setMenu(menuData);
        }
    }, [menuData]);

    const { data: restaurant } = useQuery({
        queryKey: ["restaurant", restaurantId],
        queryFn: () => RestaurantsApi.getSingle(restaurantId ?? ""),
    });

    // Moved the hooks above this condition
    if (!restaurantId || isNaN(parseInt(restaurantId))) {
        return <TextComponent message="Oops! This restaurant doesn't seem to exist" />
    }

    if (isLoading) return <TextComponent message="Loading ..."/>;
    if (isError) return <TextComponent message="An error occurred"/>;

    if (!menuItems) {
        return <TextComponent message="Oops! Something went wrong!" />
    }

    const locationName = restaurant?.name;

    const handleAddToCart = (itemId: number, quantity: number) => {
        setMenu(menuItems.map((menu) => {
            return {
                ...menu,
                menuItems: menu.menuItems.map((menuItem) => {
                    return { ...menuItem, amount: menuItem.id === itemId ? quantity : menuItem.amount }
                })
            };
        }));
    };

    const handleCheckout = () => {
        let menuIndex: number | undefined = undefined
        menuItems.forEach((menu, index) => {
            menu.menuItems.forEach((item) => {
                if (menuIndex !== -1 && item.amount > 0) {
                    if (menuIndex !== undefined && menuIndex !== index) {
                        alert('Sorry, you cannot order from multiple menus at once!');
                        menuIndex = -1;
                        return;
                    }
                    menuIndex = index
                }
            });
        });

        if (menuIndex === undefined) {
            alert('Please order at least one item.');
            return;
        }

        if (menuIndex === -1) {
            return;
        }

        setOrder({
            restaurantId: parseInt(restaurantId),
            state: OrderState.PREPARING,
            scheduledFor: menuItems[menuIndex ?? 0].date,
            type: OrderType.DELIVERY,
            items: menuItems[menuIndex ?? 0].menuItems.filter((item) => item.amount > 0)
        });
        alert('Order saved!');
    };

    return (
      <div>
          <div className="container mx-auto px-4">
              <PageHeader title={`Menu for ${locationName}`} />
              <div className="w-full border-2 border-gray-300 p-6 rounded-lg flex flex-col justify-between space-y-4">
                  {menuItems.map(menu => (
                    <DayBox key={menu.id} day={new Date(menu.date).toDateString()}>
                        {menu.menuItems.map(menuItem => (
                          <CourseBox key={menuItem.id} title={titleForCourseType(menuItem.type)}>
                              <MenuItem
                                imageSrc={menuItem.description}
                                name={menuItem.description}
                                description={"Placeholder description of the best meal you've ever experienced."}
                                price={menuItem.price}
                                setTotalCounter={(quantity) => handleAddToCart(menuItem.id, quantity)}
                              />
                          </CourseBox>
                        ))}
                    </DayBox>
                  ))}
                  <button onClick={handleCheckout} className="w-full p-4 border-2 border-gray-300 text-gray-300 rounded-lg flex items-center justify-center mt-6">
                      <img src={AddToCartIcon} alt="Add to cart" className="w-6 h-6 mr-2" />
                      <h3 className="text-black font-bold">Add to Cart</h3>
                  </button>
              </div>
          </div>
      </div>
    )
}
