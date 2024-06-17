document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.input-part');
  const storeList = document.getElementById('storeList').getElementsByTagName('tbody')[0];
  const preloader = document.querySelector('.preloader');

  // Hide preloader after content is loaded
  window.addEventListener('load', () => {
      preloader.style.display = 'none';
  });

  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      const studentName = document.getElementById('studentName').value.trim();
      const collegeName = document.getElementById('collegeName').value.trim();
      const email = document.getElementById('email').value.trim();
      const gender = document.getElementById('gender').value.trim();
      const skills = document.getElementById('skills').value.trim();
      const photoInput = document.getElementById('photo');
      const photoFile = photoInput.files[0];

      if (validateForm(studentName, collegeName, email, gender, skills, photoFile)) {
          const reader = new FileReader();
          reader.onload = function(event) {
              addToTable(studentName, collegeName, email, gender, skills, event.target.result);
          }
          reader.readAsDataURL(photoFile);
          form.reset();
      }
  });

  function validateForm(studentName, collegeName, email, gender, skills, photoFile) {
      if (!studentName || !collegeName || !email || !gender || !skills || !photoFile) {
          alert('All fields are required!');
          return false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
          alert('Please enter a valid email address.');
          return false;
      }

      return true;
  }

  function addToTable(studentName, collegeName, email, gender, skills, photoSrc) {
      const newRow = storeList.insertRow();

      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);
      const cell6 = newRow.insertCell(5);

      const img = document.createElement('img');
      img.src = photoSrc;
      cell1.appendChild(img);

      cell2.innerText = studentName;
      cell3.innerText = collegeName;
      cell4.innerText = email;
      cell5.innerText = gender;
      cell6.innerText = skills;
  }
});
