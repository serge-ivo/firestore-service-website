import FirestoreTest from "./components/FirestoreTest";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Firestore Client Test Suite
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Testing @serge-ivo/firestore-client v1.3.6
          </p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <FirestoreTest />
        </div>
      </main>
    </div>
  );
}

export default App;
