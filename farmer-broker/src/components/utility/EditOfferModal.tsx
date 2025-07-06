import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Offer) => void;
  initialData: Offer;
}

interface Offer {
  _id: string;
  vegetableName: string;
  offeredPrice: number;
  unit: string;
  imageUrl?: string;
  createdAt: string;
}

export default function EditOfferModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [vegetableName, setVegetableName] = useState("");
  const [offeredPrice, setOfferedPrice] = useState<number>(0);
  const [unit, setUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setVegetableName(initialData.vegetableName);
      setOfferedPrice(initialData.offeredPrice);
      setUnit(initialData.unit);
      setImageUrl(initialData.imageUrl || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave({
      ...initialData,
      vegetableName,
      offeredPrice,
      unit,
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
                  Edit Offer
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Vegetable Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      value={vegetableName}
                      onChange={(e) => setVegetableName(e.target.value)}
                      placeholder="Vegetable Name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Offered Price
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      value={offeredPrice}
                      onChange={(e) => setOfferedPrice(Number(e.target.value))}
                      placeholder="Offered Price"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Unit (e.g. kg)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Unit"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
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
