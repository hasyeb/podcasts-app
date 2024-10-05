import React from "react";

const HeaderComponent = ({searchTerm, setSearchTerm, title, setTitle, category, setCategory}) => {
  return (
    <div className="bg-white shadow p-4 rounded-md mb-4">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          className="focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none w-full md:w-1/2 lg:w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          className="focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none w-full md:w-1/2 lg:w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="focus:ring-2 focus:ring-amber-500 focus:outline-none w-full md:w-1/2 lg:w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Comedy">Comedy</option>
          <option value="History">History</option>
          <option value="Performing Arts">Performing Arts</option>
          <option value="Sexuality">Sexuality</option>
          <option value="Religion & Spirituality">Religion & Spirituality</option>
          <option value="Sports & Recreation">Sports & Recreation</option>
          <option value="Society & Culture">Society & Culture</option>
          <option value="TV & Film">TV & Film</option>
          <option value="Food">Food</option>
        </select>
      </div>
    </div>
  );
};

export default HeaderComponent;
