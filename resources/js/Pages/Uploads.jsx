import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { CheckCircle, Search, Grid, List, Upload, Filter, Trash2, ShoppingCart } from "lucide-react";
import { usePage, Link, useForm } from "@inertiajs/react";

export default function Materials() {
    const { post } = useForm();

  const updateQuantity = (id, newQty) => {
    console.log("Updating:", id, newQty);
    if (newQty < 1) return;
    post(`/cart/updateQuantity/${id}/${newQty}`, {
     quantity: newQty,
  }, {
    preserveScroll: true,
    });

  };
  const [view, setView] = useState("grid");
  const { openMaterialModal } = useModal();
  const { materials, flash, auth } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const { order } = usePage().props;
  const { trade } = usePage().props;
  const { donate } = usePage().props;
  const { totaling } = usePage().props;
  // Filters & search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const handleCategoryChange = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );

  const handleConditionChange = (condition) =>
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.material_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(material.category);
    const matchesCondition =
      selectedConditions.length === 0 ||
      selectedConditions.includes(material.condition);
    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="min-h-screen p-4 sm:p-6 text-black">
      {/* Flash Message */}
      {flash?.message && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-500 ${
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <CheckCircle size={20} /> {flash.message}
        </div>
      )}

      {/* Header */}
      {auth.user && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-2xl font-bold text-green-700">My Uploads</h1>
          <div className="flex gap-2 content-center items-center">
            <button
            onClick={openMaterialModal}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 shadow-md transition"
          >
            <Upload size={16} /> Upload Materials
          </button>
          <Link href="/order-list" className="bg-yellow-500 text-white p-1.5 flex items-center gap-1 rounded-md relative">
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totaling}
            </span>
          </div>
          Orders
        </Link>

          <Link href="/trash-bin" className="bg-red-500 text-white p-1.5 flex rounded-md">
              <Trash2 className="text-center flex w-full" /> Bin
          </Link>
          </div>

        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Filters Sidebar (collapsible on mobile) */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-full lg:w-1/4 bg-gray-50 p-4 rounded-xl shadow-md`}
        >
          <h2 className="text-lg font-bold text-gray-700">Filters</h2>
          <div className="mt-4">
            <h3 className="font-semibold text-sm text-gray-600">Categories</h3>
            <div className="space-y-2 mt-2 text-sm">
              {[
                "Structural Materials",
                "Wood",
                "Concrete & Cement",
                "Metal",
                "Insulation",
                "Doors & Windows",
                "Roofing",
                "Flooring",
                    "Wall Materials",
                    "Aggregates",
                    "Glass Materials",
              ].map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded text-green-600"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-sm text-gray-600">Condition</h3>
            <div className="space-y-2 mt-2 text-sm">
              {["New", "Like New", "Good", "Fair", "Salvageable"].map(
                (condition) => (
                  <label key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded text-green-600"
                      checked={selectedConditions.includes(condition)}
                      onChange={() => handleConditionChange(condition)}
                    />
                    <span>{condition}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search for materials..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                <Filter size={16} /> Filters
              </button>

              <select className="border rounded-full text-gray-600 text-xs px-3 py-1 shadow-sm">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>

              <button onClick={() => setView("grid")}>
                <Grid
                  size={20}
                  className={
                    view === "grid" ? "text-green-600" : "text-gray-400"
                  }
                />
              </button>
              <button onClick={() => setView("list")}>
                <List
                  size={20}
                  className={
                    view === "list" ? "text-green-600" : "text-gray-400"
                  }
                />
              </button>
            </div>
          </div>

          {/* Material Cards */}
          <div
            className={`mt-6 ${
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
                >
                  {material.image && (
                    <img
                      src={`/storage/${material.image}`}
                      alt={material.material_name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <span
                      className={`text-xs text-white px-3 py-1 rounded-full ${
                        material.forbdt === "Trade"
                          ? "bg-blue-500"
                          : material.forbdt === "Sale"
                          ? "bg-red-500"
                          : material.forbdt === "Donation"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      For {material.forbdt}
                    </span>
                    <p className="text-xs text-gray-500">
                      📍 {material.location}
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold mt-2">
                    {material.material_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {material.description}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    {material.forbdt === 'Sale' && (
                      <p className="text-green-600 font-bold">
                        ₱ {material.price}
                      </p>
                    )}

                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-1.5 py-1">
                  <button
                    onClick={() => updateQuantity(material.id, (material.quantity - 1))}
                    className="text-gray-500 hover:text-red-500 text-sm px-1 transition"
                  >
                    −
                  </button>
                  <span className="mx-2 text-xs font-semibold text-gray-800 w-6 text-center">
                    {material.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(material.id, (material.quantity + 1))}
                    className="text-gray-500 hover:text-green-500 text-sm px-1 transition"
                  >
                    +
                  </button>
                </div>

                  </div>

                  <div className="flex gap-2 mt-4 justify-center">
                    <Link href={`/materials/${material.id}`} className="w-1/3">
                      <button className="w-full bg-green-600 text-white text-sm py-2 rounded-md hover:bg-green-700 transition">
                        View
                      </button>
                    </Link>
                    <Link
                      href={`/materials-edit/${material.id}`}
                      className="w-1/3"
                    >
                      <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition">
                        Edit
                      </button>
                    </Link>
                    {material.forbdt === 'Sale' && (

                       <Link href="/order-list" className="w-1/3">
                        {/* <button className="w-full bg-yellow-400 text-white text-sm py-1.5 px-0.5 rounded-md hover:bg-yellow-500 transition relative flex justify-center items-center">
                          <div className="relative">
                            <ShoppingCart className="w-full" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                              {order}
                            </span>
                          </div>
                        </button> */}
                      </Link>

                    )}
                    {material.forbdt === 'Trade' && (

                        <Link href="/trade-list" className="w-1/3">
                        {/* <button className="w-full bg-yellow-400 text-white text-sm py-1.5 px-0.5 rounded-md hover:bg-yellow-500 transition relative flex justify-center items-center">
                          <div className="relative">
                            <ShoppingCart className="w-full" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                              {trade}
                            </span>
                          </div>
                        </button> */}
                      </Link>
                    )}
                    {material.forbdt === 'Donation' && (

                        <Link href="/donate-list" className="w-1/3">
                        {/* <button className="w-full bg-yellow-400 text-white text-sm py-1.5 px-0.5 rounded-md hover:bg-yellow-500 transition relative flex justify-center items-center">
                          <div className="relative">
                            <ShoppingCart className="w-full" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                              {donate}
                            </span>
                          </div>
                        </button> */}
                      </Link>
                    )}

                    <Link href={`/uploads/delete/${material.id}`} className="w-1/3">
                      <button
                        className="w-full bg-red-600 text-white text-sm py-1.5 px-0.5 rounded-md hover:bg-red-700 transition"
                        onClick={(e) => {
                          if (!window.confirm("Are you sure you want to delete this item?")) {
                            e.preventDefault(); // stop navigation if cancelled
                          }
                        }}
                      >
                        <Trash2 className="text-center flex w-full" />
                      </button>
                    </Link>



                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No materials available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
