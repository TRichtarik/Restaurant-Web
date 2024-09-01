import React, { FC, useState } from 'react';
import binImage from '../assets/images/binImage.png'
import { MenuItemProps, CourseBox } from './MenuPage'

class MenuItemType {
    id: number
    item: MenuItemProps

    constructor(id: number, item: MenuItemProps) {
        this.id = id;
        this.item = item;
    }

}

class DayMenu {
    soups: MenuItemType[]
    meals: MenuItemType[]
    date: string | undefined;

    constructor() {
        this.soups = [];
        this.meals = [];
    }
}

class resultItem {
    description: string;
    price: number;

    constructor(description: string, price: number) {
        this.description = description;
        this.price = price;
    }
}

class resultMenu {
    soups: resultItem[]
    meals: resultItem[]
    date: string | undefined

    constructor() {
        this.soups = [];
        this.meals = [];
    }
}






export const ManagerMenuPage: FC = () => {
    const menu = new DayMenu();
    const locationName = "Uptown location"
    const [totoalCounter, setTotalCounter] = useState(0);

    

    function renderMenuItem(id: number, item: MenuItemProps, setItem: (items: MenuItemType[]) => void, items: MenuItemType[], deleteItem: (id: number) => void) {
        function setDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
            item.description = event.target.value;
            setItem([...items]);
        }

        function setPrice(event: React.ChangeEvent<HTMLInputElement>) {
            item.price = Number(event.target.value);
            setItem([...items]);
        }
        return (
            <li key={id.toString()} className="flex items-start space-x-4 mb-4">
                {/* <img src={imageSrc} alt="" className="w-24 h-24 object-cover rounded-lg" /> */}
                <div className="flex flex-col">
                    <textarea onChange={e => setDescription(e)} className="h-28 p-2 rounded-lg resize-none border-gray-300 border-2" defaultValue={item.description}></textarea>
                </div>
                <div className="flex items-center space-x-2">
                    <input onChange={e => setPrice(e)} className="font-bold w-20 text-center" type="number" min="0" inputMode="decimal" defaultValue={item.price}></input>
                    <button onClick={() => deleteItem(id)} type="button">
                        <img className="w-5" src={binImage} alt="menu item photo"></img>
                    </button>
                </div>
            </li>
        );
    }

    function renderDayMenu(dayMenu: DayMenu) {
        const [soups, setSoups] = useState(dayMenu.soups);
        const [meals, setMeals] = useState(dayMenu.meals);
        dayMenu.soups = soups;
        dayMenu.meals = meals;

        function addItem(setItem: (items: MenuItemType[]) => void, items: MenuItemType[]) {
            const item = {
                imageSrc: undefined,
                name: "Name",
                description: "Description",
                price: 0,
                totalCounter: totoalCounter,
                setTotalCounter: setTotalCounter,
            }
            const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1: 0;
            const newItem = { id: newId, item: item };
            setItem([...items, newItem]);
        }

        const deleteSoup = (idToRemove: number) => {
            setSoups(prevItems => prevItems.filter(item => item.id !== idToRemove));
        }

        const deleteMeal= (idToRemove: number) => {
            setMeals(prevItems => prevItems.filter(item => item.id !== idToRemove));
        }

        return(
            <div>
                <CourseBox title="Soup">
                    <ul>
                        {dayMenu.soups.map((item) => renderMenuItem(item.id, item.item, setSoups, soups, deleteSoup))}
                    </ul>
                    <button onClick={() => addItem(setSoups, soups)} className="text-4xl" type="button">+</button>
                </CourseBox>
                <CourseBox title="Main course">
                    <ul>
                        {dayMenu.meals.map((item) => renderMenuItem(item.id, item.item, setMeals, meals, deleteMeal))}
                    </ul>
                    <button onClick={() => addItem(setMeals, meals)} className="text-4xl" type="button">+</button>
                </CourseBox>
            </div>
        )
    }

    

    const [dateError, setDateError] = useState(false);
    const [date, setDate] = useState<string | undefined>(undefined);
    menu.date = date;
    function saveChanges(menu: DayMenu) {
        if (!date) {
            setDateError(true);
            return;
        }

        const menuPurified = new resultMenu();
        for (const soup of menu.soups) {
            menuPurified.soups.push(new resultItem(soup.item.description, soup.item.price))
        }
        for (const meal of menu.meals) {
            menuPurified.meals.push(new resultItem(meal.item.description, meal.item.price))
        }
        menuPurified.date = menu.date;
        alert(JSON.stringify(menuPurified));
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value);
        if (e.target.value !== undefined) {
            setDateError(false);
        }
    }

    function getDateErrorClass(dateError: boolean) {
        const className = "error text-base";
        if (dateError) {
            return className  ;
        }
        return className + " hidden";

    }


    return (
        <div>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6">Menu for {locationName}</h1>
                <div className="w-full border-2 border-gray-300 p-6 rounded-lg flex flex-col justify-between space-y-4">
                    <input onChange={e => handleDateChange(e)} className='w-1/4' type="date"></input>
                    <p className={getDateErrorClass(dateError)}>Please enter date</p>
                    {renderDayMenu(menu)}
                    <button onClick={() => saveChanges(menu)} className="text-white text-xs h-8 bg-blue-700 rounded-lg py-2 px-4 w-32" type="submit">Save changes</button>
                </div>
            </div>

        </div>
    )
}
