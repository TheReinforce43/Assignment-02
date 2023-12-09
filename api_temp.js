
const card_container_js = document.getElementById('display_container');
var all_Data = []; // All_data array defined for sorting button purposes



const Genre_card = async (category_id) => {
    document.getElementById('display_container').innerHTML = '';
    const Response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    const Row = await Response.json();
    console.log(Row);
    DisplayData(Row.data);
};

const img_div = document.getElementById('No_content');

const DisplayData = (data) => {
    // console.log(data);

    all_Data = data;
    if (data.length === 0) {
        console.log(all_Data.status);
        img_div.style.display = "block";  //No Genres colection here 
    }
    else {

        img_div.style.display = 'none'; //Display none ,cause Muvie database are exists.
        document.getElementById('display_container').innerHTML = ''; //Clear previous display
      
        all_Data.forEach(element => {
            
            const card = document.createElement('div');
            const thumbnail_img = document.createElement('div');
            const main_contents=document.createElement('div');
            const profile_img=document.createElement('div');
            const profile_info=document.createElement('div');
         
            card.classList.add('box');

            thumbnail_img.innerHTML=`<img src=${element.thumbnail} alt='thumbnail Image' />`;
            profile_img.innerHTML=`<img src=${element.authors[0].profile_picture} alt='profile Image' />`;

            profile_info.innerHTML = `
           
            <h3>${element.title}</h3>
            <h4>${element.authors[0].profile_name}</h4>
            <h4>${element.others.views}</h4>
            `;

            main_contents.appendChild(profile_img);
            main_contents.appendChild(profile_info);

            card.appendChild(thumbnail_img);
            card.appendChild(main_contents);
            
            card_container_js.appendChild(card);
        });
    }


};

// This function used for sorting the objects in js.

const sorting_function = () => {

    // console.log('paichi kagu')

    all_Data.sort((a, b) => {
        //k=thousand=1000, So, we replace k instead of '000'
        const viewsA = parseInt(a.others.views.replace('K', '000')); 
        const viewsB = parseInt(b.others.views.replace('K', '000'));
        return viewsB - viewsA;
    });

    DisplayData(all_Data)
}


Genre_card(1000);  //By default calling this function.