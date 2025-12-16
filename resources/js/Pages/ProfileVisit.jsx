import { usePage, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { Search, Grid, List, Upload, Filter, CheckCircle, ChevronDown, ChevronUp, Star } from "lucide-react";


export default function ProfileVisit({
    label = "Reviews",
    placeholder = "Write a Review",
    value,
    onChange,
}) {
  const { auth } = usePage().props;
  const [openReview, setOpenReview] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [view, setView] = useState("grid");
  const { openMaterialModal } = useModal();
  const { materials, reviews } = usePage().props; // Fetch materials from Inertia
  const { user } = usePage().props;
  const { flash } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [open, setOpen] = useState(false);

    const submitReview = () => {
    router.post(`/reviews/${user.id}`, {
    comment,
    rating,
    }, {
    onSuccess: () => {
      // Clear rating and comment after successful submit
      setRating(0);
      setHover(0);
      setComment("");
    }
    });
    };

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const authUserId = auth?.user?.id ?? null;
  const isBlocked = authUserId ? user.blocked?.includes(authUserId) : false;

  console.log(user.id);
  const reasons = [
    "Spam or misleading",
    "Harassment or bullying",
    "Hate speech",
    "Scam or fraud",
    "Inappropriate content",
    "Fake account",
  ];
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true); // Show the message
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide after 2 seconds
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [flash]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    );
  };

  const handleConditionChange = (condition) => {
    setSelectedConditions(prev =>
      prev.includes(condition) ? prev.filter(item => item !== condition) : [...prev, condition]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter and search materials based on state
  const filteredMaterials = materials
    .filter((material) => {
      // If user is logged in, filter out their own materials
      // if (auth?.user?.id) {
      //     return material.user_id !== auth.user.id;
      // }
      return true; // No filtering if not logged in
    })
    .filter((material) => {
      const matchesSearch = material.material_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(material.category);
      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(material.condition);
      return matchesSearch && matchesCategory && matchesCondition;
    });
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {flash?.message && (
        <div
          className={`bg-green-400 border border-green-600 shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${showMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5"
            }`}
        >
          <CheckCircle size={20} className="text-white" /> {flash.message}
        </div>
      )}
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 h-36 sm:h-44 md:h-22 rounded-xl relative shadow-lg">

        <div className="relative">
          {/* Trigger */}
          {user.status == 'disabled' && (
            <p className="bg-red-500 text-white p-1 text-center text-2xl rounded-md mx-10   ">---User Disabled----</p>
          )}
          <div
            className="w-full text-white flex justify-end cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >

            <p className="mr-4 font-bold text-2xl">...</p>
          </div>

          {/* Dropdown menu */}
          {openMenu && (
            <div className="absolute right-4 mt-2 w-40 bg-white shadow-lg rounded-lg border text-gray-700">

              <Link href="/materials">
                <button className="w-full text-left px-4 py-1 hover:bg-gray-100">Back</button>
              </Link>

              {authUserId && authUserId !== user.id && (
                <>
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full text-left px-4 py-1 hover:bg-gray-100"
                  >
                    Report User
                  </button>

                  {open && (
                    <div className="absolute left-0 mt-1 w-48 bg-white border rounded-md shadow-md z-50">
                      {reasons.map((reason, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setOpen(false);
                            router.post("/report-user", {
                              user_id: user.id,
                              reason,
                            });
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  )}

                  {!isBlocked ? (
                    <button
                      onClick={() => router.post("/block-user", { user_id: user.id })}
                      className="w-full text-left px-4 py-1 hover:bg-gray-100"
                    >
                      Block User
                    </button>
                  ) : (
                    <button
                      onClick={() => router.post("/unblock-user", { user_id: user.id })}
                      className="w-full text-left px-4 py-1 hover:bg-gray-100 text-red-600"
                    >
                      Unblock User
                    </button>
                  )}
                </>
              )}


              {!authUserId && (
                <p className="text-center text-gray-500 text-sm py-1">Login to access options</p>
              )}

            </div>
          )}

        </div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={
              user.profile_image
                ? `/storage/${user.profile_image}`
                : "/images/user.png"
            }
            alt="Profile"
            className="w-18 h-18 sm:w-26 sm:h-26 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

        {/* Name */}
        <h1 className="text-xl font-bold text-center text-gray-800 ">
          {user.name}
        </h1>
        <div className="w-full flex justify-center gap-2 align-center px-2 py-1 mb-6 ">
          {authUserId && authUserId !== user.id && !isBlocked ? (
            <Link href={`/direct/${50}/${user.id}`}>
              <p className="bg-blue-500 text-white rounded-md py-1 px-2 cursor-pointer">
                Message
              </p>
            </Link>
          ) : !authUserId ? (
            <p className="font-bold text-gray-500 cursor-default">Login to message</p>
          ) : isBlocked ? (
            <p className="font-bold text-red-500">-- Blocked --</p>
          ) : null}


          {auth?.user?.name === 'Admin' && user.status === 'enabled' && (


            <Link href={`/disable/${user.id}`}>
              <p className="bg-red-500 text-white rounded-md py-1 px-2 cursor-pointer">Disable User</p>
            </Link>

          )}

          {auth?.user?.name === 'Admin' && user.status === 'disabled' && (

            <Link href={`/enable/${user.id}`}>
              <p className="bg-green-500 text-white rounded-md py-1 px-2 cursor-pointer">Enable User</p>
            </Link>

          )}


        </div>

        {/* Details Box */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">

          <div>
            <p className="text-sm font-semibold text-gray-500">Email</p>
            <p className="text-lg text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Address</p>
            <p className="text-lg text-gray-800">
              {user.address || "No address provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Contact</p>
            <p className="text-lg text-gray-800">
              {user.contact || "No contact number provided"}
            </p>
          </div>

        </div>
        <div className="w-full  mx-auto mt-10">
            {/* Header / Toggle */}
            <button
            type="button"
            onClick={() => setOpenReview(!openReview)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
            <span className="font-medium text-gray-700">{label}</span>
            {openReview ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
            </button>


            {/* Collapsible Content */}
            <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openReview ? "max-h-[1000px] mt-3" : "max-h-0"
            }`}
            >
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-white p-4 rounded-xl shadow"
                >
                <div className="flex gap-3">
                    {/* Reviewer */}
                    <p className="font-semibold text-gray-800">
                    {review.owner?.name} -
                    </p>

                     {/* Stars */}
                    <div className="flex gap-1 my-1">
                    {[1,2,3,4,5].map(star => (
                        <Star
                        key={star}
                        className={`w-4 h-4 ${
                            review.rating >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        />
                    ))}
                    </div>
                </div>




                    {/* Comment */}
                    <p className="text-gray-700">{review.comment}</p>

                    {/* Reviewed user */}

                </div>
                ))}
            <div className="flex items-center gap-1 mt-8">
            {[1, 2, 3, 4, 5].map((star) => (
            <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition ${
            (hover || rating) >= star
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            />
            ))}
            {rating > 0 && (
            <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
            )}
</div>
            <div className="flex gap-4 mt-3">
                <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
  onClick={submitReview}
  disabled={!rating || !comment}
  className="
    px-3 rounded-md cursor-pointer text-white
    bg-blue-500
    disabled:bg-gray-300
    disabled:text-gray-500
    disabled:cursor-not-allowed
    transition
  "
>
  Submit
</button>

            </div>

            </div>
            </div>


      </div>
      <div className="min-h-screen p-6 text-black">
        {/* Flash Message */}
        {flash?.message && (
          <div
            className={`bg-green-400 border border-green-600 shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-50 mb-4 transition-all duration-500 transform ${showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
              }`}
          >
            <CheckCircle size={20} className="text-white" /> {flash.message}
          </div>
        )}

        {/* Header */}
        {/* {auth.user && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h1 className="text-2xl font-bold text-green-700">
                    Browse Materials{" "}
                    <span className="text-xs text-gray-400 font-normal">{">"} All</span>
                </h1>
                <button
                    onClick={openMaterialModal}
                    className="cursor-pointer bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                    <Upload size={14} /> Upload Materials
                </button>
                </div>
            )} */}

        {/* Filters + Main */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-600">
          {/* Filters Sidebar */}
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/5">
            {/* Toggle button for mobile */}


            {/* Filters content */}
            <div
              className={`bg-gray-100 p-4 rounded-lg transition-all duration-300 ease-in-out ${showFilters ? "block" : "hidden md:block"
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
                    <label key={category} className="flex text-sm items-center space-x-2">
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
              <div className="mt-2">
                <h3 className="font-semibold">Condition</h3>
                <div className="space-y-2 mt-2">
                  {["New", "Like New", "Good", "Fair", "Restorable"].map((condition) => (
                    <label key={condition} className="flex text-sm items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedConditions.includes(condition)}
                        onChange={() => handleConditionChange(condition)}
                      />
                      <span>{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sorting */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">

              <div className="relative w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Search for materials..."
                  className="w-full px-4 text-sm py-1 border border-gray-300 rounded-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search
                  className="absolute right-3 top-1.5 text-gray-500"
                  size={16}
                />
              </div>

              <div className="flex items-center gap-2 text-xs w-full justify-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                >
                  <Filter size={16} /> Filters
                </button>

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
              className={`mt-6 ${view === "grid"
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
                          src={`/storage/${JSON.parse(material.image)[0]}`}
                          alt={material.material_name}
                          className="w-full h-30 object-cover rounded-xl shadow-sm"
                        />
                      )}

                      <div className="flex justify-between items-center mt-3">
                        <div
                          className={`text-xs text-white px-3 py-1 rounded-full shadow-md ${material.forbdt === "Trade"
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
    </div>
  );
}
