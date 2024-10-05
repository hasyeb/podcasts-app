import React from "react";

const VideosComponent = ({videos}) => {

  const controlText = (txt) => {
    if(txt.length > 100){
      return txt.substring(0,100)+' ...';
    }
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos?.map((video) => (
        <div key={video?.id} className="max-w-sm bg-white rounded-lg shadow">
            <a href="#">
                <img className="rounded-t-lg" src={video?.images?.featured ? video?.images?.featured : video?.images?.default} alt={video?.title} />
            </a>
            <div className="p-5">
                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">{video?.title}</h5>
                <p className="mb-1 text-sm font-normal text-gray-500">{video?.categoryName}</p>
                <p className="mb-2 text-md font-normal text-gray-700 text-justify">{controlText(video?.description)}</p>
                <button type="button" className="text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2">Watch</button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default VideosComponent;
