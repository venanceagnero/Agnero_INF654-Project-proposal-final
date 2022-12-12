const profile = document.querySelector(".listcontainer");

//populate profile data
const renderProfile = (data, id) => {
    const html = `<div class="col l3 m4 s12">
<div class="card-panel member" data-id="${id}">
    <div class="memberinfo">
        <div class="mphoto">
        <img src="${data.PhotoId}" class="responsive-img materialboxed" alt="">
        </div>
        <div class="member-detail">
            <div class="M-name"> 
            <div class="M-Fname">  ${data.Firstname}  </div>
            <div class="M-Lname">  ${data.Lastname} </div> 
            </div>
            <div class="M-city">  ${data.CityOfResidency}</div>
        </div>
    </div>
    <div class="divider"></div>
    <div class="editmessage">
        <a href="/pages/createmessage.html"> Write to</a>
    </div>
</div>
</div>
`;
    profile.innerHTML += html;
}