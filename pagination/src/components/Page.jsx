
import { useState } from 'react';
import Card from './Card'
import axios from 'axios';
import { useEffect } from 'react';

function Page(){
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(1);


    const render = async()=>{
        const data = await axios.get(`https://dummyjson.com/products?limit=100`)
        console.log(data.data.products)
        setProduct(data.data.products)
    }

    useEffect(()=>{
        render();
    }, [])
    return(
        <div className='flex flex-col justify-between items-center gap-10'>

        <div className='flex gap-5 flex-wrap justify-between items-center p-5'>
           { products.slice(page*10-10,page*10).map((product, idx)=>{
                return(
                    <Card key={idx} img={product.images[0]} title={product.title}/>
                )
            })}
        </div>
        <div className='flex gap-3'>
            <button className={page<=1?`hidden cursor-pointer`:`block cursor-pointer`} onClick={()=>{
                setPage(page-1);
            }}>prev</button>
            {[...Array(Math.ceil(products.length / 10))].map((_, idx)=>{
                return(
                    <span key={idx} className={page==(idx+1)?`bg-gray-400 p-2 cursor-pointer rounded-full w-10 h-10 text-center`:`p-2 cursor-pointer rounded-full w-10 h-10 text-center`} onClick={()=>{
                        setPage(idx+1)
                    }}>{idx+1}</span>
                )
            })}
            <button className={page>= Math.ceil(products.length / 10)?`hidden cursor-pointer`:`block cursor-pointer`} onClick={()=>{
                setPage(page+1);
            }}>next</button>
        </div>
        </div>

    )
}

export default Page;