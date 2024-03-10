
export default function Footer({page}) {
  return (
    page === 'homepage' ? 
    <div className="w-[80%] absolute bottom-2">
    <div className="bg-black w-[70%] rounded-2xl mx-auto h-[10px]"></div>  
    </div>
    :
    <div className="bg-gray-400 h-[10px] w-[70%] mx-auto rounded-2xl left-[45px] absolute bottom-[4px]">
    </div>
  )
}
