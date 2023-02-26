// INJECT CSS to HTML sample
// var css = document.createElement('style');
// css.type = 'text/css';
// css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
// document.body.appendChild(css);

window.onload = function () {
  initializeContents();
};

function initializeContents() {
  initializeJumbotron.call();
  initializeAboutSection();
}

function initializeJumbotron() {
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
}

function initializeAboutSection() {
  displayTechStackIcons();
}

function displayTechStackIcons() {
  var dir = '/resources/images/tech-stack/';
  var fileextension = '.png';
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
      //List all .png file names in the page
      $(data)
        .find('a:contains(' + fileextension + ')')
        .each(function () {
          var filename = this.href
            .replace(window.location.host, '')
            .replace(`https://${dir}`, '')
            .replace(`http://${dir}`, '');
          var logoName = filename
            .replace('logo-', '')
            .replace('.png', '')
            .replace('_', ' ');
          // logoName = logoName.charAt(0).toUpperCase() + logoName.slice(1);
          console.log(filename);
          $('.tech-stack-container').append(`
          <div class="flip-card">
            <div class="card-container">
              <div class="card">
                  <div class="front">
                    <img class="front-img" src="${dir}/${filename}">
                  </div>
                  <div class="back">
                    <p>${logoName}</p>
                  </div>
              </div>
            </div>
          </div>
          `);
        });
    },
  });
}

window.onscroll = function () {
  var myNav = document.getElementById('navigation-bar');
  var navLinks = document.getElementsByClassName('nav-link');
  var navItems = document.querySelectorAll('.nav-item');
  if (
    document.body.scrollTop >= 200 ||
    document.documentElement.scrollTop >= 200
  ) {
    myNav.classList.add('nav-colored');
    myNav.classList.remove('nav-transparent');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.add('text-light');
    }
  } else {
    myNav.classList.add('nav-transparent');
    myNav.classList.remove('nav-colored');

    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove('text-light');
    }
  }
};

var previousViewId = 'overview';
var aboutContent = document.getElementById('about-content-view');
var template = document.getElementById(previousViewId);
var previousBtnClick = document.getElementsByClassName('about-btn')[0];
var loadingScreen = document.getElementById('loading-screen').innerHTML;
aboutContent.innerHTML = template.innerHTML;
previousBtnClick.classList.add('btn-dark');
function changeAboutSectionContent(viewId, elem) {
  template = document.getElementById(viewId);
  $('#about-content-view').html(loadingScreen);
  setTimeout(() => {
    if (previousViewId !== viewId && previousBtnClick) {
      previousBtnClick.classList.remove('btn-dark');
      elem.classList.add('btn-dark');
      $('#about-content-view').html(template.innerHTML);
    }
    previousViewId = viewId;
    previousBtnClick = elem;
  }, 1000);
}
