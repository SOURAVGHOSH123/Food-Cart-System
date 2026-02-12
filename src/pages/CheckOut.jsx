import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../contexts/CartProvider";
import { truncate } from "../utils/truncate";
import { addHistory } from "../redux/slices/paymentHistorySlice";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
    const { cartList, clearItems, deleteItem } = useContext(CartContext)
    const { users, currentUser } = useSelector((state) => state.auth);
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    // const { history, cuser } = useSelector((state) => state.paymentHistory)
    const user = users.find((u) => u.email === currentUser);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const subtotal = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const gst = +(subtotal * 0.05).toFixed(2)        // 5% GST
    const handlingFee = subtotal > 450 ? 0 : subtotal > 150 ? 9.99 : 12.99  // handling fee
    const deliveryCharge = subtotal > 499 ? 0 : subtotal > 150 ? 20 : 30;
    const total = +(subtotal + gst + handlingFee + deliveryCharge).toFixed(2)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, address } = { ...formData }
        if (!name || !email || !phone || !address) {
            setError("fill the details")
            setMessage("")
            return;
        }
        setError("")
        setMessage("details submit successfully")
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const loadRazorpay = async () => {
        console.log(import.meta.env.VITE_RAZERPAY_KEY, "KEY");
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!res) {
                alert("Razorpay SDK failed to load. Check your internet.");
                return;
            }

            if (!window.Razorpay) {
                alert("Razorpay not available.");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZERPAY_KEY,
                amount: total * 100, // in paise
                currency: "INR",
                name: "Your Store",
                description: "Order Payment",
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: "#3399cc",
                },
                handler: function (response) {
                    alert("Payment Successful!");
                    console.log("Razorpay Response:", response);

                    // Save payment to Redux
                    const receipt = {
                        id: user?.id,
                        email: user?.email,
                        name: user?.name,
                        bills: total,
                        transactionId: response.razorpay_payment_id,
                        timeStamp: Date.now(),
                        items: cartList.map(i => ({ id: i.id, name: i.title, qty: i.quantity, price: i.price })),
                    };

                    dispatch(addHistory(receipt));
                    navigate("/")
                    clearItems();
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.log(error, "razerpay error")
        } finally {
            setError("")
            setMessage("")
        }
    };

    useEffect(() => {
        const { name, email, phone, address } = { ...formData }
        if (!name || !email || !phone || !address) {
            setError("fill the details")
            alert("fill all the details first!")
            return;
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 📝 Shipping Section */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Shipping Details
                    </h2>

                    {message && <p className="text-sm p-1 text-green-500 text-center">{message}</p>}
                    {error && <p className="text-sm p-1 text-red-600 text-center">{error}</p>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded-lg p-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-lg p-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full border border-gray-300 rounded-lg p-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg p-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button type="submit"
                            className="w-full border border-gray-300 rounded-lg p-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500"
                        >Save Details</button>
                    </form>
                </div>

                {/* 🛒 Order Items */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Order Items
                    </h2>

                    <div className="space-y-4">
                        {cartList.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-3"
                            >
                                <div>
                                    <p className="font-semibold text-gray-700 break-words">

                                        {truncate(item.title, 15)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-800">
                                    ₹ {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 💳 Payment Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Payment Summary
                    </h2>

                    <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹ {subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>GST (5%)</span>
                            <span>₹ {gst}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Handling</span>
                            <span>₹ {handlingFee.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>₹ {deliveryCharge.toFixed(2)}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-lg font-bold text-gray-900">
                            <span>Total</span>
                            <span>₹ {total}</span>
                        </div>
                    </div>

                    {!error && <button
                        onClick={loadRazorpay}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        Pay ₹ {total}
                    </button>}
                </div>

            </div>
        </div >
    );
};

export default CheckOut;
