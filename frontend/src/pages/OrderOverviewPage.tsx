import React, {useState} from "react";
import { imageSourcePrefix, OrderApi, RestaurantsApi } from "../services";
import { Order, OrderState, OrderType } from "../models/orderTypes";
import { useRecoilState } from "recoil";
import { currentOrderAtom } from "../state/atoms";
import { TextComponent } from '../components/TextComponent';
import PageHeader from "../components/PageHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import {  GroupedMenuItem } from "../models/menuTypes";

function toDollars(price: number) {
    return "$" + price.toFixed(2);
}

function getOrderPrice(items: GroupedMenuItem[]) {
    return items.reduce((acc, item) => { return acc + (item.price * item.amount) }, 0);
}

function getDeliveryClass(delivery: boolean, state: OrderState) {
    const baseClass = "w-1/2 text-sm h-8"
    if (delivery) {
        return baseClass + " bg-gray-600 text-white";
    }
    return baseClass + " bg-gray-200" + (state === OrderState.READY ? " text-gray-400" : " text-black");
}

export function renderOrderPage() {
    const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderAtom);

    const shippingInitial = 2.5;

    const { auth } = useAuth();

    const [shipping, setShipping] = useState(shippingInitial);

    const [subtotal, setSubtotal] = useState(Math.abs(getOrderPrice(currentOrder?.items ?? [])));

    function renderItem({ amount, description, price }: GroupedMenuItem, index: number) {

        const [currentAmount, setAmount] = useState(amount);
        const handleAmountChange = (index: number, newAmount: number) => {
            if (newAmount >= 0) {
                setSubtotal(Math.abs(subtotal + (newAmount - currentAmount) * price))
                setAmount(newAmount);
                amount = newAmount;
                if (currentOrder) {
                    setCurrentOrder({
                        ...currentOrder,
                        items: currentOrder.items.map((item, itemIndex) => {
                            return {
                                ...item,
                                amount: itemIndex === index ? newAmount : item.amount
                            };
                        })
                    });
                }
            }
        };
        return (
          <li key={index.toString()} className="flex justify-center space-x-0 md:space-x-24 flex-col md:flex-row  mt-10">
              <div className="">
                  <h4 className="flex justify-center md:justify-start text-xs font-bold">{description}</h4>
                  <p className="flex justify-center text-xs w-auto text-justify mt-2">Lorem ipsum dolor sit amet.</p>
              </div>

              <div className="flex justify-center md:justify-start mt-6">
                  <button
                    onClick={() => handleAmountChange(index, currentAmount - 1)}
                    className={ "w-4 h-4 bg-gray-200 rounded-md flex items-center justify-center" + (currentOrder?.state === OrderState.READY ? " text-gray-400" : " text-black") }
                    disabled={ currentOrder?.state === OrderState.READY }>
                      <span>-</span>
                  </button>
                  <span className="text-xs mx-2 w-6 text-center">{currentAmount}</span>
                  <button
                    onClick={() => handleAmountChange(index, currentAmount + 1)}
                    className={ "w-4 h-4 bg-gray-200 rounded-md flex items-center justify-center" + (currentOrder?.state === OrderState.READY ? " text-gray-400" : " text-black") }
                    disabled={ currentOrder?.state === OrderState.READY }>
                      <span>+</span>
                  </button>
              </div>

              <div className="mt-5 flex justify-center md:justify-start">
                  <p className="ml-2 md:ml-0 text-base font-bold w-16">{toDollars(price * currentAmount)}</p>
              </div>

          </li>
        )
    }

    const [delivery, setDelivery] = useState(currentOrder?.type === OrderType.DELIVERY);

    const handleDeliveryChange = (delivery: boolean) => {
        setDelivery(delivery);
        if (delivery) {
            setShipping(shippingInitial);
        } else {
            setShipping(0);
        }

        if (currentOrder) {
            setCurrentOrder({ ...currentOrder, type: delivery ? OrderType.DELIVERY : OrderType.PICK_UP });
        }
    };

    const { mutateAsync: createOrder } = useMutation({
        mutationFn: (orderData: Order) => OrderApi.create({
            userId: auth?.id ?? 1,
            restaurantId: orderData.restaurantId,
            type: orderData.type,
            scheduledFor: orderData.scheduledFor,
            items: orderData.items.map((item) => Array(item.amount).fill(item)).reduce((itemGroup, next) => itemGroup.concat(next)),
        }),
        onSuccess: () => {
            if (currentOrder) {
                setCurrentOrder({ ...currentOrder, state: OrderState.READY });
            }

            alert("Your order has been accepted, bon appétit!");
        }
    });

    if (!currentOrder) {
        return <TextComponent message="You have no active order." />
    }

    const { data: restaurant, isLoading } = useQuery({
        queryKey: ['restaurant', currentOrder.restaurantId.toString()],
        queryFn: () => RestaurantsApi.getSingle(currentOrder.restaurantId.toString())
    });

    return (
      <div className="flex flex-col lg:flex-row justify-center bg-white container mx-auto my-auto p-5">
          <div className="h-full flex-col">
              <div className="border border-gray-300 rounded-lg mt-5 grid" >
                  <div className="p-5">
                      <PageHeader title={ "Order overview - " + new Date(currentOrder.scheduledFor).toLocaleDateString() } />
                      <ul>
                          {
                              currentOrder.items.map((item, index) => renderItem(item, index))
                          }
                      </ul>

                  </div>
              </div>
          </div>
          <div className="ml-0 lg:ml-10 h-full flex-col">
              <div className="border border-gray-300 rounded-lg mt-5" >
                  <div className="flex flex-col p-5 space-y-3">
                      <div className="flex justify-between">
                          <button
                            className={getDeliveryClass(delivery, currentOrder.state) + " rounded-l-lg"}
                            disabled={ currentOrder.state === OrderState.READY }
                            onClick={() => handleDeliveryChange(true)}>
                              Delivery
                          </button>
                          <button
                            className={getDeliveryClass(!delivery, currentOrder.state) + " rounded-r-lg"}
                            disabled={ currentOrder.state === OrderState.READY }
                            onClick={() => handleDeliveryChange(false)} >
                              Pick up
                          </button>
                      </div>
                      {
                          (isLoading || !restaurant) ? <div>Loading restaurant preview...</div> :
                          <>
                              <h3 className="text-sm font-bold">{restaurant.name}</h3>
                              <img className="w-full lg:w-64 h-auto" src={imageSourcePrefix + restaurant.photo} alt="" />
                              <div className="flex flex-col" >
                                  <span className="text-xs font-bold">{restaurant.address.city}</span>
                                  <span className="text-xs">{restaurant.address.address}</span>
                              </div>
                          </>
                      }

                  </div>
              </div>
              <div className="border border-gray-300 rounded-lg mt-5" >
                  <div className="p-5">
                      <h3 className="text-sm font-bold">Payment information</h3>
                      <div className="flex justify-between mt-3">
                          <span className="text-xs">Subtotal</span>
                          <span className="text-xs">{toDollars(subtotal)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                          <span className="text-xs">Shipping</span>
                          <span className="text-xs"> {shipping === 0 ? "FREE" : toDollars(shipping)} </span>
                      </div>
                      <div className="flex justify-between mt-3">
                          <span className="text-xs font-bold">Total</span>
                          <span className="text-xs font-bold text-blue-700"> {toDollars(subtotal + shipping)} </span>
                      </div>
                      <button
                        className={ "mt-8 text-white text-xs rounded-lg py-2 px-4 w-full" + (currentOrder.state === OrderState.READY ? " bg-blue-200" : " bg-blue-700 ") }
                        disabled={ currentOrder.state === OrderState.READY }
                        type="button"
                        onClick={() => createOrder(currentOrder) }>
                          Proceed to checkout
                      </button>
                      {
                        currentOrder.state === OrderState.READY
                          ? <div className="flex justify-center mt-1">
                              <div className="text-xs font-bold">Payment accepted</div>
                          </div>
                          : ""
                      }
                  </div>
              </div>
          </div>
      </div>
    )
}

export const OrderPage: React.FC = () => {
    return (
      <div>
          { renderOrderPage() }
      </div>
    )
}