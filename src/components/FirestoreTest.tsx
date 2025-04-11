import { limit, orderBy, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestoreService } from "../firebase";

// Remove module-level instance creation
// const firestoreService = new FirestoreService(db);

class TestData {
  id?: string;
  name: string;
  value: number;
  timestamp?: Date;

  constructor(data: Partial<TestData> = {}) {
    this.id = data.id;
    this.name = data.name || "";
    this.value = data.value || 0;
    this.timestamp = data.timestamp;
  }

  toString() {
    return `TestData(id=${this.id}, name=${this.name}, value=${this.value}, timestamp=${this.timestamp})`;
  }
}

const FirestoreTest: React.FC = () => {
  // Log the db instance just before creating the service
  console.log("Firestore DB instance in FirestoreTest:", firestoreService);

  const [data, setData] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<TestData>(new TestData());
  const [selectedItem, setSelectedItem] = useState<TestData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log("Loading data from Firestore...");
    setLoading(true);
    setError(null);
    try {
      // Use the instance
      const items = await firestoreService.fetchCollection<TestData>(
        "test-collection"
      );
      console.log(`Loaded ${items.length} items from Firestore:`, items);
      setData(items);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating new item:", newItem);
    setLoading(true);
    setError(null);
    try {
      const item = { ...newItem, timestamp: new Date() };
      console.log("Sending item to Firestore:", item);
      // Use the instance
      const docId = await firestoreService.addDocument("test-collection", item);
      console.log("Item created successfully with ID:", docId);
      setNewItem(new TestData());
      await loadData();
    } catch (err) {
      console.error("Error creating item:", err);
      setError(err instanceof Error ? err.message : "Failed to create item");
    }
    setLoading(false);
  };

  const handleUpdate = async (item: TestData) => {
    console.log("Updating item:", item);
    setLoading(true);
    setError(null);
    try {
      if (!item.id) throw new Error("Item ID is required for update");
      console.log("Sending update to Firestore for item ID:", item.id);
      // Use the instance
      await firestoreService.updateDocument(`test-collection/${item.id}`, {
        ...item,
        timestamp: new Date(),
      });
      console.log("Item updated successfully");
      await loadData();
      setSelectedItem(null);
    } catch (err) {
      console.error("Error updating item:", err);
      setError(err instanceof Error ? err.message : "Failed to update item");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting item with ID:", id);
    setLoading(true);
    setError(null);
    try {
      // Use the instance
      await firestoreService.deleteDocument(`test-collection/${id}`);
      console.log("Item deleted successfully");
      await loadData();
    } catch (err) {
      console.error("Error deleting item:", err);
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
    setLoading(false);
  };

  const handleGetById = async (id: string) => {
    console.log("Fetching item with ID:", id);
    setLoading(true);
    setError(null);
    try {
      // Use the instance
      const item = await firestoreService.getDocument<TestData>(
        `test-collection/${id}`
      );
      console.log("Retrieved item:", item);
      setSelectedItem(item);
    } catch (err) {
      console.error("Error fetching item:", err);
      setError(err instanceof Error ? err.message : "Failed to get item");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    console.log("Searching items with term:", searchTerm);
    setLoading(true);
    setError(null);
    try {
      // Use the instance
      const items = await firestoreService.fetchCollection<TestData>(
        "test-collection",
        where("name", "==", searchTerm),
        orderBy("timestamp", "desc"),
        limit(10)
      );
      console.log(`Found ${items.length} matching items:`, items);
      setData(items);
    } catch (err) {
      console.error("Error searching items:", err);
      setError(err instanceof Error ? err.message : "Failed to search items");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Firestore Client Test Suite</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Create New Item</h3>
        <form onSubmit={handleCreate} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Name"
              className="flex-1 p-2 border rounded"
              required
            />
            <input
              type="number"
              value={newItem.value}
              onChange={(e) =>
                setNewItem({ ...newItem, value: Number(e.target.value) })
              }
              placeholder="Value"
              className="w-32 p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Create
            </button>
          </div>
        </form>
      </div>

      {/* Search Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Search Items</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Search
          </button>
          <button
            onClick={loadData}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Items List</h3>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="space-y-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <span className="font-bold">{item.name}</span>
                  <span className="ml-2">Value: {item.value}</span>
                  {item.timestamp && (
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGetById(item.id!)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    disabled={loading}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Item Details */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Item Details</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Value
                </label>
                <input
                  type="number"
                  value={selectedItem.value}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      value: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(selectedItem)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirestoreTest;
