// Initialize EmailJS
(function () {
    emailjs.init("FeQyjmMYlo-sRBvLJ"); // Replace with your actual user ID
  })();
  
  // Function to send emails
  function sendEmails() {
    const senderEmail = document.getElementById("senderEmail").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const fileInput = document.getElementById("csvFile").files[0];
  
    const validEmails = [];
    const invalidEmails = [];
  
    // Read the CSV file
    const reader = new FileReader();
    reader.readAsText(fileInput);
    reader.onload = function (event) {
      const csv = event.target.result.split('\n');
      csv.forEach(email => {
        email = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailRegex.test(email) ? validEmails.push(email) : invalidEmails.push(email);
      });
  
      // Display results
      document.getElementById("validEmails").innerHTML = validEmails.join("<br>");
      document.getElementById("invalidEmails").innerHTML = invalidEmails.join("<br>");
      document.getElementById("validEmailCount").innerText = `(${validEmails.length})`;
      document.getElementById("invalidEmailCount").innerText = `(${invalidEmails.length})`;
  
      // Send emails
      validEmails.forEach(email => {
        const templateParams = {
          to_name: email,
          from_name: senderEmail,
          message_html: message,
          subject_html: subject
        };
  
        // Replace your service and template IDs below
        emailjs.send("service_cfrsiqs", "template_mst9zyl", templateParams)
          .then(response => console.log("SUCCESS", response))
          .catch(error => console.log("FAILED", error));
      });
  
      alert("Emails sent successfully!");
    };
  }
  
  // Rotating text animation
  class TxtRotate {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.isDeleting = false;
      this.tick();
    }
  
    tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
  
      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
      this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;
  
      let delta = 300 - Math.random() * 100;
      delta = this.isDeleting ? delta / 2 : delta;
  
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
  
      setTimeout(() => this.tick(), delta);
    }
  }
  
  // Initialize rotating text
  window.onload = function () {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let el of elements) {
      const toRotate = JSON.parse(el.getAttribute('data-rotate'));
      const period = el.getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(el, toRotate, period);
      }
    }
  };
  