import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const [products,setproducts]=useState([]);
 const[pageno,setpageno]=useState(1);
 const dummy=async()=>{
  const res=await fetch('https://dummyjson.com/products?limit=100');
  const data=await res.json();
  setproducts(data.products)
 }
 console.log(products);

useEffect(()=>{
  dummy();
},[]);
const setSeclectedPage=(selectedpage)=>{
  if(selectedpage>=1 && selectedpage<=products.length/10 && selectedpage!=pageno)
      setpageno(selectedpage);
}
  

  return (
    <>
    {
      products.length>0 && <div className='productscont'>
        {products.slice(pageno*10-10,pageno*10).map((prod)=>{
          console.log(prod.title);
           return( <span className='spancont' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title}></img>
            <span>{prod.title}</span>
           </span>)
        })
        
        
        }
      </div>
       
    }{
      products.length>0 && <div className='pagination'>
             <span onClick={()=>{
              setSeclectedPage(pageno-1);
             }} className={pageno>1?"":"setdisbled"}>⬅️</span>
             {
              [...Array(products.length/10)].map((_,i)=>{
                return (<span key={i} className={pageno=== i + 1 ? "selectedpage" : ""} onClick={()=>{
                        setSeclectedPage(i+1);
                }}>
                    {i+1}
                </span>)
              })
             }
             
             <span onClick={()=>{
              setSeclectedPage(pageno+1);
             }} className={pageno<products.length/10?"":"setdisbled"}>▶️</span>
      </div>
    }
    </>
  )
}

export default App
