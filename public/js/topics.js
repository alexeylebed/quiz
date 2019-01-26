
let baseURL = window.location;
let subjectId = getSubjectId(baseURL);
let URLforFetch = window.location.origin + "/getTopicsListId/1";
var regExp = /\w*topicCard\w*/;

function getSubjectId(baseURL){
    let subjectId = baseURL.pathname.split("/")[2];
    return subjectId;
};

//Render Topic cards
function createCard(data){
    let card = document.createElement('div');
    let cardParent = document.getElementById('cardsParent');
    card.setAttribute('class' , 'topicCard cardElement'); 
    card.setAttribute('id' , "topicCard" + data.id)
    cardParent.append(card);
    card.innerHTML = 
    "<div class = 'topicCardLogo' id = 'topicCardLogo" + data.id + "'>" + "</div>" +  
    "<div class = 'cardText' id = 'topicCardText" + data.id + "'>" + 
        "<div class = 'cardHeader' id = 'topicCardHeader" + data.id + "'>" +  
            data.topic + 
        "</div>" + 
        "<div class = 'topicId' id = 'topicCardId" + data.id + "'>" + 
            "Topic ID: " + data.id + 
        "</div>" + 
    "</div>";
};

//Get the page name(the name of the selected Subject)
let subjectidJSON = window.location.origin  + "/getSubjectIdJSON/"
fetch( subjectidJSON +  subjectId)
.then((result) => result.text()).then(text =>{
    let data = JSON.parse(text)
    let subject = document.getElementById('currentTopic');
    subject.innerHTML = data[0].subject;
}).catch(err =>{
    console.log(err);
});

//Get Topic cards JSON
let topicsListId = window.location.origin + "/getTopicsListId/"
fetch(topicsListId +  subjectId)
.then((result) => result.text()).then(text =>{
    let data = JSON.parse(text)
    console.log(data);
    data.forEach(item =>{
        createCard(item);
    });
  }).catch(err =>{
    console.log(err);
});

  function checkEvent(data){
    console.log(data)
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
      let topicId = checkEvent(event.target.id);
      console.log(topicId)
      document.location.href = baseURL + "/topic/" +  topicId;
    });
  };


  

  

