// import React from "react";
// import './Navigation.css';
// import avatar from "../img/avatar.png";
// import { signout } from "../../utils/Icons";
// import { menuItems } from "../../utils/menuItems";

// // Define the props for Navigation
// interface NavigationProps {
//   active: number;
//   setActive: (id: number) => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ active, setActive }) => {
//   return (
//     <nav className="nav-styled">
//       <div className="user-con">
//         {/* <img src={avatar} alt="User Avatar" /> */}
//         <div className="text">
//           <h2>Mike</h2>
//           <p>Your Money</p>
//         </div>
//       </div>
//       <ul className="menu-items">
//         {menuItems.map((item) => (
//           <li
//             key={item.id}
//             onClick={() => setActive(item.id)}
//             className={active === item.id ? "active" : ""}
//           >
//             {item.icon}
//             <span>{item.title}</span>
//           </li>
//         ))}
//       </ul>
//       <div className="bottom-nav">
//         <li>
//           {signout} Sign Out
//         </li>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;




import React, { useState } from "react";
import "./Navigation.css";
import { signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";

// Define the props for Navigation
interface NavigationProps {
  active: number;
  setActive: (id: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ active, setActive }) => {
  const [avatar, setAvatar] = useState<string | null>(localStorage.getItem("userAvatar") || null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        localStorage.setItem("userAvatar", base64String); // Save avatar in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("currentUser"); // Clear only the user ID from localStorage
    localStorage.removeItem("user"); // Clear only the user ID from localStorage
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <nav className="nav-styled">
      <div className="user-con">
        <label htmlFor="avatar-upload" className="avatar-label">
          <img src={avatar || "default-avatar.png"} alt="User Avatar" className="user-avatar" />
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
        <div className="text">
          <h2>Mike</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <li onClick={handleSignOut}>
          {signout} Sign Out
        </li>
      </div>
    </nav>
  );
};

export default Navigation;

