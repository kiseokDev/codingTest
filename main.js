/**
 * 
 */

//data 불러오기  =========start=======
var initResetData = function(storage){
	storage = JSON.parse(storage);  
	cache = storage;
	initInsert(storage); 
	
}
//data 불러오기  =========end=======
//처음 글자 출력하기 ==================start=============
function init(text,maxlength){      
// 	window.localStorage.removeItem('cache');         ///////////remove Cookie
	let storage = window.localStorage.getItem('cache'); 
	if(storage != null){  
		initResetData(storage);  
	}
	var textarr = text.split(' ');
	var test = [];
	while(true){
	 textarr.forEach(ele=>{test.push(ele)});
		if(test.length >= maxlength) {
			 test.splice(maxlength);
			 break;
		}
	}
	var resultText = test.map((arg,idx)=>{    
		textTag = '<span eid="'+idx+'" data-text="'+arg+'" class="word" >'+arg+'</span>';
		return textTag;
	}).join(' ');  
 	result.innerHTML = resultText;
 	const word = document.querySelectorAll('.word');
 	word.forEach((ele)=>ele.addEventListener('click',wordClickEvent));
} 
//처음 글자 출력하기 ==================End=============

function save(){  
 	window.localStorage.setItem('cache', JSON.stringify(cache));
}

function initCss(cacheArr){
	let elements = document.body.querySelectorAll('[eid]');
	elements.forEach(e=>{
		e.classList.remove('clickStyle'); 
		e.classList.remove('insertStyle');
	}); 
	
	cacheArr.forEach(e=>{ 
		e.forEach(i=>{ 
			let idArr = i.textId;    
			JSON.parse(idArr).forEach(y=>{ 
				let ele = document.body.querySelector('[eid="'+y+'"]');  
				ele.classList.add('clickStyle'); 
				ele.classList.add('insertStyle');  
			}) 
		})
	});  
} 

function initInsert(cacheArr){
	cacheArr.forEach((ele,i)=>{ 
		let textChosen = document.createElement("div");
		textChosen.setAttribute('class','textchosen_wrapper');
		let deleteBtn = document.createElement('button');
		deleteBtn.setAttribute("class",'deleteBtn');
		deleteBtn.setAttribute("value",'0'); 
		deleteBtn.addEventListener('click',deleteBtnClickHandler); 
		textChosen.appendChild(deleteBtn);	
		let deleteIcon = document.createTextNode('X');
		deleteBtn.appendChild(deleteIcon); 
		textChosen.setAttribute('id',i); 
		ele.forEach((e)=>{ 
			let textspanTag =  document.createElement('span');
			textspanTag.dataset.textIds = e.textId;  
			textspanTag.dataset.textName = e.textName;
			let textNode = document.createTextNode(e.textName);
			textChosen.appendChild(textspanTag);
			textspanTag.appendChild(textNode);  
		})
		textchosenContainer.appendChild(textChosen);  
	}) 
}

 
function pushCacheArr(){  
	let newArr = [];
	let parent = document.querySelectorAll('.textchosen_wrapper');
	parent.forEach(ele=>{
		let objs = [];  
		let target = ele.getElementsByTagName('span');   
		
		for(let e of target){
			let obj = {};
			//span tag 
//			console.log('e.dataset.textId',e.dataset.textIds);    
			obj.textId = e.dataset.textIds;
			obj.textName = e.dataset.textName;
			objs.push(obj); 
		}  
		newArr.push(objs);    
	})  
	cache = newArr;   
	save();          
}   