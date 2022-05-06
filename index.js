// Initialize do modal
document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems, {
    opacity: 0.8,
    inDuration: 250,
    dismissible: false,
    startingTop: "4%",
    endingTop: "30%"
  });
});
