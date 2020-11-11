function Sim(sldrId) {

  let id = document.getElementById(sldrId);

  this.sldrRoot = document.querySelector('.main-slider')
  this.sldrList = this.sldrRoot.querySelector('.main-slider-list');
  this.sldrElements = this.sldrList.querySelectorAll('.main-slider-item');
  this.sldrElemFirst = this.sldrList.querySelector('.main-slider-item');
  this.indicatorDots = this.sldrRoot.querySelector('div.main-slider-controls');

  this.options = Sim.defaults;
  Sim.initialize(this)
};

Sim.defaults = {
  loop: true,     // Бесконечное зацикливание слайдера
  auto: true,     // Автоматическое пролистывание
  interval: 5000, // Интервал между пролистыванием элементов (мс)
  dots: true      // Индикаторные точки
};

Sim.prototype.elemPrev = function(num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement -= num;
  if(this.currentElement < 0) this.currentElement = this.elemCount-1;

  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';

  if(this.options.dots) {
    this.dotOn(prevElement); this.dotOff(this.currentElement)
  }
};


Sim.prototype.elemNext = function(num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement += num;
  if(this.currentElement >= this.elemCount) this.currentElement = 0;

  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';

  if(this.options.dots) {
    this.dotOn(prevElement); this.dotOff(this.currentElement)
  }
};

Sim.prototype.dotOn = function(num) {
  this.indicatorDotsAll[num].classList.remove('slider-controls-button--active')
};

Sim.prototype.dotOff = function(num) {
  this.indicatorDotsAll[num].classList.add('slider-controls-button--active')
};

Sim.initialize = function(that) {

  that.elemCount = that.sldrElements.length;

  that.currentElement = 0;
  let bgTime = getTime();

  function getTime() {
    return new Date().getTime();
};

  function setAutoScroll() {
    that.autoScroll = setInterval(function() {
      let fnTime = getTime();
      if(fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime; that.elemNext()
    }
  }, that.options.interval)
};

if(that.elemCount <= 1) {
	that.options.auto = false; that.options.dots = false;
};
if(that.elemCount >= 1) {
  that.sldrElemFirst.style.opacity = '1';
};

if(that.options.auto) {
  setAutoScroll();

  that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
  that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
};

if(that.options.dots) {  // инициализация индикаторных точек
  let sum = '', diffNum;
  for(let i=0; i<that.elemCount; i++) {
    sum += `
    <button class="slider-controls-button">
      <svg class="controls-button-svg" id="slider-button" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle class="small-circle" cx="6" cy="6" r="2.5" stroke="black" />
        <circle cx="6" cy="6" r="5.5" stroke="black" />
      </svg>
    </button>
    `
};

that.indicatorDots.innerHTML = sum;
that.indicatorDotsAll = that.sldrRoot.querySelectorAll('button.slider-controls-button');

for(let n=0; n<that.elemCount; n++) {
  that.indicatorDotsAll[n].addEventListener('click', function() {
  diffNum = Math.abs(n - that.currentElement);
    if(n < that.currentElement) {
      bgTime = getTime(); that.elemPrev(diffNum)
    }
    else if(n > that.currentElement) {
        bgTime = getTime(); that.elemNext(diffNum)
    }
  }, false)
  };
  that.dotOff(0);
  for(let i=1; i<that.elemCount; i++) {
    that.dotOn(i)
  }
  }
};

new Sim();
