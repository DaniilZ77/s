(function() {
	// HEADER
	let header = document.querySelector(".header");
	let header_navbar = document.querySelector(".navigation-body-navbar-content");
	let navigation_body_navbar = document.querySelector(".navigation-body-navbar");
	let navbar_item = document.querySelectorAll(".navbar-content-item_catalog");
	let sub_menu = document.querySelectorAll(".sub-navbars");
	let body = document.querySelector("body");
	let toggle_search=document.querySelector(".toggle-search");
	let search_form=document.querySelector(".search-form");
	// MAIN BLOCK TOGGLE PHOTOES, SCALE PHOTOES, PHONE BACK
	let popup = document.querySelector(".popup-scale_photo");
	let popup_body = document.querySelector(".popup-scale_photo-body");
	let equipment_scale = document.querySelectorAll(".equipment-scale-sub_item");
	let scale_imgs = document.querySelectorAll(".equipment-scale-sub_item img");
	let scale_imgs_href = document.querySelectorAll(".sub-item-href-scale");
	let scale_imgs_href_img=document.querySelectorAll(".sub-item-href-scale_img");
	let curIndex;
	let phone_back=document.querySelector(".navigation-body-navbar_phone_back");
	let phone_form=document.querySelector(".back-phone-form-container");
	let phone_form_body=document.querySelector(".back-phone-form");
	let scale_item_caption=document.querySelectorAll(".equipment-scale-navbar_item_caption");
	let main_ul_scale=document.querySelectorAll(".equipment-scale-sub");
	// ======================================================
	// SUB MENU HEIGHT AND RECT SETTINGS
	toggle_search.addEventListener("click", ()=>{
		search_form.classList.toggle("active");
		navigation_body_navbar.classList.toggle("none");
	});
	for (let item of navbar_item) {
		let rect = document.createElement("div");
		rect.classList = "sub-rect";
		item.append(rect);
	}
	let rects = document.querySelectorAll(".sub-rect");
	for (let rect of rects) {
		rect.style.top = header_navbar.clientHeight + 15 + "px";
	}
	for (let menu of sub_menu) {
		menu.style.top = header_navbar.clientHeight + 30 + "px";
	}
	// MENU CLICK
	for (let i = 0; i < navbar_item.length; i++) {
		navbar_item[i].addEventListener("click", function(e) {
			e.preventDefault();
			if (e.target === sub_menu[i] || sub_menu[i].contains(e.target)) {
				return;
			}
			if (sub_menu[i].classList.contains("active") && rects[i].classList.contains("active")) {
				sub_menu[i].classList.remove("active");
				rects[i].classList.remove("active");
				return;
			}
			sub_menu.forEach((el) => {
				el.classList.remove("active");
			});
			rects.forEach((el) => {
				el.classList.remove("active");
			});
			rects[i].classList.add("active");
			sub_menu[i].classList.add("active");
		});
	}
	// =============
	// =============
	// =============

	// MAIN BLOCK TOGGLE PHOTOES, SCALE PHOTOES, PHONE BACK
	for (let item=0; item < scale_item_caption.length; item++) {
		scale_item_caption[item].classList.add("close");
		main_ul_scale[item].classList.add("close");
		scale_item_caption[item].addEventListener("click", ()=>{
			main_ul_scale[item].classList.toggle("close");
			scale_item_caption[item].classList.toggle("close");
		});
	}
	function scalePhoto(e) {
		let zoom = e.currentTarget;
		e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
		e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX;
		let x = offsetX / zoom.offsetWidth * 100
		let y = offsetY / zoom.offsetHeight * 100
		zoom.style.backgroundPosition = x + '% ' + y + '%';
	}
	function setImg() {
		this.style.background="url("+scale_imgs[curIndex].src+")";
	}
	function clearImg(argument) {
		this.style.background="";
	}
	let scale_photo_bool=false;
	for (let eq = 0; eq < equipment_scale.length; eq++) {
		equipment_scale[eq].addEventListener("click", () => {
			window.scroll({
				left: 0,
				top: 0,
			});
			scale_photo_bool=true;
			curIndex = eq;
			equipment_scale[eq].classList.add("active");
			popup.classList.add("active");
			popup_body.append(scale_imgs_href[eq]);
			body.classList.add("lock");
			scale_imgs_href_img[eq].addEventListener("mouseout", clearImg);
			scale_imgs_href_img[eq].addEventListener("mousemove", scalePhoto);
			scale_imgs_href_img[eq].addEventListener("mouseover", setImg);
		});
	}
	let back_phone_bool=false;
	function PHONE() {
		window.scroll({
			left: 0,
			top: 0,
		});
		popup.classList.add("active");
		popup_body.append(phone_form);
		back_phone_bool=true;
		body.classList.add("lock");
	}
	phone_back.addEventListener("click", PHONE);
	popup.addEventListener("click", (e) => {
		if ((!popup_body.contains(e.target)) && scale_photo_bool) {
			popup.classList.remove("active");
			body.classList.remove("lock");
			equipment_scale[curIndex].append(scale_imgs_href[curIndex]);
			popup_body.removeEventListener("mousemove", scalePhoto);
			popup_body.removeEventListener("mouseover", setImg);
			popup_body.removeEventListener("mouseout", clearImg);
			scale_photo_bool=false;
		}
		if ((!popup_body.contains(e.target)) && back_phone_bool) {
			phone_back.append(phone_form);
			back_phone_bool=false;
			popup.classList.remove("active");
			body.classList.remove("lock");
		}
	});
	// ========================================
	// BODY
	body.addEventListener("click", function(e) {
		for (let i = 0; i < navbar_item.length; i++) {
			if (header.contains(e.target) || sub_menu[i].contains(e.target)) {
				return;
			}
			rects[i].classList.remove("active");
			sub_menu[i].classList.remove("active");
		}
	});
	window.addEventListener("resize", function(e) {
		// SUB MENU AND RECT
		for (let menu of sub_menu) {
			menu.style.top = header_navbar.clientHeight + 30 + "px";
		}
		for (let rect of rects) {
			rect.style.top = header_navbar.clientHeight + 15 + "px";
		}
		// =======
	});
	// ====
	EventTarget.prototype.slider = function(params = {
		slidesToShow: 1,
		controlButtons: true,
		transition: 0.5,
	}) {
		variablesAuto(params);
		parentElements(this);
		sliderClones(this, params);
		variables(this, params);
		sliderClones(this, params);
		firstSettings(this, params);
		childSettings(this, params);
		sliderSettings(this);
		controlButtons(this, params);
		currentSlide(this, params);
		dots(this, params);
		resizeSettings(this, params);
		dragSlider(this, params);
		outHrefsDragAndDrop();
	}

	function variablesAuto(params) {
		if (!params.transition) params.transition = 0.5;
		if (!params.slidesToShow) params.slidesToShow = 1;
	}

	function variables(slider, params) {
		slider.step = -params.slidesToShow;
		slider.childrenLength = slider.children.length;
		slider.removeEventListener("transitionstart", slider.scrollFalse);
		slider.removeEventListener("mousedown", slider.dragStart);
		slider.removeEventListener("mouseup", slider.dragEnd);
		slider.removeEventListener("touchstart", slider.dragStart);
		slider.removeEventListener("touchend", slider.dragEnd);
		window.removeEventListener("resize", slider.resize);
		if (slider.prevButton && slider.nextButton) {
			slider.nextButton.removeEventListener("click", slider.nextClick);
			slider.prevButton.removeEventListener("click", slider.prevClick);
		}
		slider.startChecker = true;
		slider.scrollFalse = function() {
			slider.startChecker = false;
		}
	}

	function parentElements(slider) {
		if (document.querySelector(".slider-container") && document.querySelector(".slider-list")) return;
		let slider_container = document.createElement("div");
		slider_container.classList = "slider-container";
		let slider_list = document.createElement("div");
		slider_list.classList = "slider-list";
		slider.parentElement.prepend(slider_container, slider_list);
		slider_container.append(slider_list);
		slider_list.append(slider);
	}

	function childSettings(slider, params) {
		for (let slider_child of slider.children) {
			slider_child.style.flex = "0 " + "0 " + slider.parentElement.clientWidth / params.slidesToShow + "px";
			slider_child.classList.add("slider-child");
		}
	}

	function sliderSettings(slider) {
		slider.classList.add("drag-slider-list");
		slider.style.width = slider.children[0].clientWidth * slider.childrenLength + "px";
	}

	function controlButtons(slider, params) {
		if (document.querySelector(".slider-prev-button") && document.querySelector(".slider-next-button")) {
			slider.parentElement.parentElement.removeChild(slider.nextButton);
			slider.parentElement.parentElement.removeChild(slider.prevButton);
		}
		if (!params.controlButtons) return;
		slider.prevButton = document.createElement("div");
		slider.prevButton.classList = "slider-prev-button";
		slider.nextButton = document.createElement("div");
		slider.nextButton.classList = "slider-next-button";
		slider.parentElement.parentElement.prepend(slider.prevButton, slider.nextButton);
	}

	function dots(slider, params) {
		slider.slider_dots = document.createElement("div");
		slider.slider_dots.classList = "slider-dots-container";
		slider.parentElement.parentElement.prepend(slider.slider_dots);
		for (let dot = 0; dot < slider.children.length - params.slidesToShow * 2; dot++) {
			let dot_ = document.createElement("div");
			dot_.classList = "slider-dot";
			slider.slider_dots.append(dot_);
		}
		slider.slider_dots.children[0].classList.add("active");
		slider.currentDot = 0;
	}

	function currentDot(slider, params) {
		if (slider.currentDot < 0) {
			slider.currentDot = slider.children.length - params.slidesToShow * 2 - 1;
		} else if (slider.currentDot > slider.children.length - params.slidesToShow * 2 - 1) {
			slider.currentDot = 0;
		}
		for (let dot of slider.slider_dots.children) {
			dot.classList.remove("active");
		}
		slider.slider_dots.children[slider.currentDot].classList.add("active");
	}

	function currentSlide(slider, params) {
		slider.nextClick = () => {
			if (!slider.startChecker) return;
			transition(slider, params.transition);
			slider.step--;
			slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
			slider.startChecker = false;
			infinitySlider(slider, params);
			slider.currentDot++;
			currentDot(slider, params);
			clearTimeout(slider.time);
		}
		slider.prevClick = () => {
			if (!slider.startChecker) return;
			transition(slider, params.transition);
			slider.step++;
			slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
			slider.startChecker = false;
			infinitySlider(slider, params);
			slider.currentDot--;
			currentDot(slider, params);
			clearTimeout(slider.time);
		}
		slider.time = setTimeout(() => {
			slider.nextClick();
		}, 4000);
		if (!params.controlButtons) return;
		slider.nextButton.addEventListener("click", slider.nextClick);
		slider.prevButton.addEventListener("click", slider.prevClick);
	}

	function sliderClones(slider, params) {
		if (document.querySelectorAll(".slider-child-clone")) {
			for (let clone of document.querySelectorAll(".slider-child-clone")) {
				slider.removeChild(clone);
			}
		}
		let start = [];
		let end = [];
		for (let slide_to_clone = 0; slide_to_clone < params.slidesToShow; slide_to_clone++) {
			let slider_child_Clone = slider.children[slide_to_clone].cloneNode(true);
			slider_child_Clone.classList.add("slider-child-clone");
			start.push(slider_child_Clone);
		}
		for (let slide_to_clone = slider.children.length - 1; slide_to_clone > slider.children.length - params.slidesToShow - 1; slide_to_clone--) {
			let slider_child_Clone = slider.children[slide_to_clone].cloneNode(true);
			slider_child_Clone.classList.add("slider-child-clone");
			end.unshift(slider_child_Clone);
		}
		slider.append(...start);
		slider.prepend(...end);
	}

	function firstSettings(slider, params) {
		transition(slider, 0);
		slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
	}

	function infinitySlider(slider, params) {
		let timer = setTimeout(function() {
			if (-slider.step == slider.childrenLength - params.slidesToShow) {
				transition(slider, 0);
				slider.step = -params.slidesToShow;
				slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
			} else if (slider.step == 0) {
				transition(slider, 0);
				slider.step = -slider.childrenLength + params.slidesToShow * 2;
				slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
			}
			slider.startChecker = true;
			slider.time = setTimeout(() => {
				slider.nextClick();
			}, 4000);
		}, params.transition * 1000);
	}

	function transition(slider, number) {
		slider.style.transition = number + "s";
	}

	function resizeSettings(slider, params) {
		slider.resize = () => {
			transition(slider, 0);
			for (let slider_child of slider.children) {
				slider_child.style.flex = "0 " + "0 " + slider.parentElement.clientWidth / params.slidesToShow + "px";
			}
			slider.style.width = slider.children[0].clientWidth * slider.childrenLength + "px";
			slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
		};
		window.addEventListener("resize", slider.resize);
	}

	function dragSlider(slider, params) {
		let touchstart = 0;
		let touchend = 0;
		let wasStarted = false;
		if (document.querySelectorAll(".slider-child a")) {
			slider.sliderChildren=document.querySelectorAll(".slider-child a");
		}
		let isTrue=true;
		slider.preventDrag=function(event) {
			event.preventDefault();
		}

		slider.dragStart = function() {
			if (!slider.startChecker) return;
			if (slider.sliderChildren) {
				slider.sliderChildren.forEach((el)=>{
					el.removeEventListener("click", slider.preventDrag);
				});
			}
			isTrue=true;
			wasStarted = true;
			touchstart = event.clientX || event.changedTouches[0].clientX;
			slider.style.cursor = "grab";
			slider.addEventListener("mousemove", dragOn);
			slider.addEventListener("touchmove", dragOn);
			clearTimeout(slider.time);
		}

		function dragOn() {
			if (!slider.startChecker) return;
			if (slider.sliderChildren && isTrue) {
				slider.sliderChildren.forEach((el)=>{
					el.addEventListener("click", slider.preventDrag);
				});
			}
			isTrue=false;
			slider.addEventListener("mouseout", slider.dragEnd);
			transition(slider, 0);
			touchend = event.clientX || event.changedTouches[0].clientX;
			slider.style.transform = `translate3d(${slider.parentElement.clientWidth / params.slidesToShow * slider.step - touchstart + touchend}px, 0, 0)`;
		}

		slider.dragEnd = function(event) {
			if (!slider.startChecker || !wasStarted) return;
			touchend = event.clientX || event.changedTouches[0].clientX;
			slider.style.cursor = "pointer";
			slider.removeEventListener("mousemove", dragOn);
			slider.removeEventListener("mouseout", slider.dragEnd);
			if (touchstart > touchend + slider.children[0].clientWidth / 4) {
				transition(slider, params.transition);
				slider.step--;
				slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
				slider.startChecker = false;
				infinitySlider(slider, params);
				slider.currentDot++;
				currentDot(slider, params)
			} else if (touchstart + slider.children[0].clientWidth / 4 < touchend) {
				transition(slider, params.transition);
				slider.step++;
				slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
				slider.startChecker = false;
				infinitySlider(slider, params);
				slider.currentDot--;
				currentDot(slider, params)
			} else {
				transition(slider, params.transition);
				slider.style.transform = "translate3d(" + (slider.parentElement.clientWidth / params.slidesToShow * slider.step) + "px," + " 0," + " 0)";
			}
			wasStarted = false;
		}
		slider.addEventListener("mousedown", slider.dragStart);
		slider.addEventListener("mouseup", slider.dragEnd);
		slider.addEventListener("touchstart", slider.dragStart);
		slider.addEventListener("touchend", slider.dragEnd);
	}

	function outHrefsDragAndDrop() {
		if (slider.sliderChildren) {
			slider.sliderChildren.forEach((el)=>{
				el.addEventListener("dragstart", slider.preventDrag);
			});
		}
	}

	let slider = document.querySelector(".main-slider-body");
	slider.slider({
		slidesToShow: 1,
		controlButtons: false,
		transition: 0.8,
	});
})();