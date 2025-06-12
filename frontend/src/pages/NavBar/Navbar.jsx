import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, removeNotification } from "../../state";
import { useNavigate, useLocation } from "react-router-dom";
import Friend from "../../components/Friend";
import logo from "../../assets/data-element-connect-infographic-organization-graph-svgrepo-com.svg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const token = useSelector((state) => state.token);
  const notifications = useSelector(
    (state) => state.userNotifications[user?._id] || []
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsNotificationOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const results = allUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleRemoveNotification = (id) => {
    dispatch(removeNotification({ userId: user._id, notificationId: id }));
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain mr-2 sm:mr-4"
        />
        <h1
          className="font-bold text-xl sm:text-2xl text-white cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hidden sm:block"
          onClick={() => navigate("/home")}
        >
          Connectify
        </h1>
      </div>
      <div className="relative flex-1 max-w-xs sm:max-w-md mx-4 sm:mx-8">
        <input
          type="text"
          placeholder="Search..."
          className="bg-purple-200 rounded-lg py-2 px-4 w-full focus:outline-none focus:bg-purple-300 transition duration-300 ease-in-out"
          value={searchInput}
          onChange={handleSearchInputChange}
        />

        {searchInput && searchResults.length > 0 && (
          <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-10 overflow-hidden">
            {searchResults.map((result) => (
              <Friend
                key={result._id}
                friendId={result._id}
                name={`${result.firstName} ${result.lastName}`}
                subtitle={result.email}
                userPicturePath={result.picturePath}
                showButton={result._id !== user._id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          className="p-2 rounded-lg bg-purple-200 hover:bg-purple-300 focus:outline-none mr-2 sm:mr-4 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          aria-expanded={isNotificationOpen}
        >
          <span className="text-white">
            Notifications ({notifications.length})
          </span>
        </button>

        {isNotificationOpen && (
          <div className="absolute right-0 mt-12 sm:mt-16 py-2 w-64 sm:w-80 bg-white rounded-lg shadow-lg z-10 overflow-hidden animate__animated animate__fadeIn">
            {notifications.length === 0 ? (
              <p className="px-4 py-2 text-gray-700">No new notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                >
                  <p>{notification.message}</p>
                  <button
                    onClick={() => handleRemoveNotification(notification.id)}
                    className="text-red-500"
                  >
                    Dismiss
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <button
          className="p-2 rounded-lg bg-purple-200 hover:bg-purple-300 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
        >
          <span className="text-white text-sm sm:text-base">{fullName}</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-12 sm:mt-16 py-2 w-32 sm:w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden animate__animated animate__fadeIn">
            <button
              className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => {
                dispatch(setLogout());
                setIsDropdownOpen(false);
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
