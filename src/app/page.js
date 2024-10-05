"use client";
import { useState, useEffect } from "react";
const axios = require('axios');

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');

  // Pagination and Filtering
  const itemsPerPage = 10;

  // Fetch video data from the API
  const fetchVideos = async () => {
    let params = {};
    if(searchTerm){
      params.search = searchTerm;
    }
    if(title){
      params.title = title;
    }
    if(category){
      params.categoryName = category;
    }

    try {
      const response_one = await axios.get("http://localhost:3003/podcasts", { params });
      console.log('1>>>', response_one.data);
      setTotalPages(Math.ceil(response_one.data.length / itemsPerPage));

      params.page=currentPage;
      params.limit=itemsPerPage;
      const response_two = await axios.get("http://localhost:3003/podcasts", { params });
      console.log('2>>>', response_two.data);
      setErrorMessage('');
      setVideos(response_two.data);
    } catch (error) {
      setErrorMessage('Could not find any Podcast for your search.');
      console.error("Failed to fetch video data:", error);
    }
  };
  
  useEffect(() => {
    fetchVideos();
  }, [searchTerm, category, title, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Search Options */}
      <div className="bg-white shadow p-4 rounded-md mb-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full md:w-1/2 lg:w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full md:w-1/2 lg:w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-1/2 lg:w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
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

      {/* Video List and Pagination */}
      {/* Notes: Not using thumbnail images because for most of the podcasts its not available.*/}
      { (!errorMessage) ? 
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video?.id} className="bg-white rounded-md shadow p-4">
                <img src={video?.images?.featured ? video?.images?.featured : video?.images?.default} alt={video?.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h2 className="text-lg font-bold">{video.title}</h2>
                <p className="text-gray-600">{video?.categoryName}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <button type="button" 
              className={`${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"} text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <svg className="w-4 h-4" aria-hidden="true" transform="scale(-1 1)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
            <span className="mx-2">{currentPage} / {totalPages}</span>
            <button type="button"
              className={`${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"} text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
          </div>
        </>
      :
        <div>
          {errorMessage}
        </div>
      }
    </div>
  );
}
