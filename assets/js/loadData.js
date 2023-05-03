// Scroll Top
$(document).ready(function () {
  initializePage();
  scrollButton();
  datepicker("#depDate1");
  datepicker("#depDate2");
  datepicker("#arrDate2");
  //promptAskMailPhone();
});

function initializePage() {
  setRecomended();
  setOffers();
  setDestinations();
  setRoutes();
  setTestimonials();
  setDate();

  initializeFormFromTo();
  initializeFormOneRoundAndPassengersNumber();
  initializeEnquireNow();
  initializeContactUsEvent();
}

function initializeFormFromTo() {
  let content = "";
  airports.map((el) => {
    content += `<option value=${el}>`;
  });
  $("#datalistOptions").append(content);
}

function initializeFormOneRoundAndPassengersNumber() {
  $(".oneOrRound1").hide();
  $(".oneOrRound").click(function (e) {
    e.preventDefault();
    let selected = $(this).attr("aria-controls");
    if (selected.includes("one")) {
      $(".oneOrRound1").show();
      $(".oneOrRound2").hide();
    } else {
      $(".oneOrRound1").hide();
      $(".oneOrRound2").show();
    }
  });

  $(".passengers").change(function (e) {
    let content = "";
    e.preventDefault();
    content =
      parseInt($("#adultNum").val().trim()) +
      parseInt($("#childNum").val().trim()) +
      parseInt($("#infanNumt").val().trim());
    $(".passengersNum").html("• " + content);
  });
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isPhone(phone) {
  var regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  return regex.test(phone);
}

function initializeEnquireNow() {
  $(".enquire-now").click(function (e) {
    e.preventDefault();
    let emailOrPhone = $("#email").val().trim();
    //let phone = $('#phone').val().trim();
    let depFrom = $("#depFrom").val().trim();
    let arrTo = $("#arrTo").val().trim();

    let selectedOne = $(".oneOrRound1").is(":visible");
    let chose = "";
    let depArrDate = "";
    if (selectedOne) {
      chose = "One Way";
      depArrDate = $("#depDate1").val().trim();
    } else {
      chose = "Round Trip";
      depArrDate =
        $("#depDate2").val().trim() + " - " + $("#arrDate2").val().trim();
    }

    let adultNum = $("#adultNum").val().trim();
    let childNum = $("#childNum").val().trim();
    let infantNum = $("#infanNumt").val().trim();
    let total =
      parseInt($("#adultNum").val().trim()) +
      parseInt($("#childNum").val().trim()) +
      parseInt($("#infanNumt").val().trim());

    let classMode = $("#class_mode").prop("checked");
    let flexMode = $("#flex_mode").prop("checked");
    let stopMode = $("#stop_mode").prop("checked");
    let classType = "Economy";
    if (classMode) {
      classType = "Premium";
    }
    let stopType = "Stop";
    if (stopMode) {
      stopType = "Non Stop";
    }
    let flexType = "Flexible";
    if (flexMode) {
      flexType = "Non Flexible";
    }

    if (
      (isEmail(emailOrPhone) || isPhone(emailOrPhone)) &&
      depFrom &&
      arrTo &&
      ((selectedOne && depArrDate.length > 10) ||
        (!selectedOne && depArrDate.length > 20)) &&
      total > 0 &&
      classType &&
      stopType &&
      flexType
    ) {
      swal(
        "Are you sure?",
        "Want to receive tickets prices within filled dates?",
        "warning",
        {
          cancel: true,
          buttons: {
            cancel: true,
            ok: {
              text: "Ok",
            },
          },
        }
      ).then((result) => {
        if (result === "ok") {
          sendMail(
            emailOrPhone,
            depFrom,
            arrTo,
            depArrDate,
            adultNum,
            childNum,
            infantNum,
            stopType,
            flexType,
            classType,
            chose
          );
          swal({
            title: "Please wait...",
            text: "while sending your request to our customer service",
            icon: "warning",
            closeOnEsc: false,
            closeOnClickOutside: false,
            buttons: false,
          });
        }
      });
    } else {
      swal("Form not complete", " ", "warning", {
        button: "Ok",
      });
      $(".swal-text").append(
        "Please fill all the fields to proceed: <br> 1) Correct Email or Phone<br>2) Depart From/Arrival To <br> 3) Departure Date/Arrival Date <br> 4) Travellers"
      );
    }
  });
}

function initializeContactUsEvent() {
  $(".contact-us").click(function (e) {
    e.preventDefault();
    window.location.href = "#";
  });
}

function setRecomended() {
  let data = [
    {
      a: "New Delhi",
      b: "Red Fort New Delhi",
      c: "India",
      d: "5.0",
      e: "Exceptional 2",
      h: "assets/images/recommended/offers01.jpeg",
    },
    {
      a: "London",
      b: "London Bridge River Thames",
      c: "United Kingdom",
      d: "5.0",
      e: "Exceptional 3",
      h: "assets/images/recommended/offers02.jpeg",
    },
    {
      a: "Sydney",
      b: "Opera House Sydney",
      c: "Australia",
      d: "5.0",
      e: "Exceptional 4",
      h: "assets/images/recommended/offers03.jpeg",
    },
    {
      a: "New York",
      b: "Statue Of Liberty New York ",
      c: "United States of America",
      d: "5.0",
      e: "Exceptional 5",
      h: "assets/images/recommended/offers04.jpeg",
    },
  ];
  let content = "";
  data.map((el) => {
    content += `<div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="card-wrap">
                <div class="con-img-wrap m-auto">
                    <img src=${el.h} class="img-fluid mx-auto d-block"
                        alt="product picture">
                    <div class="offer-tag  bg-info">${el.a}</div>
                </div>
                <div class="con-wrap mt-4">
                    <h2 class="fs-6 mt-4 fw-bold text-truncate">${el.b}</h2>
                    <p class="mb-2 theme-text-accent-two small">${el.c}</p>
                    <div class="d-flex bottom mb-2">
                        <div class="rating-cover">
                            <span class="p-1 small rounded-1 bg-danger theme-text-white">${el.d}</span>
                            <span class="me-2 small theme-text-accent-one">${el.e}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  });

  $(".recomended-section").append(content);
}

function setOffers() {
  let data = [
    { a: "Reasonable Fares", b: "assets/images/bar-chart.png" },
    { a: "Special Support", b: "assets/images/support.png" },
    { a: "Happy Customers", b: "assets/images/satisfied.png" },
  ];
  let content = "";
  data.map((el) => {
    content += `<div class="col-12 col-md-4 mb-3 mb-md-0 overflow-hidden hoverShine">
            <div class="p-3 theme-border-radius border whyBookBox">
                <div class="row justify-content-between align-items-center">
                    <div class="content">
                        <img src=${el.b} class="img-fluid whyBookBoxImage" alt="flight-destination" title="flight-destination">
                        <p class="fs-1 theme-heading theme-text-blue mb-3 whyBookBoxText">${el.a}</p>
                    </div>
                </div>
            </div>
        </div>`;
  });
  $(".offers-section").append(content);
}

function setRoutes() {
  let data = [
    {
      a: "assets/images/destinations/destination01.jpg",
      b: "Dubai",
      c: "United Arab Emirates",
    },
    {
      a: "assets/images/destinations/destination02.jpg",
      b: "Toronto",
      c: "Canada",
    },
    {
      a: "assets/images/destinations/destination03.jpg",
      b: "Istanbul",
      c: "Turkey",
    },
    {
      a: "assets/images/destinations/destination04.jpg",
      b: "Rome",
      c: "Italy",
    },
    {
      a: "assets/images/destinations/destination05.jpg",
      b: "Paris",
      c: "France",
    },
    {
      a: "assets/images/destinations/destination06.jpg",
      b: "Udaipur",
      c: "India",
    },
    {
      a: "assets/images/destinations/destination07.jpg",
      b: "Melbourne",
      c: "Australia",
    },
    {
      a: "assets/images/destinations/destination08.jpg",
      b: "Auckland",
      c: "New Zeland",
    },
  ];
  let content = "";
  data.map((el) => {
    content += `<div class="col-12 col-lg-3">
        <div class="theme-bg-white mb-5">
            <div class="row g-0 align-items-center">
                <div class="col-4">
                    <img src=${el.a} class="destinationImages" alt="flight-destination" title="flight-destination">
                </div>
                <div class="col-8">
                    <div
                        class="mt-2 mt-xxl-0 ps-3 d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column">
                            <span class="d-flex fs-6">${el.b}</span>
                            <span class="d-flex small fw-normal theme-text-accent-one">${el.c}</span>
                        </div>
                        <div class="d-flex">
                            <a href="#" class="link-btn"><span><i class="bi bi-arrow-up-right"></i></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  });
  $(".destination-section").append(content);
}

function setDestinations() {
  let data = {
    popularLastMinute: {
      popularLastMinute1: [
        `Popular flights to New Delhi`,
        `Popular flights to Hyderabad`,
        `Popular flights to Mumbai`,
        `Popular flights to Kolkata`,
        `Popular flights to Chennai`,
        `Popular flights to Bengaluru`,
        `Popular flights to Ahmedabad`,
        `Popular flights to Kochi`,
        `Popular flights to Trivandrum`,
        `Popular flights to Pune`,
      ],
      popularLastMinute2: [
        `Popular international flights to Paris`,
        `Popular international flights to Sydney`,
        `Popular international flights to New York`,
        `Popular international flights to Rome`,
        `Popular international flights to Toronto`,
        `Popular international flights to Montreal`,
        `Popular international flights to Vancouver`,
        `Popular international flights to Auckland`,
        `Popular international flights to Los Angeles`,
        `Popular international flights to London`,
      ],
    },
    allLastMinute: {
      allLastMinute1: [
        `All flights to New Delhi`,
        `All flights to Hyderabad`,
        `All flights to Mumbai`,
        `All flights to Kolkata`,
        `All flights to Chennai`,
        `All flights to Bengaluru`,
        `All flights to Ahmedabad`,
        `All flights to Kochi`,
        `All flights to Trivandrum`,
        `All flights to Pune`,
      ],
      allLastMinute2: [
        `All international flights to Paris`,
        `All international flights to Sydney`,
        `All international flights to New York`,
        `All international flights to Rome`,
        `All international flights to Toronto`,
        `All international flights to Montreal`,
        `All international flights to Vancouver`,
        `All international flights to Auckland`,
        `All international flights to Los Angeles`,
        `All international flights to London`,
      ],
    },
    popularBusiness: {
      popularBusiness1: [
        `Popular flights to New Delhi`,
        `Popular flights to Hyderabad`,
        `Popular flights to Mumbai`,
        `Popular flights to Kolkata`,
        `Popular flights to Chennai`,
        `Popular flights to Bengaluru`,
        `Popular flights to Ahmedabad`,
        `Popular flights to Kochi`,
        `Popular flights to Trivandrum`,
        `Popular flights to Pune`,
      ],
      popularBusiness2: [
        `Popular international flights to Paris`,
        `Popular international flights to Sydney`,
        `Popular international flights to New York`,
        `Popular international flights to Rome`,
        `Popular international flights to Toronto`,
        `Popular international flights to Montreal`,
        `Popular international flights to Vancouver`,
        `Popular international flights to Auckland`,
        `Popular international flights to Los Angeles`,
        `Popular international flights to London`,
      ],
    },
    allBusiness: {
      allBusiness1: [
        `All flights to New Delhi`,
        `All flights to Hyderabad`,
        `All flights to Mumbai`,
        `All flights to Kolkata`,
        `All flights to Chennai`,
        `All flights to Bengaluru`,
        `All flights to Ahmedabad`,
        `All flights to Kochi`,
        `All flights to Trivandrum`,
        `All flights to Pune`,
      ],
      allBusiness2: [
        `All international flights to Paris`,
        `All international flights to Sydney`,
        `All international flights to New York`,
        `All international flights to Rome`,
        `All international flights to Toronto`,
        `All international flights to Montreal`,
        `All international flights to Vancouver`,
        `All international flights to Auckland`,
        `All international flights to Los Angeles`,
        `All international flights to London`,
      ],
    },
  };

  getLinks(".popularLastMinute1", data.popularLastMinute.popularLastMinute1);
  getLinks(".popularLastMinute2", data.popularLastMinute.popularLastMinute2);
  getLinks(".allLastMinute1", data.allLastMinute.allLastMinute1);
  getLinks(".allLastMinute2", data.allLastMinute.allLastMinute2);
  getLinks(".popularBusiness1", data.popularBusiness.popularBusiness1);
  getLinks(".popularBusiness2", data.popularBusiness.popularBusiness2);
  getLinks(".allBusiness1", data.allBusiness.allBusiness1);
  getLinks(".allBusiness2", data.allBusiness.allBusiness2);
}

function getLinks(classBox, data) {
  let content = "";
  data.map((el) => {
    content += `<li class="liLinks"><a class="links" href="#">${el}</a></li>`;
  });
  $(classBox).append(content);
}

function setTestimonials() {
  let data = [
    {
      a: "New Delhi - Toronto flight",
      b: `"My Mom reached safely ..I really appreciate for taking care of everything.Initially I was much hesitant to re book from trip beam because of earlier incidents, but now I would definitely do it again not only me I would recommend my friends also."`,
      c: "assets/images/customer/avatar01.png",
      d: "Payal Agarwal",
    },
    {
      a: "Sydney - New Delhi flight",
      b: `This is my second time I am booking with Tripbeam. My first trip was completely hassle free and I expect the same this time. As far booking goes Garima Jain was outstanding; very patient and was paying full attention to what our requirements were."`,
      c: "assets/images/customer/avatar02.png",
      d: "Ishaan Khatri",
    },
    {
      a: "New Delhi - Hyderabad fight",
      b: `Very patient and excellent customer service by Pawan. Worked with couple of other travel agents, but got the lowest fare only with Tripbeam. Was provided with different routes of flight connectivity and fare options to select the best... Really appreciate TripBeam's customer service.`,
      c: "assets/images/customer/avatar03.png",
      d: "Inaya Ahuja",
    },
    {
      a: "Amritsar - London fight",
      b: `"Awesome Support!!!I am saving his email for future reservations and highly recommend using his services. I asked him to hold my booking for a day, the next day asked him to completely change my tickets and he did not even miss a beat and got what I wanted. Thank You.`,
      c: "assets/images/customer/avatar03.png",
      d: "Kanan Anand",
    },
    {
      a: "Mumbai - New York fight",
      b: `Customer service is very good of this company and they are very friendly and reasonable in answering all sorts of questions. Highly efficient in providing customer needs. Good job guys."`,
      c: "assets/images/customer/avatar03.png",
      d: "Amar Laghari",
    },
    {
      a: "London - New Delhi fight",
      b: `I worked with Rahul Arora to book my tickets to India from USA. She did great job finding me itinerary which best suited for my custom needs :) . i dont know whether i have ever received such custom itinerary for my travel, so thank you for your help Rahul.`,
      c: "assets/images/customer/avatar03.png",
      d: "Dhruv Patel",
    },
  ];
  data = data.sort(() => 0.5 - Math.random()).slice(0, 3);

  let content = "";
  data.map((el) => {
    content += `<div class="col-12 col-lg-4 position-relative">
        <div class="client-con p-5 mt-5 mt-lg-0 theme-box-shadow">
            <h4 class="mb-3 fs-6 theme-text-primary">${el.a}</h4>
            <p class="mb-0 theme-text-accent-two lh-lg small">${el.b}</p>
            <div class="d-flex flex-column justify-content-center mt-3 pt-3 border-top">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 ms-3">
                        <span class="mt-2 theme-text-accent-one">${el.d}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  });
  $(".testimonials-section").append(content);
}

function setDate() {
  document.getElementById(
    "copyright-year"
  ).innerHTML = `${new Date().getFullYear()} FairoCheap All rights reserved.`;
}

function scrollButton() {
  var ScrollTop = $(".scrollToTop");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() < 500) {
      ScrollTop.removeClass("active");
    } else {
      ScrollTop.addClass("active");
    }
  });
  $(".scrollToTop").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
}

function sendMail(
  emailOrPhone,
  depFrom,
  arrTo,
  depArrDate,
  adultNum,
  childNum,
  infantNum,
  stopType,
  flexType,
  classType,
  oneWayRound
) {
  var data = {
    service_id: "service_anfkdec",
    template_id: "template_px4i2lf",
    user_id: "m9YvzMj0HDLG1qHK_",
    template_params: {
      emailOrPhone,
      depFrom,
      arrTo,
      depArrDate,
      adultNum,
      childNum,
      infantNum,
      stopType,
      flexType,
      classType,
      oneWayRound,
    },
  };
  console.log(data);

  $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
  })
    .done(function () {
      swal(
        "Thanks - Request sent",
        "Our customer service will reply to you as soon as possible",
        "success",
        {
          button: "Ok",
        }
      ).then((result) => {
        let elements = document.getElementsByTagName("input");
        for (let ii = 0; ii < elements.length; ii++) {
          if (elements[ii].type == "text") {
            elements[ii].value = "";
          }
        }
      });
    })
    .fail(function (error) {
      swal(
        "Oops...",
        "There was a problem with our services. Retry later.",
        "error",
        {
          button: "Close",
        }
      );
    });
}

function defaultFunc() {
  let data = [
    { a: "Things to do on trip", b: "Learn More", c: "product01" },
    { a: "Enjoy Summer Deals", b: "View Deal", c: "product02" },
  ];
  let content = "";
  data.map((el) => {
    content += `
        <div class="col-12 col-md-6 mb-3 mb-md-0 overflow-hidden hoverShine">
        </div>`;
  });
  $(".offers-section").append(content);
}

function promptAskMailPhone() {
  swal(
    "Your Email or Phone number",
    "Please insert a contact so we can reach out to you",
    "warning",
    { content: "input" }
  ).then((result) => {
    if (isEmail(result) || isPhone(result)) {
      swal({
        title: "Please wait...",
        text: "while sending your request to our customer service",
        icon: "warning",
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: false,
      });
    } else {
      swal({
        title: "Phone/Email not valid",
        text: "Please insert a valid contact method",
        icon: "warning",
        closeOnEsc: true,
        closeOnClickOutside: true,
      });
    }
  });
}
