

function Card({img, title, key}){
    return(
            <div key={key} className="flex flex-col justify-between items-center p-4 border-2 bg-gray-500 w-[15rem] h-[15rem]">
                <img src={img} alt={title} width={90}/>
                <h2>{title}</h2>
            </div>
    )
}


export default Card;
