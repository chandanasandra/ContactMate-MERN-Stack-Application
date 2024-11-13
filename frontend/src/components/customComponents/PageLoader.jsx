import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const PageLoader = ({setLoading}) => {
  const location = useLocation();
  useEffect(()=>{
    setLoading(true);
    const timer = setTimeout(()=>setLoading(false), 300);
     // Clear timeout if component unmounts before timeout ends
     return () => clearTimeout(timer);
  },[location,setLoading]);

  return null;
}

export default PageLoader