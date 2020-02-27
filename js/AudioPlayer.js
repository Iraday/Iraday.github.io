

/* 	function gotocurrentPlaying(index){
		plLi[index].scrollIntoView();
	} */

	  function buildIndexProb(scoreList){
		  let ListLength=scoreList.length;
		  let TotalScore=scoreList.reduce((a,b) => a + b, 0);
		  // console.log(TotalScore);
		  let starterProb=1/(ListLength);
		  // console.log(starterProb);
		  let IndexProbDic={};
		  for(let i = 0, len = ListLength; len > i; i++) {
			IndexProbDic[i]=(1/TotalScore)*scoreList[i];
		  }	  
		  // console.log(IndexProbDic);
		  return IndexProbDic
	  }

		let RandomStatus = true;
		const RandomDisplay=document.getElementById('random play');
		const RandomDisplayText=document.getElementById('random play text');

		const RandomDisplay1=document.getElementById('random play1');
		const RandomDisplayText1=document.getElementById('random play text1');
		
		const RepeatButton = document.getElementById('')
		
		function flipRandomStatus(){
			RandomStatus=!RandomStatus;
			console.log(RandomStatus);
			if (!RandomStatus){
				RandomDisplay.classList.remove("container1");
				RandomDisplay.classList.add("container2");
				RandomDisplayText.innerHTML="Random now off";
				RandomDisplay1.classList.remove("container1");
				RandomDisplay1.classList.add("container2");
				RandomDisplayText1.innerHTML="Random now off";
			}
			else {
				RandomDisplay.classList.remove("container2");
				RandomDisplay.classList.add("container1");
				RandomDisplayText.innerHTML="Random now on";
				RandomDisplay1.classList.remove("container2");
				RandomDisplay1.classList.add("container1");
				RandomDisplayText1.innerHTML="Random now on";
			}
		}

		let RepeatStatus = false;
		const RepeatDisplay=document.getElementById('repeatsong');
		const RepeatDisplayText=document.getElementById('repeatsong text');

/* 		const RepeatDisplay1=document.getElementById('repeatsong1');
		const RepeatDisplayText1=document.getElementById('repeatsong text1'); */
		
		function flipRepeatStatus(){
			RepeatStatus=!RepeatStatus;
			console.log(RepeatStatus);
			if (RepeatStatus){
				RepeatDisplay.classList.remove("container5");
				RepeatDisplay.classList.add("container6");
				RepeatDisplayText.innerHTML="Repeat On";
/* 				RepeatDisplay1.classList.remove("container5");
				RepeatDisplay1.classList.add("container6");
				RepeatDisplayText1.innerHTML="Repeat On"; */
			}
			else {
				RepeatDisplay.classList.remove("container6");
				RepeatDisplay.classList.add("container5");
				RepeatDisplayText.innerHTML="Repeat Off";
/* 				RepeatDisplay1.classList.remove("container6");
				RepeatDisplay1.classList.add("container5");
				RepeatDisplayText1.innerHTML="Repeat Off"; */
			}
		}			  

		let PlayStatus = false;
		const PlayDisplay=document.getElementById('playorpause');
		const PlayDisplayText=document.getElementById('playorpause text');

/* 		const PlayDisplay1=document.getElementById('playorpause1');
		const PlayDisplayText1=document.getElementById('playorpause text1'); */

		function flipPlayStatus(){
			PlayStatus=!PlayStatus;
			console.log(PlayStatus);
			if (PlayStatus){
				PlayDisplay.classList.remove("container5");
				PlayDisplay.classList.add("container6");
				PlayDisplayText.innerHTML="Play On";
				// PlayDisplay1.classList.remove("container5");
				// PlayDisplay1.classList.add("container6");
				// PlayDisplayText1.innerHTML="Play On";
			}
			else {
				PlayDisplay.classList.remove("container6");
				PlayDisplay.classList.add("container5");
				PlayDisplayText.innerHTML="Play Off";
/* 				PlayDisplay1.classList.remove("container6");
				PlayDisplay1.classList.add("container5");
				PlayDisplayText1.innerHTML=" Play Off"; */
			}
		}		
	  
	  
	function weightedRand2(spec) {
	  var i, sum=0, r=Math.random();
	  for (i in spec) {
		sum += spec[i];
		if (r <= sum) return i;
	  }
	}


	function download(content, fileName, contentType) {
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(content);
		var dlAnchorElem = document.getElementById('downloadAnchorElem');
		dlAnchorElem.setAttribute("href",     dataStr     );
		dlAnchorElem.setAttribute("download", "scene.json");
		dlAnchorElem.click();
	}

