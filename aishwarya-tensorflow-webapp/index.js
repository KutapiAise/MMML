$(document).ready(function () {
  // Init
  $('.image-section').hide();
  $('.loader').hide();
  $('#result').hide();

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {


        document.getElementById("imagePreview").src = e.target.result;
        document.getElementById("imagePreview"). height="360" ;
        document.getElementById("imagePreview").width="512";
      }
      reader.readAsDataURL(input.files[0]);
    }
  }


  $("#imageUpload").change(function () {
    $('.image-section').show();
    $('#btn-predict').show();
    $('#result').text('');
    $('#result').hide();
    readURL(this);
  });
  let net;
  async function app() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');

    // Make a prediction through the model on our image.
    const imgEl = document.getElementById('imagePreview');
    const result = await net.classify(imgEl);

    $('.loader').hide();
    $('#result').fadeIn(600);
    $('#result').text(' Result:  ' + result[0].className+'\n'+' Probability:  ' + result[0].probability);
    console.log('Success!');
    console.log(result);
  }

  // Predict
  $('#btn-predict').click(function () {
    var form_data = new FormData($('#upload-file')[0]);

    // Show loading animation
    $(this).hide();
    $('.loader').show();

    app();
    
  });

});
