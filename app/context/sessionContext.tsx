'use client';
import React, { ReactNode, createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';

type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    phone: string;
    email: string;
    address: string;
}

export type CartItem = {
    id: number;
    namefood: string;
    img: string;
    description: string;
    price: number;
    quantity: number;
    totalprice: number;
};

type SessionContextType = {
    user: any;
    setUser: (user: any) => void;
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;

};

interface SessionProviderProps {
    children: ReactNode;
}
export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    // Load user from localStorage when reload page
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            const storedCart = localStorage.getItem('cart');
            if (storedUser) setUser(JSON.parse(storedUser));
            if (storedCart) setCart(JSON.parse(storedCart));
            setIsInitialized(true)
        }

    }, []);

    // Update localStorage realtime
    useEffect(() => {
        if (!isInitialized) return;
        if (typeof window !== 'undefined') {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
            if (cart) {
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                localStorage.removeItem('cart');
            }
        }
        console.log("user loaded from localStorage:", user);
        console.log("Cart loaded from localStorage:", cart);
    }, [user, cart,isInitialized]);

    // Cart logic
    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id ? {
                        ...p,
                        quantity: p.quantity + item.quantity,
                        totalprice: (p.quantity + item.quantity) * p.price
                    } : p
                );
            }
            return [...prev, { ...item, totalprice: item.quantity * item.price }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <SessionContext.Provider value={{ user, setUser, cart, setCart, addToCart, removeFromCart, clearCart }}>
            {children}
        </SessionContext.Provider>
    );
};

//export const useSession = () => useContext(SessionContext);

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};
