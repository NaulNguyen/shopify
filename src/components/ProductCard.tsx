"use client";

import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
    const [productTypes, setProductTypes] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    });

    const handleProductTypeChange = ({
        type,
        value,
    }: {
        type: "size" | "color";
        value: string;
    }) => {
        setProductTypes((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    return (
        <div className="shadow-lg rounded-lg overflow-hidden">
            {/* IMAGE */}
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[2/3]">
                    <Image
                        src={product.images[productTypes.color]}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>
            {/* PRODUCT DETAILS */}
            <div className="flex flex-col gap-4 p-4">
                <h1 className="font-bold text-xl">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.shortDescription}</p>
                {/* PRODUCT TYPE */}
                <div className="flex items-center gap-10 text-xs">
                    {/* SIZE */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">Size</span>
                        <select
                            name="size"
                            id="size"
                            className="ring ring-gray-300 rounded-md px-2 py-1"
                            onChange={(e) =>
                                handleProductTypeChange({ type: "size", value: e.target.value })
                            }>
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* COLOR */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">Color</span>
                        <div className="flex items-center gap-2">
                            {product.colors.map((color) => (
                                <div
                                    className={`cursor-pointer border-1 rounded-full p-[1.2] ${
                                        productTypes.color === color
                                            ? "border-gray-400"
                                            : "border-gray-200"
                                    }`}
                                    key={color}
                                    onClick={() => {
                                        handleProductTypeChange({ type: "color", value: color });
                                    }}>
                                    <div
                                        key={color}
                                        className="w-5 h-5 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* PRICE AND ADD TO CART BUTTON */}
                <div className="flex items-center justify-between">
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                    <button className="ring-1 ring-gray-200 bg-black text-white shadow-lg rounded-md px-3 py-2 text-sm cursor-pointer hover:text-slate-900 hover:bg-amber-300 transition-all duration-300 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
