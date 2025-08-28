import React from "react";
import { Copy } from "lucide-react";
import Swal from "sweetalert2";

const PaymentSystem = () => {
  const bkashNumber = "01737363412";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "কপি হয়েছে!",
      text: `"${text}" কপি হয়েছে।`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        🎯 পেমেন্ট নির্দেশনা (টিউটরদের জন্য)
      </h2>

      <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center justify-between">
        <div>
          <p className="text-gray-700 font-semibold">বিকাশ নম্বর:</p>
          <p className="text-lg font-bold text-indigo-600">{bkashNumber}</p>
        </div>
        <button
          onClick={() => copyToClipboard(bkashNumber)}
          className="flex items-center gap-1 text-sm bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 transition">
          <Copy size={16} /> কপি
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        অনুগ্রহ করে নিচের যেকোনো একটি উপায়ে পেমেন্ট করুন এবং সঠিক তথ্য পাঠান:
      </p>

      {/* Send Money */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-semibold text-gray-800">1️⃣ Send Money করলে:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>
            রেফারেন্সে অবশ্যই <b>Tuition ID/নম্বর</b> লিখবেন।
          </li>
        </ul>
      </div>

      {/* Cash In */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-semibold text-gray-800">2️⃣ Cash In করলে:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>
            পেমেন্টের স্ক্রিনশট বা ছবি এবং <b>Tuition ID/নম্বর</b> আমাদের
            মেসেঞ্জারে পাঠাবেন।
          </li>
        </ul>
      </div>

      <div className="bg-yellow-100 border border-yellow-300 p-3 rounded text-sm text-yellow-800">
        🔔 <b>পেমেন্ট ভেরিফিকেশনের জন্য Tuition ID খুবই গুরুত্বপূর্ণ।</b>
      </div>
    </div>
  );
};

export default PaymentSystem;
