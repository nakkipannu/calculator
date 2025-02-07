document.addEventListener('DOMContentLoaded', function() {
  var formElement = document.forms.myForm;
  var resultDiv = document.getElementById('myResults');

  // Function to ensure only numbers are entered and enforce max value
  function enforceNumericInput(event) {
    var value = event.target.value;
    var max = event.target.max;
    event.target.value = value.replace(/[^0-9]/g, '');
    if (parseInt(event.target.value, 10) > max) {
      event.target.value = max;
    }
  }

  // Add event listeners to input fields
  document.getElementById('cups').addEventListener('input', enforceNumericInput);
  document.getElementById('days').addEventListener('input', enforceNumericInput);

  formElement.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the form from submitting and reloading the page

      var cups = document.getElementById('cups').value;
      var days = document.getElementById('days').value;

      // Check if either field is empty
      if (!cups || !days) {
          showCustomAlert('Both fields need to be filled');
          return;
      }

      var result1 = (parseFloat(cups) * 20) / 1000;
      var result2 = (parseFloat(cups) * parseFloat(days) * 20) / 1000;
      var result3 = result2 * 4;
      var result4 = result2 * 52;
      var result5 = Math.round((result3 / 9) * 11);
      var result6 = Math.round((result4 / 9) * 11);
      document.getElementById('resultDisplay1').innerHTML = result1; // put your results where they need to be
      document.getElementById('resultDisplay2').innerHTML = result2;
      document.getElementById('resultDisplay3').innerHTML = result3;
      document.getElementById('resultDisplay4').innerHTML = result4;
      document.getElementById('resultDisplay5').innerHTML = result5;
      document.getElementById('resultDisplay6').innerHTML = result6;
      resultDiv.style.display = 'inherit'; // make the hidden div visible.
  });

});

// Function to show custom alert
function showCustomAlert(message) {
  var customAlert = document.getElementById('customAlert');
  var customAlertMessage = document.getElementById('customAlertMessage');
  customAlertMessage.innerText = message;
  customAlert.style.display = 'flex';
}

// Function to close custom alert
function closeCustomAlert() {
  var customAlert = document.getElementById('customAlert');
  customAlert.style.display = 'none';
}

