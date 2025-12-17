"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { CartItemsType } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const step = [
    {
        id: 1,
        title: "Shopping Cart",
    },
    {
        id: 2,
        title: "Shipping Address",
    },
    {
        id: 3,
        title: "Payment Method",
    },
];

//Temporary
const cartItems: CartItemsType = [
    {
        id: 1,
        name: "Adidas CoreFit T-Shirt",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 39.9,
        sizes: ["s", "m", "l", "xl", "xxl"],
        colors: ["gray", "purple", "green"],
        images: {
            gray: "/products/1g.png",
            purple: "/products/1p.png",
            green: "/products/1gr.png",
        },
        quantity: 2,
        selectedSize: "m",
        selectedColor: "purple",
    },
    {
        id: 2,
        name: "Puma Ultra Warm Zip",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 59.9,
        sizes: ["s", "m", "l", "xl"],
        colors: ["gray", "green"],
        images: { gray: "/products/2g.png", green: "/products/2gr.png" },
        quantity: 1,
        selectedSize: "l",
        selectedColor: "green",
    },
    {
        id: 3,
        name: "Nike Air Essentials Pullover",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 69.9,
        sizes: ["s", "m", "l"],
        colors: ["green", "blue", "black"],
        images: {
            green: "/products/3gr.png",
            blue: "/products/3b.png",
            black: "/products/3bl.png",
        },
        quantity: 1,
        selectedSize: "s",
        selectedColor: "black",
    },
];

const CartPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [shippingForm, setShippingForm] = useState(null);

    const activeStep = parseInt(searchParams.get("step") || "1");

    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-12">
            {/* TITLE */}
            <h1 className="text-2xl font-semibold">Your Shopping Cart</h1>
            {/* STEPPER */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
                {step.map((step) => {
                    const isActive = step.id === activeStep;

                    return (
                        <div
                            key={step.id}
                            className={`
                            group flex items-center gap-3 pb-3
                            border-b-2 transition-all duration-300
                            ${isActive ? "border-slate-900" : "border-gray-200"}
                        `}>
                            {/* STEP NUMBER */}
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                                    transition-all duration-300
                                    ${
                                        isActive
                                            ? "bg-gradient-to-br from-amber-300 to-amber-500 text-slate-900 shadow-md"
                                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                    }
                            `}>
                                {step.id}
                            </div>

                            {/* STEP TITLE */}
                            <span
                                className={`
                                font-medium transition-colors duration-300
                                ${
                                    isActive
                                        ? "text-slate-900"
                                        : "text-gray-500 group-hover:text-gray-700"
                                }
                            `}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
            {/* STEP & DETAILS */}
            <div className="w-full flex flex-col lg:flex-row gap-16">
                {/* STEP */}
                <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
                    {activeStep === 1 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                {/* IMAGE AND DETAILS */}
                                <div className="flex gap-8 ">
                                    <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.images[item.selectedColor]}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Size: {item.selectedSize}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Color: {item.selectedColor}
                                            </p>
                                        </div>
                                        <p className="font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                {/* DELETE BUTTON */}
                                <div className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer">
                                    <Trash2 className="w-3 h-3" />
                                </div>
                            </div>
                        ))
                    ) : activeStep === 2 ? (
                        <ShippingForm />
                    ) : activeStep === 3 && shippingForm ? (
                        <PaymentForm />
                    ) : (
                        <p className="text-sm text-gray-500">
                            Please fill the shipping form to continue.
                        </p>
                    )}
                </div>
                {/* DETAIL */}
                <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
                    <h2 className="font-semibold">Cart Details</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium">
                                $
                                {cartItems
                                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                                    .toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Discount(10%)</span>
                            <span className="font-medium">$ 10</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping Fee</span>
                            <span className="font-medium">$ 10</span>
                        </div>
                        <hr className="my-2 border-gray-200" />
                        <div className="flex justify-between">
                            <span className="text-gray-800 font-semibold">Total</span>
                            <span className="font-medium">
                                $
                                {cartItems
                                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                                    .toFixed(2)}
                            </span>
                        </div>
                    </div>
                    {activeStep === 1 && (
                        <button
                            onClick={() => router.push("/cart?step=2", { scroll: false })}
                            className="w-full bg-gray-800 hover:bg-amber-300 hover:text-slate-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                            Continue
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
