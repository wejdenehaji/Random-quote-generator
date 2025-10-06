//I need to fetch the quotes in here then do export 
 export async function fetchQuote(){
    const response= await fetch("https://api.api-ninjas.com/v1/quotes",
        {
            headers:{
                'X-Api-Key':'FNjoTr+4Axui1IWJC9+Tfw==3ZTs5Otn31eJicMI'
            }
        }
    );
    if(!response.ok){
        throw new Error("Oops! Failed to load quote.")
    }
    const data= await response.json();
     return data;  
}


