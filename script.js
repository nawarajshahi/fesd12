var apiURL = "https://crudcrud.com/api/169bc25e3a484a338df3c830a0b1d49f";
var getRestroomsBtn = document.getElementById("btn-read");
var createRestroomBtn = document.getElementById("btn-create");
var restrooms = document.getElementById("restrooms-info");

// Create input variables
var inputSerialNo = document.getElementById("inputSerialNo");

// Update variables
var updateSerialNoBtn = document.getElementById("btn-update");
var updateSerialNoValue = document.getElementById("updateSerialNoValue");
var existingRestroomId = document.getElementById("existingRestroomId");

// Delete variables
var deleteRestroomBtn = document.getElementById("btn-delete");
var deleteRestroomId = document.getElementById("deleteSerialNo");


/* Get all restrooms info implementation 
*/
async function getRestrooms() {
    var result = await $.ajax({
      url: apiURL + "/restrooms",
      dataType: "json",
      contentType: "application/json",
      type: "GET",
      error: sayError,
    });
    return result;
}

const sayError = (error) => {
    console.log(error);
};

const doStuffWithData = (data) => {
    console.log(data);
};

getRestroomsBtn.addEventListener("click", () => getRestrooms().then((data) => {

    console.log(data);
    restrooms.innerHTML = ""
  
    for (var i = 0; i < data.length; i++){
      var serialNo = data[i].restroom
      var restroomId = data[i]._id
      var p = document.createElement('p')
      p.innerHTML = "<b>Restroom id: </b>" + restroomId + "&emsp;<b>Serial No: </b>" + serialNo
      restrooms.appendChild(p)
    }
  }))


  /* Create Restroom implementation 
  */

  async function createRestroom(newRestroom) {
    await $.ajax({
      url: apiURL + "/restrooms",
      dataType: "json",
      data: JSON.stringify({ restroom: newRestroom }),
      contentType: "application/json",
      type: "POST",
      success: doStuffWithData,
      error: sayError
    });
  }

  createRestroomBtn.addEventListener("click", () => createRestroom(inputSerialNo.value))


  /* Update restroom info implementaiton
  */

  async function updateRestroom(existingRestroomId, newSerialNo) {

    console.log(existingRestroomId, newSerialNo);
    
    await $.ajax({
      url: apiURL + "/restrooms/" + existingRestroomId,
      dataType: "json",
      data: JSON.stringify({ restroom: newSerialNo }),
      contentType: "application/json",
      type: "PUT",
      success: doStuffWithData,
      error: sayError
    });
  }

  updateSerialNoBtn.addEventListener("click", () => updateRestroom( existingRestroomId.value, updateSerialNoValue.value));




  /* Delete restroom by existing restroom id
  */
  async function deleteRestroom(existingRestroomId) {
    console.log(existingRestroomId)
    await $.ajax({
      url: apiURL + "/restrooms/" + existingRestroomId,
      type: "DELETE",
      success: doStuffWithData,
      error: sayError
    });
  }

  deleteRestroomBtn.addEventListener("click", () => deleteRestroom(deleteRestroomId.value))