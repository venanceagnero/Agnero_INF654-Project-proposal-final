const announcement = document.querySelector(".listcontainer");

//for announcement
const renderAnnouncement = (data, id) => {
    const html = ` <div class=" announcement-item ">
    <div class="card-panel announcement" data.id="${id}">
        <div class="ancmntinfo">
            <div class="announcedate">
                <span> ${data.Date}</span>
            </div>

            <div class="announcetitle">
                <h6> ${data.Title}</h6>
            </div>
            <div class="announce-detail">
                <p> ${data.Announcement}</p>
            </div>
        </div>

    </div>
</div>`;
    announcement.innerHTML += html;
}