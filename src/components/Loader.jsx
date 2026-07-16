const Loader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>

      <p className="text-lg font-semibold text-gray-700">
        Loading...
      </p>
    </div>
  );
};

export default Loader;