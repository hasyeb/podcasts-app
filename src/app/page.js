"use client";
import { useState, useEffect, useRef } from "react";
const axios = require('axios');
import VideosComponent from "./components/VideosComponent";
import PaginationComponent from "./components/PaginationComponent";
import HeaderComponent from "./components/HeaderComponent";
import SpinnerComponent from "./components/SpinnerComponent";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  // Pagination and Filtering
  const itemsPerPage = 8;

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
    setLoading(true);

    try {
      const response_one = await axios.get("http://localhost:3003/podcasts", { params });
      setTotalPages(Math.ceil(response_one.data.length / itemsPerPage));

      params.page=currentPage;
      params.limit=itemsPerPage;
      const response_two = await axios.get("http://localhost:3003/podcasts", { params });
      setErrorMessage('');
      setVideos(response_two.data);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Could not find any Podcast for your search.');
      setLoading(false);
      console.error("Failed to fetch video data:", error);
    }
  };
  
  useEffect(() => {
      //Debouncing
      let timeout = setTimeout(() => {
        fetchVideos();
      }, 500);
      return () => clearTimeout(timeout);
  }, [searchTerm, title, category, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Search Options */}
      <HeaderComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} title={title} setTitle={setTitle} category={category} setCategory={setCategory} />
      
      { (!errorMessage) ? 
        <>
          {/* Video List and Pagination */}
          {/* Note: Not using thumbnail images because for most of the podcasts its not available.*/}
          {loading ?
            <SpinnerComponent /> 
          :
            <>
              <VideosComponent videos={videos} />
              <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
            </>
          }
        </>
      :
        <div className="w-full text-center bg-amber-500 py-8 text-white text-xl rounded-lg shadow">
          {errorMessage}
        </div>
      }
    </div>
  );
}
