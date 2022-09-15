// ACCORDIAN TABLE OPEN AND CLOSE FUNCTIONS FOR EACH OF 3 LAYERS
$(function () {
  $(".fold-table").on("click", "tr.view", function () {
    $(this).toggleClass("open").next(".fold").toggleClass("open");
  });
});

$(function () {
    $(".fold-table").on("click", "tbody.view-2", function () {
      $(this).toggleClass("open").next(".fold-2").toggleClass("open");
    });
  });
$(function () {
  $(".fold-table").on("click", "tr.view-3", function () {
    $(this).toggleClass("open").next(".fold-3").toggleClass("open");
  });
});
$(function () {
    $(".fold-table").on("click", "tbody.view-3", function () {
      $(this).toggleClass("open").next(".fold-3").toggleClass("open");
    });
  });