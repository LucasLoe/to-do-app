var rootVar = document.querySelector(':root');
var mode = "lightMode";
var listCounter = 0;
var numOfEntries = document.getElementsByClassName('input-field').length;
var numOfChecked = document.querySelectorAll('input[type="checkbox"]:checked')

var very_light_gray = "hsl(0, 0%, 98%)";
var very_light_gray_blue = "hsl(236, 33%, 92%)";
var light_grayish_blue = "hsl(233, 11%, 84%)";
var dark_grayish_blue = "hsl(236, 9%, 61%)";
var very_dark_grayish_blue = "hsl(235, 19%, 35%)";

var very_dark_blue = "hsl(235, 21%, 11%)";
var very_dark_desaturated_blue = "hsl(235, 24%, 19%)";
var light_grayish_blue = "hsl(234, 39%, 85%)";
var light_grayish_blue_hover = "hsl(236, 33%, 92%)";
var dark_grayish_blue = "hsl(234, 11%, 52%)";
var very_dark_grayish_blue = "hsl(237, 14%, 26%)";

function toggleMode(){

    if (mode == "lightMode") {
        mode = "darkMode";

        rootVar.style.setProperty('--light-1', very_dark_blue)
        rootVar.style.setProperty('--light-2', very_dark_desaturated_blue)
        rootVar.style.setProperty('--medium', light_grayish_blue)
        rootVar.style.setProperty('--medium-hover', light_grayish_blue_hover)
        rootVar.style.setProperty('--dark-1', dark_grayish_blue)
        rootVar.style.setProperty('--dark-2', light_grayish_blue)
        rootVar.style.setProperty('--container-color', very_dark_desaturated_blue)


    }

    else if (mode == "darkMode") {
        mode = "lightMode";

        rootVar.style.setProperty('--light-1', very_light_gray)
        rootVar.style.setProperty('--light-2', very_light_gray_blue)
        rootVar.style.setProperty('--medium', light_grayish_blue)
        rootVar.style.setProperty('--medium-hover', light_grayish_blue)
        rootVar.style.setProperty('--dark-1', dark_grayish_blue)
        rootVar.style.setProperty('--dark-2', very_dark_grayish_blue)
        rootVar.style.setProperty('--container-color', "white")

    }
}

function addListItem(){

    let textAreaTag = document.getElementById('new-input-textarea');
    let textVal = textAreaTag.value;

    if (!textVal) {
        textAreaTag.setAttribute('placeholder', 'can\'t be empty')
    }
    else if (textVal){
        createNewListItem(textVal)
        textAreaTag.value = "";
        textAreaTag.setAttribute('placeholder', 'new item...')
        listCounter += 1;
        countActiveQuests()
    }
}

function convertTextToId(t) {
    return t.split(' ').join('_').toLowerCase()
}

function countActiveQuests(){
    let elem = document.getElementById('counter')
    let elemSuffix = document.getElementById('counter-suffix');

    numOfEntries = document.getElementsByClassName('input-field').length;
    numOfChecked = document.querySelectorAll('input[type="checkbox"]:checked').length

    elem.innerText = numOfEntries - numOfChecked;

    if (numOfEntries - numOfChecked == 1){
        elemSuffix.innerText = " item left"
    }
    else {
        elemSuffix.innerText = " items left"
    }
}

function checkboxIsChecked(event) {
    countActiveQuests()

    let labelSelector = event.target.nextSibling;
    console.log(labelSelector)
    
    if (event.target.checked == true){
        event.target.parentNode.classList.add('quest-completed')
        event.target.parentNode.classList.remove('quest-active')
        labelSelector.classList.add('completed-style');
    }
    else if (event.target.checked == false){
        event.target.parentNode.classList.add('quest-active')
        event.target.parentNode.classList.remove('quest-completed')
        labelSelector.classList.remove('completed-style');

    }
}

function filterView(event){
    console.log(event.target.id)

    if (event.target.id == 'select-all'){
        console.log(document.getElementsByClassName('quest-completed'))
        console.log(document.getElementsByClassName('quest-active'))

        document.querySelectorAll('.input-field').forEach(e => e.classList.remove('invisible'))

    }
    else if (event.target.id == 'select-active'){
        document.querySelectorAll('.quest-completed').forEach(e => e.classList.add('invisible'))
        document.querySelectorAll('.quest-active').forEach(e => e.classList.remove('invisible'))
        
    }
    else if (event.target.id == 'select-completed'){
        document.querySelectorAll('.quest-active').forEach(e => e.classList.add('invisible'))
        document.querySelectorAll('.quest-completed').forEach(e => e.classList.remove('invisible'))
    }
}

function clearCompletedQuests(){
    document.querySelectorAll('.quest-completed').forEach(e => e.remove())
}

function createNewListItem(str) {
    let divTag = document.createElement('div');
    divTag.classList.add('input-field')
    divTag.classList.add('quest-active')

    let inputTag = document.createElement('input');
        inputTag.setAttribute('type', 'checkbox')
        inputTag.setAttribute('onchange', 'checkboxIsChecked(event)')
        inputTag.classList.add('checkbox-style')

    let labelTag = document.createElement('label');
        labelTag.classList.add('label-style');
        labelTag.innerText = str;

    divTag.appendChild(inputTag);
    divTag.appendChild(labelTag);

    let containerNode = document.getElementById('list-container')
    containerNode.appendChild(divTag);
}
