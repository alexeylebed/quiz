var baseURL = window.location.href;
var getSubjectsListJSON = baseURL + "getSubjectsListJSON";
var getTopicsListIdJSON = baseURL + "getTopicsListId";
var regExp = /\w*subjectCard\w*/;
var config = [
  "math.png",
  "english.png",
  "biology.png",
  "geography.png",
  "physics.png",
  "history.png",
  "computer.png",
  "literature.png",
  "chemistry.png"
];


fetch(getSubjectsListJSON, {
  method: "GET"
}).then((result) => result.text()).then(text =>{
  getSubtopics(text)
}).catch(err =>{
  console.log(err);
})


function getSubtopics(json){
  let arr = JSON.parse(json)
  arr.forEach((subject =>{
    fetch(getTopicsListIdJSON + "/" +  subject.id)
    .then( result =>{
      return result.text()
    }).then(text =>{
      let subtopics = JSON.parse(text);
      subtopics.unshift(subject)
      //console.log(subtopics)
      render(subtopics)
    })
  }))
}

function createCard(data){
  let card = document.createElement('div');
  let cardParent = document.getElementById('cardsParent');
  card.setAttribute('class' , 'subjectCard cardElement'); 
  card.setAttribute('id' , "subjectCard" + data[0].id)
  cardParent.append(card);
  //console.log(data.length)
  card.innerHTML = 
  "<div class = 'cardText' id = 'subjectCardText" + data[0].id + "'>" + 
    "<div class = 'cardHeader' id = 'subjectCardHeader" + data[0].id + "'>" +  
      data[0].subject + 
    "</div>" + 
    "<div class = 'cardTopics' id = 'subjectCardTopics" + data[0].id + "'>" + 
      "Topics avaliable: " + (data.length - 1) + 
    "</div>" + 
  "</div>";
}

function getSubjectIcon(data){
  let id = data[0].id - 1
  let logoURL = baseURL +  "public/images/" +  config[id];
  let logo = document.createElement('img');
  let logoParent = document.getElementById("subjectCard" + data[0].id)
  logo.setAttribute('src' ,  logoURL);
  logo.setAttribute('class' , 'cardLogo cardElement')
  logo.setAttribute('id' , "subjectCardIcon" + data[0].id)
  logoParent.prepend(logo)
}


function render(data){
  createCard(data);
  getSubjectIcon(data);
}

function checkEvent(data){
  let match = data.match(regExp)
  if(match == null){
    return false;
  } else {
    return match[0].match(/\d+/)[0];
  };
;}


window.onload = function(){
  var parent = document.getElementById('cardsParent')
  parent.addEventListener('click' , (event) =>{
    let subjectId = checkEvent(event.target.id);
    console.log(subjectId)
    document.location.href = baseURL + "subject/" +  subjectId;
  });
};

