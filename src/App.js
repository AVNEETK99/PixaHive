import Photos from './Photos/Photos';
import {FaSearch} from 'react-icons/fa';
import React,{ useState,useEffect } from 'react';



const clientID = `?client_id=vpwYTgTtMnKlJaExnJ5-d5HRHPmDRLPB7E-bxzErPrg`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;





function App() {
  const [loading,setLoading]=useState(false)
  const [photos,setPhotos]=useState([])
  const [page,setPage]=useState(1)
  const [query,setQuery]=useState("")

  const fetchImages=async() =>{
    setLoading(true);
    let url;
    const urlPage =`&page=${page}`
    const urlQuery=`&query=${query}`

    if(query){
      url=`${searchUrl}${clientID}${urlPage}${urlQuery}`;
    }
    else{
      url=`${mainUrl}${clientID}${urlPage}`
    }
    try{
      const response = await fetch(url)
      const data=await response.json();
      setPhotos((oldPhoto) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhoto, ...data.results];
        } else {
          return [...oldPhoto, ...data];
        }
      });
    }
    catch(error){
      setLoading(false)
      console.log(error)
    }


  }
  
  useEffect(() =>{
    fetchImages();  
  },[page])

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);
   


  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };



  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input type='text' placeholder='search' className='form-input' value={query} onChange={(e)=> setQuery(e.target.value)}/>
          <button type='submit' className='submit-btn'onClick={handleSubmit}>
          <FaSearch/>
          </button>
        </form>
      </section>
      <section className='photos'>
      <div className="photos-center">
          {photos.map((image, index) => {
            return <Photos key={index} {...image} />;
          })}
        </div>

      </section>
    </main>
  );
}

export default App;
