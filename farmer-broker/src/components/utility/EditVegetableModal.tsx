"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

interface EditVegetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    _id: string;
    vegetableName: string;
    expectedPrice: number;
    quantity: number;
    imageUrl: string;
    createdAt: string;
  }) => void;
  initialData: {
    _id: string;
    vegetableName: string;
    expectedPrice: number;
    quantity: number;
    imageUrl: string;
    createdAt: string;
  };
}

export default function EditVegetableModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditVegetableModalProps) {
  const [vegetableName, setVegetableName] = useState("");
  const [expectedPrice, setExpectedPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setVegetableName(initialData.vegetableName);
      setExpectedPrice(initialData.expectedPrice);
      setQuantity(initialData.quantity);
      setImageUrl(initialData.imageUrl);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave({
      ...initialData,
      vegetableName,
      expectedPrice,
      quantity,
      imageUrl,
    });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* 👇 Make background lightly blurred instead of black */}
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
                  Edit Vegetable
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Vegetable Name
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={vegetableName}
                      onChange={(e) => setVegetableName(e.target.value)}
                      placeholder="Vegetable Name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Expected Price
                    </label>
                    <input
                      type="number"
                      className="w-full text-gray-700  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(Number(e.target.value))}
                      placeholder="Expected Price"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full text-gray-700  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      placeholder="Quantity"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="w-full  text-gray-700  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Image URL"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
