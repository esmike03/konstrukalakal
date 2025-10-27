import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { CheckCircle, Search, Grid, List, Upload, Filter } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";

export default function Materials() {
  const [view, setView] = useState("grid");
  const { openMaterialModal } = useModal();
  const { materials } = usePage().props;
  const { flash } = usePage().props;
  const { auth } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMaterials = materials
    .filter((material) => {
      // if (auth?.user?.id) {
      //   return material.user_id !== auth.user.id;
      // }
      return true;
    })
    .filter((material) => {
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
    <div className="min-h-screen p-4 md:p-6 text-black">
      {flash?.message && (
        <div
          className={`bg-green-400 border border-green-600 shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
        >
          <CheckCircle size={20} className="text-white" /> {flash.message}
        </div>
      )}

      {/* Header */}
      {auth.user && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold text-green-700">
            Browse Materials{" "}
            <span className="text-xs text-gray-400 font-normal">
              {">"} Buy Materials
            </span>
          </h1>
          <button
            onClick={openMaterialModal}
            className="cursor-pointer bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1"
          >
            <Upload size={14} /> Upload Materials
          </button>
        </div>
      )}

      {/* Filters + Main Content */}
      <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-600">
        {/* Mobile filter toggle button */}


        {/* Sidebar */}
        <div
          className={`w-full md:w-1/5 bg-gray-100 p-4 rounded-lg transition-all duration-300 ease-in-out ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <h2 className="text-lg font-bold">Filters</h2>

          {/* Categories */}
          <div className="mt-2">
            <h3 className="font-semibold">Categories</h3>
            <div className="space-y-2 mt-2">
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
                <label
                  key={category}
                  className="flex text-sm items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="mt-4">
            <h3 className="font-semibold">Condition</h3>
            <div className="space-y-2 mt-2">
              {["New", "Like New", "Good", "Fair", "Salvageable"].map(
                (condition) => (
                  <label
                    key={condition}
                    className="flex text-sm items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox"
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
          {/* Search + Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search for materials..."
                className="w-full px-4 text-sm py-1 border border-gray-300 rounded-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search
                className="absolute right-3 top-2 text-gray-500"
                size={16}
              />
            </div>
            <div className="flex items-center gap-2 text-xs justify-center w-full">
                    <button
                    className="md:hidden flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded-full w-fit "
                    onClick={() => setShowFilters(!showFilters)}
                    >
                    <Filter size={16} /> Filters
                    </button>
              <select className="border rounded-full text-gray-600 border-gray-400 text-xs px-3 py-1">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <button onClick={() => setView("grid")}>
                <Grid
                  size={20}
                  className={view === "grid" ? "text-green-400" : "text-gray-400"}
                />
              </button>
              <button onClick={() => setView("list")}>
                <List
                  size={20}
                  className={view === "list" ? "text-green-400" : "text-gray-400"}
                />
              </button>
            </div>
          </div>

          {/* Cards */}
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
                            className="relative flex flex-col justify-between p-4 rounded-2xl shadow-lg
                                    bg-gradient-to-br from-white/30 to-white/10
                                    backdrop-blur-md border border-white/20 hover:scale-[1.02]
                                    transition-all duration-300"
                        >
                            <div>
                            {material.image && (
                                <img
                                src={`/storage/${material.image}`}
                                alt={material.material_name}
                                className="w-full h-40 object-cover rounded-xl shadow-sm"
                                />
                            )}

                            <div className="flex justify-between items-center mt-3">
                                <div
                                className={`text-xs text-white px-3 py-1 rounded-full shadow-md ${
                                    material.forbdt === "Trade"
                                    ? "bg-blue-500/80"
                                    : material.forbdt === "Sale"
                                    ? "bg-red-500/80"
                                    : material.forbdt === "Donation"
                                    ? "bg-green-500/80"
                                    : "bg-gray-500/80"
                                }`}
                                >
                                For {material.forbdt}
                                </div>

                                <p className="text-xs text-gray-300 flex items-center gap-1">
                                📍 {material.location}
                                </p>
                            </div>

                            <h3 className="text-lg font-semibold mt-2 text-gray-800 drop-shadow-sm">
                                {material.material_name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {material.description}
                            </p>
                            </div>

                            <div>
                            <div className="flex mt-3 gap-2 justify-between items-center">
                                {material.forbdt !== "Trade" && material.forbdt !== "Donation" && (
                                <p className="text-green-600 font-bold text-lg">
                                    ₱ {material.price}
                                </p>
                                )}

                                <p className="text-xs text-gray-500">Qty: {material.quantity}</p>
                            </div>

                            <Link href={`/materials/${material.id}`} className="cursor-pointer">
                                <button className="w-full mt-3 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-full shadow hover:from-green-600 hover:to-green-700 transition">
                                View Details
                                </button>
                            </Link>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No materials found.</p>
                    )}
                    </div>
            </div>
        </div>
        </div>
    );
    }
