import React, { useState } from "react";
import EditItem from "./Admin/EditItem";
import DeleteItem from "./Admin/DeleteItem";

const ItemList = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState(null);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.$id}
          className="flex items-center justify-between p-4 mb-4 bg-white rounded shadow-md"
        >
          <div>
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedItem(item);
                setAction("edit");
              }}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedItem(item);
                setAction("delete");
              }}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {action === "edit" && selectedItem && (
        <EditItem item={selectedItem} onClose={() => setAction(null)} />
      )}

      {action === "delete" && selectedItem && (
        <DeleteItem itemId={selectedItem.$id} onClose={() => setAction(null)} />
      )}
    </div>
  );
};

export default ItemList;
