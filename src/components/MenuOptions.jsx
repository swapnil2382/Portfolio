import React from "react";

const MenuOptions = ({ closeMenu }) => {
  const menuItems = [
    { name: "About", id: "page2" },
    { name: "Skills", id: "page3" },
    { name: "Experience", id: "page5" },
    { name: "Projects", id: "page4" },
    { name: "Contact", id: "page6" },
  ];

  return (
    <ul className="flex flex-col space-y-3 text-lg font-medium text-gray-300">
      {menuItems.map((item, index) => (
        <li
          key={index}
          id={item.id} 
          className="hover:text-yellow-500 cursor-pointer transition-all duration-300"
          onClick={closeMenu}
        >
          <a href={`#${item.id}`}>{item.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default MenuOptions;
