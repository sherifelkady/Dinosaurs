function uiUpdate(){
    
}


// get dinasaurces from dino.json
async function getdata(){
    const response = await fetch('dino.json');
    const data = await response.json();
    return data;
}

const zero = async ()=>{
    let theList = document.getElementById("tempList");
    let the_data = await getdata().then();
    let getDino = '';
    the_data.Dinos.forEach((dino) => {
        getDino += `<li>${dino.species}</li>`;
    })

    return theList.innerHTML = getDino;

}
zero()

// Get data from form
const form = document.getElementById("dino-compare");
const btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "none";
})