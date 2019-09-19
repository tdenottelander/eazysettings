//---------------------- SETTINGS --------------------------

class Settings {

    constructor(defaultOn){
        this.on = defaultOn;
        this.settingsContainer = this.setupSettingsContainer();
    }

    setupSettingsContainer () {
        let settingsContainer = document.createElement('div');
        settingsContainer.id = "settingsContainer";
        settingsContainer.style.padding = "10px";
        settingsContainer.style.position = "fixed";
        settingsContainer.style.top = "10px";
        settingsContainer.style.left = "10px";
        settingsContainer.style.width = "auto";
        settingsContainer.style.overflowY = "hidden";
        settingsContainer.style.transition = "maxheight .2s ease";
        settingsContainer.style.webkitTransition = "max-height .2s";
        settingsContainer.style.maxHeight = this.on ? "1rem" : "30rem";
        settingsContainer.setAttribute("max-height", this.on ? "1rem" : "30rem");
        document.body.append(settingsContainer)

        let span = document.createElement("span");
        span.style.color = "white";
        settingsContainer.append(span);

        let dropdown = document.createElement("a");
        dropdown.className = "fas fa-angle-up";
        dropdown.id = "settingsButton";
        dropdown.style.cursor = "pointer";
        dropdown.style.marginBottom = "1rem";
        dropdown.style.transform = this.on ? "rotate(180deg)" : "rotate(0deg)";
        dropdown.style.transition = "transform .2s ease";

        dropdown.addEventListener("click", function(e){
            if (this.on){
                    settingsContainer.style.maxHeight = "1rem";
                    settingsButton.style.transform = "rotate(180deg)";
                } else {
                    settingsContainer.style.maxHeight = "30rem";
                    settingsButton.style.transform = "rotate(0deg)";
                }
                this.on = !this.on;
            })
        span.appendChild(dropdown);

        return settingsContainer;
    }

    addSlider(description, id, min, max, begin, step){
        let slider = new Slider(description, id, min, max, begin, step);
        this.settingsContainer.appendChild(slider.groupElement);
        return slider;
    }

    addCheckbox(description, defaultOn, func){
        let checkbox = new Checkbox(description, defaultOn, func)
        this.settingsContainer.appendChild(checkbox.groupElement);
        return checkbox;
    }
}

class Slider {
    constructor (description, min, max, begin, step) {
        this.descriptionElement = document.createElement("div");
        this.descriptionElement.className = "slider_description";
        this.descriptionElement.style.width = "80%";
        this.descriptionElement.innerHTML = description;

        this.sliderValueElement = document.createElement("div");
        this.sliderValueElement.className = "slider_value";
        this.sliderValueElement.innerHTML = begin;
        this.sliderValueElement.style.width = "20%";
        this.sliderValueElement.style.textAlign = "right";

        this.spanElement = document.createElement("span");
        this.spanElement.appendChild(this.descriptionElement);
        this.spanElement.appendChild(this.sliderValueElement);
        this.spanElement.style.display = "flex"

        this.sliderElement = document.createElement("input");
        this.sliderElement.type = "range";
        this.sliderElement.className = "slider";
        this.sliderElement.min = min;
        this.sliderElement.max = max;
        this.sliderElement.value = begin;
        this.sliderElement.step = step;
        this.sliderElement.valueText = this.sliderValueElement;
        this.sliderElement.oninput = function (){
            this.valueText.innerHTML = this.value;
        }

        this.groupElement = document.createElement("div");
        this.groupElement.appendChild(this.spanElement);
        this.groupElement.appendChild(this.sliderElement);
    }

    value() {
        return this.sliderElement.valueAsNumber;
    }

    setOnChange(func) {
        this.sliderElement.oninput = function (){
            this.valueText.innerHTML = this.value;
            func();
        }
    }

    setId(id){
        this.sliderElement.id = id;
    }
}

class Checkbox{
    constructor(description, defaultOn, func){
        // <input type="checkbox" id="respawncheck" checked>
        //         Instant respawn
        this.groupElement = document.createElement("div");

        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.checked = defaultOn;
        this.checkbox.onchange = func;

        this.description = document.createElement("p");
        this.description.innerHTML = description;

        this.groupElement.appendChild(this.checkbox);
        this.groupElement.append(description);
    }

    value() {
        return this.checkbox.checked;
    }
}