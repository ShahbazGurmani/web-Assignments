$("#formValidation").validate({
  rules: {
    name: {
      minlength: 3,
    },
    email: {
      email: true,
    },
    phone: {
      number: true,
      minlength: 10,
      maxlength: 12,
    },

    messages: {
      name: {
        required: "Please Enter Your Name",
        minlength: "Name At least 3 characters ",
      },

      email: "Please enter your email",
      phone: "Please Enter Your Phne Number",
      formMessage: "Please Enter A message",
    },
  },
  submitHandler: function (form) {
    form.submit();
  },
});
