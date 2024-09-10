$("#new-model-form").show(0);
$("#model-list").hide(0);
$("#create-model").on("click", () => {
  $("#model-list").hide("slow");
  $("#new-model-form").show("slow");
});