/* no HTML required */
	  function downloadObjectAsJson(exportObj, exportName){
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href",     dataStr);
		downloadAnchorNode.setAttribute("download", exportName + ".json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	  }

	function exportAsJson(playList){
		localStorage.setItem("playList",JSON.stringify(playList));
		console.log('export step 1 done');
		download(JSON.stringify(playList), './test.txt', 'text/plain');
		console.log('export step 2 done');
	}

	function quickSave(playList){
		localStorage.setItem("playList",JSON.stringify(playList));
	}




//let rand012 = weightedRand2({0:0.8, 1:0.1, 2:0.1});
//console.log({0:0.8, 1:0.1, 2:0.1})
//console.log(rand012); // random in distribution...

;(function(window, undefined) {

'use strict';


var AudioPlayer = (function() {

    var aphtml =
    '  <div class="ap-inner">'+
    '    <div class="ap-panel">'+
    '      <div class="ap-item ap--playback">'+
    '        <button class="ap-controls ap-prev-btn">'+
    '          <i class="material-icons md-dark">skip_previous</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-toggle-btn">'+
    '            <i class="material-icons md-dark ap--play">play_arrow</i>'+
    '            <i class="material-icons md-dark ap--pause">pause</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-next-btn">'+
    '          <i class="material-icons md-dark">skip_next</i>'+
    '        </button>'+
    '      </div>'+
    '      <div class="ap-item ap--track">'+
    '        <div class="ap-info">'+
    '          <div class="ap-title">Unknown</div>'+
    '          <div class="ap-time">'+
    '            <span class="ap-time--current">--</span>'+
    '            <span> / </span>'+
    '            <span class="ap-time--duration">--</span>'+
    '          </div>'+
    ''+
    '          <div class="ap-progress-container">'+
    '            <div class="ap-progress">'+
    '              <div class="ap-bar"></div>'+
    '              <div class="ap-preload-bar"></div>'+
    '            </div>'+
    '          </div>'+
    ''+
    '        </div>'+
    '      </div>'+
    '      <div class="ap-item ap--settings">'+
    '        <div class="ap-controls ap-volume-container">'+
    '          <button class="ap-controls ap-volume-btn">'+
    '              <i class="material-icons md-dark ap--volume-on">volume_up</i>'+
    '              <i class="material-icons md-dark ap--volume-off">volume_mute</i>'+
    '          </button>'+
    '          <div class="ap-volume">'+
    '            <div class="ap-volume-progress"><div class="ap-volume-bar"></div></div>'+
    '          </div>'+
    '        </div>'+
    '        <button class="ap-controls ap-repeat-btn">'+
    '          <i class="material-icons md-dark">repeat</i>'+
    '        </button>'+
    '        <button class="ap-controls ap-playlist-btn">'+
    '          <i class="material-icons md-dark">queue_music</i>'+
    '        </button>'+
    '      </div>'+
    '    </div>'+
    '  </div>';


  // Player vars
  var
  player,
  playBtn,
  prevBtn,
  nextBtn,
  plBtn,
  repeatBtn,
  volumeBtn,
  exportButton,
  exportButton1,
  quickSaveButton,
  quickSaveButton1,
  gotocurrentButton,
  gotocurrentButton1,
  upvoteButton,
  downvoteButton,
  playLastButton,
  playLastButton1,
  playLastButton2,
  goToTopButton,
  filterNumber,
  filterUnpopularSongButton,
  playOnOffButton,
  nextSongButton,
  prevSongButton,
  repeatOnOffButton,
  volbox,
  vol_bar,
  //currentPlaying,
  progressBar,
  preloadBar,
  curTime,
  durTime,
  trackTitle,
  audio,
  index = 0,
  playList,
  scoreList,
  lastSongIndex = 0,
  volumeBar,
  volumeLength,
  repeating = false,
  seeking = false,
  rightClick = false,
  apActive = false,
  // playlist vars
  pl,
  plLi,
  // settings
  settings = {
    container: 'body',
    volume   : 0.1, /*default sound level 10%*/
    autoPlay : false,
    notification: false,
    playList : [],
  };
	

  function init(options) {

    if(!('classList' in document.documentElement)) {
      return false;
    }

    player = create('div', {
      'className': 'ap',
      'id': 'ap',
      'innerHTML': aphtml
    });

    if(apActive || player === null) {
      return;
    }

    settings = extend(settings, options);

    document.querySelector(settings.container).insertBefore(player, null);

    // get player elements
    playBtn        = player.querySelector('.ap-toggle-btn');
    prevBtn        = player.querySelector('.ap-prev-btn');
    nextBtn        = player.querySelector('.ap-next-btn');
    repeatBtn      = player.querySelector('.ap-repeat-btn');
    volumeBtn      = player.querySelector('.ap-volume-btn');
    plBtn          = player.querySelector('.ap-playlist-btn');
    curTime        = player.querySelector('.ap-time--current');
    durTime        = player.querySelector('.ap-time--duration');
    trackTitle     = player.querySelector('.ap-title');
    progressBar    = player.querySelector('.ap-bar');
    preloadBar     = player.querySelector('.ap-preload-bar');
    volumeBar      = player.querySelector('.ap-volume-bar');

    playList = settings.playList;

    playBtn.addEventListener('click', playToggle, false);
    volumeBtn.addEventListener('click', volumeToggle, false);
    repeatBtn.addEventListener('click', repeatToggle, false);
	repeatBtn.addEventListener('click', flipRepeatStatus, false);

    progressBar.parentNode.parentNode.addEventListener('mousedown', handlerBar, false);
    progressBar.parentNode.parentNode.addEventListener('mousemove', seek, false);
    document.documentElement.addEventListener('mouseup', seekingFalse, false);

    volumeBar.parentNode.parentNode.addEventListener('mousedown', handlerVol, false);
    volumeBar.parentNode.parentNode.addEventListener('mousemove', setVolume);
    document.documentElement.addEventListener('mouseup', seekingFalse, false);

    prevBtn.addEventListener('click', prev, false);
    nextBtn.addEventListener('click', next, false);

	volbox = document.getElementById('volbox');
	volbox.addEventListener('mousemove', handleMoveVol,false);
	volbox.addEventListener('dblclick',volumeToggle,false);
	vol_bar = document.getElementById('vol_bar');

	playOnOffButton = document.getElementById('playorpause');
	playOnOffButton.addEventListener('click',playOnOffButtonAction,false);
	
	nextSongButton = document.getElementById('nextsong');
	nextSongButton.addEventListener('click',nextSongButtonAction,false);
	
	prevSongButton = document.getElementById('prevsong');
	prevSongButton.addEventListener('click',prevSongButtonAction,false);
	
	repeatOnOffButton = document.getElementById('repeatsong');
	repeatOnOffButton.addEventListener('click',repeatOnOffButtonAction,false);

	
	goToTopButton =document.getElementById('go to top');
	goToTopButton.addEventListener('click',goToTopButtonAction,false);
	
	
	exportButton = document.getElementById('export');
	exportButton.addEventListener('click',exportButtonAction,false);

	exportButton1 = document.getElementById('export1');
	exportButton1.addEventListener('click',exportButtonAction1,false);
	
	// cannot remove anonymous functions
	quickSaveButton = document.getElementById('quick save');

	quickSaveButton.addEventListener('click',quickSaveButtonAction,false);

	quickSaveButton1 = document.getElementById('quick save1');
	quickSaveButton1.addEventListener('click',quickSaveButtonAction1,false);	
	
	gotocurrentButton = document.getElementById('current playing');

	//gotocurrentButton.addEventListener('click',()=>{gotocurrentPlaying(index);},false);
	gotocurrentButton.addEventListener('click',gotocurrentButtonAction,false);
	
	gotocurrentButton1 = document.getElementById('current playing1');
	gotocurrentButton1.addEventListener('click',gotocurrentButtonAction1,false);

	upvoteButton = document.getElementById('upvote');
	downvoteButton = document.getElementById('downvote');
	
	upvoteButton.addEventListener('click',upvoteButtonAction,false);

	downvoteButton.addEventListener('click',downvoteButtonAction,false);
    apActive = true;
	
	playLastButton = document.getElementById('playlastsong');
	playLastButton.removeEventListener('click', setIndexToLast, false);
	playLastButton.addEventListener('click', setIndexToLast, false);

	playLastButton1 = document.getElementById('playlastsong1');
	playLastButton1.removeEventListener('click', setIndexToLast1, false);
	playLastButton1.addEventListener('click', setIndexToLast1, false);
	playLastButton2 = document.getElementById('playlastsong2');
	playLastButton2.removeEventListener('click', setIndexToLast2, false);
	playLastButton2.addEventListener('click', setIndexToLast2, false);
	
	filterNumber = document.getElementById("filterNumber").value;
	filterUnpopularSongButton = document.getElementById('filterUnpopularSong');
	filterUnpopularSongButton.removeEventListener('click', filterSongList, false);
	filterUnpopularSongButton.addEventListener('click', filterSongList, false);

    // Create playlist
    renderPL();
    plBtn.addEventListener('click', plToggle, false);

    // Create audio object
    audio = new Audio();
    audio.volume = settings.volume;


    if(isEmptyList()) {
      empty();
      return;
    }

    audio.src = playList[index].file;
    audio.preload = 'auto';
    trackTitle.innerHTML = playList[index].title;

    volumeBar.style.height = audio.volume * 100 + '%';
    volumeLength = volumeBar.css('height');

    audio.addEventListener('error', error, false);
    audio.addEventListener('timeupdate', update, false);
    audio.addEventListener('ended', doEnd, false);
	
	plBtn.click()
    if(settings.autoPlay) {
      //audio.play();
	  // next();
      //playBtn.classList.add('playing');
      //plLi[index].classList.add('pl-current');
    }
  }

/**
 *  PlayList methods
 */
    function renderPL() {
      var html = [];
      var tpl =
        '<li data-track="{count}">'+
          '<div class="pl-number">'+
            '<div class="pl-count">'+
              '<i class="material-icons">audiotrack</i>'+
            '</div>'+
            '<div class="pl-playing">'+
              '<div class="eq">'+
                '<div class="eq-bar"></div>'+
                '<div class="eq-bar"></div>'+
                '<div class="eq-bar"></div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="pl-title">{title}</div>'+
          '<button class="pl-remove">'+
              '<i class="material-icons">delete</i>'+
          '</button>'+
		  '<button class="pl-add">'+
              '<i class="material-icons">vertical_align_top</i>'+
          '</button>'+
		  '<button class="pl-minus">'+
              '<i class="material-icons">vertical_align_bottom</i>'+
          '</button>'+
          '<div class="pl-score">{score}</div>'+		  
        '</li>';
	  
	  scoreList=Array(playList.length).fill(1);
      playList.forEach(function(item, i) {
        html.push(
          tpl.replace('{count}', i).replace('{title}', item.title).replace('{score}', item.score)
        );
      });

      playList.forEach(function(item, i) {
	  
		scoreList[i]=item.score;
      });

	  //console.log(scoreList)	;
      pl = create('div', {
        'className': 'pl-container hide',
        'id': 'pl',
        'innerHTML': !isEmptyList() ? '<ul class="pl-list">' + html.join('') + '</ul>' : '<div class="pl-empty">PlayList is empty</div>'
      });

      player.parentNode.insertBefore(pl, player.nextSibling);

      plLi = pl.querySelectorAll('li');

      pl.addEventListener('click', listHandler, false);
    }
	


    function listHandler(evt) {
      evt.preventDefault();
      if(evt.target.className === 'pl-title') {
        var current = parseInt(evt.target.parentNode.getAttribute('data-track'), 10);
        index = current;
        play();
        plActive();
      }
      else {
        var target = evt.target;
        while(target.className !== pl.className) {
          if(target.className === 'pl-remove') {
            var isDel = parseInt(target.parentNode.getAttribute('data-track'), 10);

            playList.splice(isDel, 1);
			scoreList.splice(isDel, 1);
            target.parentNode.parentNode.removeChild(target.parentNode);

            plLi = pl.querySelectorAll('li');

            [].forEach.call(plLi, function(el, i) {
              el.setAttribute('data-track', i);
            });

            if(!audio.paused) {

              if(isDel === index) {
                play();
              }

            }
            else {
              if(isEmptyList()) {
                empty();
              }
              else {
                // audio.currentTime = 0;
                audio.src = playList[index].file;
                document.title = trackTitle.innerHTML = playList[index].title;
                progressBar.style.width = 0;
              }
            }
            if(isDel < index) {
              index--;
            }

            return;
          }
		  else if(target.className === 'pl-add'){
			  let isVote = parseInt(target.parentNode.getAttribute('data-track'), 10);
			  //console.log(isVote)
			  scoreList[isVote]=scoreList[isVote]+1;
			  playList[isVote].score=scoreList[isVote];
			  let scoreElement=pl.getElementsByClassName('pl-score')[isVote];
			  scoreElement.textContent=scoreList[isVote].toString();
			  console.log(scoreList)
		  }
		  else if(target.className === 'pl-minus'){
			  let isVote = parseInt(target.parentNode.getAttribute('data-track'), 10);
			  //console.log(isVote)
			  if(scoreList[isVote]>=1){
				  scoreList[isVote]=scoreList[isVote]-1;  
			  }
			  else{
				  console.log("score cannot go negative");
			  }
			  playList[isVote].score=scoreList[isVote];
			  let scoreElement=pl.getElementsByClassName('pl-score')[isVote];
			  console.log('pl');
			  console.log(pl);
			  console.log(scoreElement);
			  scoreElement.textContent=scoreList[isVote].toString();
			  console.log(scoreList)
		  }		  
		  
          target = target.parentNode;
        }

      }
    }

    function plActive() {
      if(audio.paused) {
        plLi[index].classList.remove('pl-current');
        return;
      }
      var current = index;
      for(var i = 0, len = plLi.length; len > i; i++) {
        plLi[i].classList.remove('pl-current');
      }
      plLi[current].classList.add('pl-current');
    }


/**
 *  Player methods
 */
  

 
 
  function error() {
    !isEmptyList() && next();
  }
  function play() {

    index = (index > playList.length - 1) ? 0 : index;
    if(index < 0) index = playList.length - 1;

    if(isEmptyList()) {
      empty();
      return;
    }

    audio.src = playList[index].file;
    audio.preload = 'auto';
    document.title = trackTitle.innerHTML = playList[index].title;
    audio.play();
    notify(playList[index].title, {
      icon: playList[index].icon,
      body: 'Now playing',
      tag: 'music-player'
    });
    playBtn.classList.add('playing');
    plActive();
	
	//currentPlaying = document.getElementsByClassName('pl-current');
	//plLi[index].scrollIntoView()
	if(!PlayStatus){
	  flipPlayStatus();
	}	
	
  }

  function prev() {
    index = lastSongIndex;
	console.log("previous song");
    play();
  }

  function next() {
	lastSongIndex=index;
    index = index + 1;
	let drawResult = weightedRand2(buildIndexProb(scoreList));
	/* 
	console.log(buildIndexProb(playList.length))	;
	console.log('show me the apple');
	console.log(drawResult); */
	if (RandomStatus){
		index=drawResult;
	}
    play();
  }
  
  function isEmptyList() {
    return playList.length === 0;
  }

  function empty() {
    audio.pause();
    audio.src = '';
    trackTitle.innerHTML = 'queue is empty';
    curTime.innerHTML = '--';
    durTime.innerHTML = '--';
    progressBar.style.width = 0;
    preloadBar.style.width = 0;
    playBtn.classList.remove('playing');
    pl.innerHTML = '<div class="pl-empty">PlayList is empty</div>';
  }

  function playToggle() {
    if(isEmptyList()) {
      return;
    }
	flipPlayStatus();
    if(audio.paused) {
      audio.play();
      notify(playList[index].title, {
        icon: playList[index].icon,
        body: 'Now playing'
      });
      this.classList.add('playing');
    }
    else {
      audio.pause();
      this.classList.remove('playing');
    }
    plActive();
  }

  function volumeToggle() {
    if(audio.muted) {
      if(parseInt(volumeLength, 10) === 0) {
        volumeBar.style.height = '100%';
        audio.volume = 1;
      }
      else {
        volumeBar.style.height = volumeLength;
      }
      audio.muted = false;
      this.classList.remove('muted');
	  vol_bar.textContent = 'Sound Level: '+(audio.volume * 100).toFixed(2) + '%';
	  volbox.addEventListener('mousemove', handleMoveVol,false);
    }
    else {
      audio.muted = true;
      volumeBar.style.height = 0;
      this.classList.add('muted');
	  vol_bar.textContent = 'Muted; Double Click to Unmute';
	  volbox.removeEventListener('mousemove', handleMoveVol,false);
    }
  }

  function repeatToggle() {
    var repeat = this.classList;
	
    if(repeat.contains('ap-active')) {
      repeating = false;
      repeat.remove('ap-active');
    }
    else {
      repeating = true;
      repeat.add('ap-active');
    }
	 
  }

  function plToggle() {
    this.classList.toggle('ap-active');
    pl.classList.toggle('hide');
  }

  function update() {
    if(audio.readyState === 0) return;

    var barlength = Math.round(audio.currentTime * (100 / audio.duration));
    progressBar.style.width = barlength + '%';

    var
    curMins = Math.floor(audio.currentTime / 60),
    curSecs = Math.floor(audio.currentTime - curMins * 60),
    mins = Math.floor(audio.duration / 60),
    secs = Math.floor(audio.duration - mins * 60);
    (curSecs < 10) && (curSecs = '0' + curSecs);
    (secs < 10) && (secs = '0' + secs);

    curTime.innerHTML = curMins + ':' + curSecs;
    durTime.innerHTML = mins + ':' + secs;

    var buffered = audio.buffered;
    if(buffered.length) {
      var loaded = Math.round(100 * buffered.end(0) / audio.duration);
      preloadBar.style.width = loaded + '%';
    }
  }

  function doEnd() {
    if(!repeating) {
      //if(index === playList.length - 1) {
        // audio.pause();
        // plActive();
        // playBtn.classList.remove('playing');
        // return;
      // }
      // else {
        //index = 0;
        //play();
		next();  //play the next random one
		
      //}
    }
    else {
      //index = (index === playList.length - 1) ? 0 : index + 1;
      //play();
	  next();
	  audio.pause();
	  prev();
	  //play();
    }
  }
  
  function exportButtonAction(){
	exportAsJson(playList);    
  }
  
  function quickSaveButtonAction(){
	quickSave(playList);    
  }  

  function exportButtonAction1(){
	exportAsJson(playList);    
  }
  
  function quickSaveButtonAction1(){
	quickSave(playList);    
  }  

  function gotocurrentButtonAction(){
	plLi[index].scrollIntoView();    
  }  
 
  function gotocurrentButtonAction1(){
	plLi[index].scrollIntoView();    
  }  
  
  function goToTopButtonAction(){
	exportButton.scrollIntoView(); 
	document.webkitExitFullscreen();
	document.exitFullscreen();
  }
 
  function upvoteButtonAction(){
	plLi[index].childNodes[3].click();    
  }  

  function downvoteButtonAction(){
	plLi[index].childNodes[4].click();    
  }  
  
  function setIndexToLast(){
	  index = (playList.length - 1);
	  play();
	  gotocurrentButton.click();
  }
 
  function setIndexToLast1(){
	  index = (playList.length - 1);
	  play();
	  //gotocurrentButton.click();
  }

  function setIndexToLast2(){
	  index = (playList.length - 1);
	  play();
	  //gotocurrentButton.click();
  }

  function filterSongList(){
	  filterNumber = document.getElementById("filterNumber").value;
	  // console.log(filterNumber);
	  plLi = pl.querySelectorAll('li');
      playList.forEach(function(item, i) {
		if (item.score<filterNumber && item.score>0){
			item.score=0;
			scoreList[i]=0;
			//console.log(plLi[i]);
			//let scoreElement=plLi[i].getElementsByClassName('pl-score');
			//scoreElement.textContent=scoreList[i].toString();
		}
      });
	  destroy();
	  init();
/* 	  if (PlayStatus){
		playBtn.click();  
	  } */
	  
	  
	  if (PlayStatus){
		play();  
	  }
	/* cannot use repeatToggle since that requires passing in a "this" which references the repeat button from eventlistener */
	  if (RepeatStatus){
		let repeatTest = player.querySelector('.ap-repeat-btn').classList;
		repeating = true;
		repeatTest.add('ap-active');
		/* 
		console.log("repeat toggled"+repeating); */
	  }
/* 	  if (RepeatStatus){
		repeating;  
	  } */
/* 	  gotocurrentButton.click(); */
  }

  function playOnOffButtonAction(){
	playBtn.click();  
	flipPlayStatus();
  }
  
  function nextSongButtonAction(){
	nextBtn.click();  
  }
  
  function prevSongButtonAction(){
	prevBtn.click();  
  }
  
  function repeatOnOffButtonAction(){
	repeatBtn.click();  
	flipRepeatStatus();
  }



  function moveBar(evt, el, dir) {
    var value;
    if(dir === 'horizontal') {
      value = Math.round( ((evt.clientX - el.offset().left) + window.pageXOffset) * 100 / el.parentNode.offsetWidth);
      el.style.width = value + '%';
      return value;
    }
    else {
      var offset = (el.offset().top + el.offsetHeight)  - window.pageYOffset;
      value = Math.round((offset - evt.clientY));
      if(value > 100) value = 100;
      if(value < 0) value = 0;
      volumeBar.style.height = value + '%';
      return value;
    }
  }

  function handlerBar(evt) {
    rightClick = (evt.which === 3) ? true : false;
    seeking = true;
    seek(evt);
  }

  function handlerVol(evt) {
    rightClick = (evt.which === 3) ? true : false;
    seeking = true;
    setVolume(evt);
  }

  function handleMoveVol(evt){
      const x = evt.pageX - this.offsetLeft;
      const percent = x / this.offsetWidth;
      const min = 0;
      const max = 1;
      const width = Math.round(percent * 100) + '%';
	  const height = Math.round(percent * 100) + '%';
      const playVolume = percent * (max - min) + min;
      vol_bar.style.width = width;
      vol_bar.textContent = 'Sound Level: '+(percent * 100).toFixed(2) + '%';
      audio.volume = playVolume;
	  volumeBar.style.height = height;
  }	  


  function seek(evt) {
    if(seeking && rightClick === false && audio.readyState !== 0) {
      var value = moveBar(evt, progressBar, 'horizontal');
      audio.currentTime = audio.duration * (value / 100);
    }
  }

  function seekingFalse() {
    seeking = false;
  }

  function setVolume(evt) {
    volumeLength = volumeBar.css('height');
    if(seeking && rightClick === false) {
      var value = moveBar(evt, volumeBar.parentNode, 'vertical') / 100;  
      if(value <= 0) {
        audio.volume = 0;
        volumeBtn.classList.add('muted');
		volbox.removeEventListener('mousemove', handleMoveVol,false);		
      }
      else {
        if(audio.muted) audio.muted = false;
        audio.volume = value;
        volumeBtn.classList.remove('muted');
		volbox.addEventListener('mousemove', handleMoveVol,false);
      }
	  const width = Math.round(value * 100) + '%';
	  vol_bar.style.width = width;
	  vol_bar.textContent = 'Sound Level:'+(value * 100).toFixed(2) + '%';
    }
  }

  function notify(title, attr) {
    if(!settings.notification) {
      return;
    }
    if(window.Notification === undefined) {
      return;
    }
    window.Notification.requestPermission(function(access) {
      if(access === 'granted') {
        var notice = new Notification(title.substr(0, 110), attr);
        notice.onshow = function() {
          setTimeout(function() {
            notice.close();
          }, 5000);
        }
        // notice.onclose = function() {
        //   if(noticeTimer) {
        //     clearTimeout(noticeTimer);
        //   }
        // }
      }
    })
  }

/* Destroy method. Clear All */
  function destroy() {
/*     if(!apActive) return; */


	// Buttons
	exportButton.removeEventListener('click',exportButtonAction,false);
	quickSaveButton.removeEventListener('click',quickSaveButtonAction,false);
	exportButton1.removeEventListener('click',exportButtonAction1,false);
	quickSaveButton1.removeEventListener('click',quickSaveButtonAction1,false);	
	gotocurrentButton.removeEventListener('click',gotocurrentButtonAction,false);
	gotocurrentButton1.removeEventListener('click',gotocurrentButtonAction1,false);
	upvoteButton.removeEventListener('click',upvoteButtonAction,false);
	downvoteButton.removeEventListener('click',downvoteButtonAction,false);
	playLastButton.removeEventListener('click', setIndexToLast, false);
	playLastButton1.removeEventListener('click', setIndexToLast1, false);
	playLastButton2.removeEventListener('click', setIndexToLast2, false);
	filterUnpopularSongButton.removeEventListener('click', filterSongList, false);
	goToTopButton.removeEventListener('click',goToTopButtonAction,false);
	
	playOnOffButton.removeEventListener('click',playOnOffButtonAction,false);
	nextSongButton.removeEventListener('click',nextSongButtonAction,false);
	prevSongButton.removeEventListener('click',prevSongButtonAction,false);
	repeatOnOffButton.removeEventListener('click',repeatOnOffButtonAction,false);
	repeatBtn.removeEventListener('click', flipRepeatStatus, false);
	volbox.removeEventListener('mousemove', handleMoveVol,false);
	volbox.removeEventListener('dblclick',volumeToggle,false);

    playBtn.removeEventListener('click', playToggle, false);
    volumeBtn.removeEventListener('click', volumeToggle, false);
    repeatBtn.removeEventListener('click', repeatToggle, false);
    plBtn.removeEventListener('click', plToggle, false);
	
    progressBar.parentNode.parentNode.removeEventListener('mousedown', handlerBar, false);
    progressBar.parentNode.parentNode.removeEventListener('mousemove', seek, false);
    document.documentElement.removeEventListener('mouseup', seekingFalse, false);

    volumeBar.parentNode.parentNode.removeEventListener('mousedown', handlerVol, false);
    volumeBar.parentNode.parentNode.removeEventListener('mousemove', setVolume);
    document.documentElement.removeEventListener('mouseup', seekingFalse, false);

    prevBtn.removeEventListener('click', prev, false);
    nextBtn.removeEventListener('click', next, false);

    audio.removeEventListener('error', error, false);
    audio.removeEventListener('timeupdate', update, false);
    audio.removeEventListener('ended', doEnd, false);
    player.parentNode.removeChild(player);

    // Playlist
    pl.removeEventListener('click', listHandler, false);
    pl.parentNode.removeChild(pl);
	


    audio.pause();
    apActive = false;
  }


/**
 *  Helpers
 */
  function extend(defaults, options) {
    for(var name in options) {
      if(defaults.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
    return defaults;
  }
  function create(el, attr) {
    var element = document.createElement(el);
    if(attr) {
      for(var name in attr) {
        if(element[name] !== undefined) {
          element[name] = attr[name];
        }
      }
    }
    return element;
  }

  Element.prototype.offset = function() {
    var el = this.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      top: el.top + scrollTop,
      left: el.left + scrollLeft
    };
  };

  Element.prototype.css = function(attr) {
    if(typeof attr === 'string') {
      return getComputedStyle(this, '')[attr];
    }
    else if(typeof attr === 'object') {
      for(var name in attr) {
        if(this.style[name] !== undefined) {
          this.style[name] = attr[name];
        }
      }
    }
  };

  


/**
 *  Public methods
 */
  return {
    init: init,
    destroy: destroy
  };


  
  
})();

window.AP = AudioPlayer;

})(window);


