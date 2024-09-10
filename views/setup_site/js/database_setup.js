$("#database_setup_form").submit((event) => {
  event.preventDefault();

  const website_name = $('#website_name').val();
  const host = $('#host').val();
  const db_name = $('#db').val();
  const user = $('#user').val();
  const password = $('#password').val();

  $('#submitBtn').text("Creating Site...").prop('disabled', true);

  $.ajax({
    type: "GET",
    url: "/api/setup/site/database",
    data: { website_name, host, db_name, user, password },
    success: function (data) {
      $('#notification').html(`<div class="alert alert-success">
        <b>${data.title}</b><br />
        <span>${data.message}</span>
        </div>`)
      $('#submitBtn')
      .text("Site Created")
      .removeClass('btn-dark')
      .addClass('btn-success');

      setTimeout(() => {
        window.location.href = "/site/dashboard?site=" + website_name;
      }, 2000);
    },
    error: function (xhr, status, error) {
      $('#notification').html(`<div class="alert alert-danger">
        <b>${error.title}</b><br />
        <span>${error.message}</span>
        </div>`)
      $('#submitBtn')
      .text("Failed to Create Site")
      .removeClass('btn-dark')
      .addClass('btn-danger')
      .prop('disabled', false);
    },
  });
});
