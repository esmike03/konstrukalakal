import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { CheckCircle, Search, Grid, List, Upload, Filter } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";

export default function Materials() {
  const [view, setView] = useState("grid");
  const { openMaterialModal } = useModal();
  const { materials, flash, auth } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);

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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Filter + search
  const filteredMaterials = materials
    .filter((m) => (auth?.user?.id ? m.user_id !== auth.user.id : true))
    .filter((m) => {
      const matchesSearch = m.material_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(m.category);
      const matchesCondition =
        selectedConditions.length === 0 ||
        selectedConditions.includes(m.condition);
      return matchesSearch && matchesCategory && matchesCondition;
    });

  return (
    <div className="min-h-screen p-4 sm:p-6 text-black">
      {/* Flash Message */}
      {flash?.message && (
        <div
          className={`bg-green-400 border border-green-600 shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-50 mb-4 transition-all duration-500 transform ${
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-green-700">
            Browse Materials{" "}
            <span className="text-xs text-gray-400 font-normal">
              {">"} Trade Materials
            </span>
          </h1>
          <button
            onClick={openMaterialModal}
            className="cursor-pointer bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto hover:bg-green-600 transition"
          >
            <Upload size={14} /> Upload Materials
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 mt-4 text-gray-600">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/5">
          {/* Toggle button on mobile */}


          <div
            className={`transition-all duration-300 ${
              showFilters ? "block" : "hidden lg:block"
            } bg-white/40 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-md`}
          >
            <h2 className="text-lg font-bold">Filters</h2>
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

            <div className="mt-2">
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
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search + Sorting */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search for materials..."
                className="w-full px-4 text-sm py-2 border border-gray-300 rounded-full bg-white/40 backdrop-blur-md"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search
                className="absolute right-3 top-2 text-gray-500"
                size={16}
              />
            </div>

            <div className="flex items-center w-full justify-center gap-2 text-xs self-end sm:self-auto">
            <button
                className="lg:hidden flex items-center gap-2 px-3 py-1  rounded-full bg-gray-400 text-white text-sm"
                onClick={() => setShowFilters(!showFilters)}
            >
                <Filter size={16} /> Filters
          </button>
              <select className="border rounded-full text-gray-600 border-gray-400 text-xs px-3 py-1 bg-white/50 backdrop-blur-sm">
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
                  className="bg-gradient-to-br from-green-200/40 via-white/30 to-green-100/40 backdrop-blur-lg border border-white/30 flex flex-col justify-between p-4 rounded-2xl shadow-lg hover:shadow-xl transition"
                >
                  <div>
                    {material.image && (
                      <img
                        src={`/storage/${material.image}`}
                        alt={material.material_name}
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                      />
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <div
                        className={`text-xs text-white px-2 py-1 rounded-full w-max shadow ${
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
                      <p className="text-xs mt-0.5 text-gray-600">
                        📍 {material.location}
                      </p>
                    </div>
                    <h3 className="text-lg font-bold mt-1 text-gray-800">
                      {material.material_name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {material.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex mt-2 gap-2 justify-between">
                      {material.forbdt !== "Trade" &&
                        material.forbdt !== "Donation" && (
                          <p className="text-green-600 font-bold">
                            ₱ {material.price}
                          </p>
                        )}
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {material.quantity}
                      </p>
                    </div>
                    <Link
                      href={`/materials/${material.id}`}
                      className="cursor-pointer"
                    >
                      <button className="w-full mt-2 text-sm bg-green-600/90 text-white py-1.5 rounded-full hover:bg-green-700 transition shadow-md">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No materials available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
