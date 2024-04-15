export function useUtils(){
    function setImageSize(imageUrl,size){
         return `${imageUrl.slice(0,imageUrl.indexOf('?'))}?w=${size}`
    }

    return{
        setImageSize
    }
}