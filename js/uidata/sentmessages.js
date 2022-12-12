const message = document.querySelector(".listcontainer");

//for announcement
const renderMessage = (data, id) => {
    const html = `
    <div class=" message-item" data-id="${id}">
    <div class="card-panel message">

    <div class="message-delete">
    <i class="material-icons" data-id ="${id}"> delete_outline </i>
</div>
        <div class="messageinfo">
            <div class="messagedate">
                <span> </span>
            </div>

            <div class="message-detail">
            <p> ${data.Message}</p>
            </div>
        </div>
       
    </div>
</div>
`;
    message.innerHTML += html;
}


//remove message form DOM
const removeMessage = (id) => {
    const message = document.querySelector(`.message-item[data-id = '${id}'] `);
    message.remove();

}