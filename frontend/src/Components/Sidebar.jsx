  import React, { useState } from "react";
  import { useTheme } from "./ThemeContext";

  const mainCategories = [
    { name: "All", icon: "🌟", sub: null },
    { name: "Cost", icon: "💰", sub: ["Under ₹500", "₹500-₹700", "Over ₹700"] },
    { name: "Days", icon: "📅", sub: ["1-5 Days", "6-10 Days", "11+ Days"] },
    { name: "Landscape", icon: "🏞️", sub: ["Beach", "Mountain", "Heritage", "City"] }
  ];

  const Sidebar = ({ selectedFilters, setSelectedFilters }) => {
    const { darkMode } = useTheme();
    const [expanded, setExpanded] = useState(null);

    const handleMainClick = (category) => {
      if (category.name === "All") {
        setSelectedFilters({ category: "All", cost: null, days: null, landscape: null });
        setExpanded(null);
      } else {
        setExpanded(expanded === category.name ? null : category.name);
      }
    };

    const handleSubClick = (main, sub) => {
      setSelectedFilters({ ...selectedFilters, [main.toLowerCase()]: sub });
    };

    const handleRemoveFilter = (key) => {
      setSelectedFilters({ ...selectedFilters, [key]: null });
    };

    return (
      <div
        className={`fixed left-0 top-16 h-svh ${
          darkMode ? 'bg-slate-800 border-r border-slate-600' : 'bg-white border-r border-gray-200'
        } p-6 w-72 shadow-lg overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="mb-8 text-center">
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Filters
          </h3>
        </div>

        {/* Main Categories */}
        <ul className="space-y-3">
          {mainCategories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => handleMainClick(category)}
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
                  selectedFilters.category === category.name || (category.name !== "All" && selectedFilters[category.name.toLowerCase()])
                    ? 'bg-indigo-600 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                {category.sub && (
                  <span className="ml-auto text-sm">
                    {expanded === category.name ? '−' : '+'}
                  </span>
                )}
              </button>

              {/* Sub Categories */}
              {expanded === category.name && category.sub && (
                <div className="mt-2 ml-6 space-y-2">
                  {category.sub.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSubClick(category.name, sub)}
                      className={`w-full px-3 py-2 rounded text-sm ${
                        selectedFilters[category.name.toLowerCase()] === sub
                          ? 'bg-indigo-500 text-white'
                          : darkMode
                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Active Filters Indicator */}
        <div className="mt-6 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([key, value]) => (
              value && key !== 'category' && (
                <div
                  key={key}
                  onClick={() => handleRemoveFilter(key)}
                  className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded text-xs cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800 flex items-center gap-1"
                >
                  {key}: {value}
                  <span className="text-indigo-600 dark:text-indigo-400">×</span>
                </div>
              )
            ))}
            {Object.values(selectedFilters).every(v => !v || v === 'All') && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                All Destinations
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Sidebar;
