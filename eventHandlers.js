/**
 * 
 */


//[글자 클릭할시] 임시배열담기, css추가하기, 중복제거하기  =======start========
function wordClickEvent(){
	let textName = this.getAttribute('data-text');
	let textId = this.getAttribute('eid'); 
	let textIds = [textId];
	if(this.classList.contains('insertStyle') || this.classList.contains('clickStyle')) return false; //이미 선택되어거나 삽입된 단어
	this.classList.add('clickStyle');
	const flag = (element) => (element.textName) == textName;  
	var idx = clickedArr.findIndex(flag);
	if(idx >= 0 ){  // 같은 단어를 선택했을시 중복을 제거하는 로직
		
		let tempIds = clickedArr[idx].textId;
		tempIds = tempIds.concat(textId);   
		clickedArr[idx].textId = tempIds; 
				
	}else{
		
		let obj = {
				textName : textName,
				textId : textIds 
		}
		clickedArr.push(obj);  	
	}
}
//[글자 클릭할시] 임시배열담기, css추가하기, 중복제거하기  =======end========


//[추가 눌렀을시] 중복할경우 id추가하기 , cache할 데이터 제어하기, css추가하기, UI ELEMENT 추가하기 ============Start=============
function insertItemHandler(arr){ 
	let textChosen = document.createElement("div") // UI만들기...
	textChosen.setAttribute('class','textchosen_wrapper');

	let deleteBtn = document.createElement('button');
	deleteBtn.setAttribute("class",'deleteBtn');
	deleteBtn.setAttribute("value",'0'); 
	deleteBtn.addEventListener('click',stackMoveHandler);   
	deleteBtn.addEventListener('click',deleteBtnClickHandler); 

	let deleteIcon = document.createTextNode('X');
	deleteBtn.appendChild(deleteIcon); 
	textChosen.appendChild(deleteBtn);
	
	let temp = document.querySelectorAll('.clickStyle');  
	temp.forEach(e=>e.classList.add('insertStyle')); 
	
	for(var ele of arr){ // 기존에 추가가 된 Text라면 찾아서 data-text-ids에 선택된 id를 추가한다. 
		let temp = document.querySelector('[data-text-name="'+ele.textName+'"]');  
		if(temp != null){
			let textIds = temp.dataset.textIds;
			textIds =JSON.parse(textIds);
			ele.textId.forEach(e=>textIds = textIds.concat(e));
			temp.dataset.textIds = JSON.stringify(textIds);
			
//			let cacheIdx = temp.parentElement.getAttribute('id') // window에 저장될 cache 데이터에도 id를 추가해준다.
//			console.log('cache',cache); 
//			let obj = cache[cacheIdx]; 
//			console.log('obj',obj);
//			obj.textId = obj.textId.concat(ele.textId); 
//			console.log('cache 222',cache);    
//			save();
			continue; 
		}else{ 
			let textspanTag =  document.createElement('span'); 
			textspanTag.setAttribute('data-text-ids',JSON.stringify(ele.textId));  
			textspanTag.setAttribute('data-text-name',ele.textName); 
			let textNode = document.createTextNode(ele.textName);   
			textspanTag.appendChild(textNode);
			textChosen.appendChild(textspanTag); 
		} 
	}
	if(textChosen.childElementCount > 1){ 
		textchosenContainer.appendChild(textChosen); 
		textChosen.setAttribute('id',insertedArrlength++);  
	} 
	clickedArr= [];
} 
//[추가 눌렀을시] 중복어하기, cache할 데이터 제어하기, css추가하기, UI ELEMENT 추가하기 =============END================


function deleteBtnClickHandler(event){ 
	pushCacheArr();   //캐시저장을위해...
	stackMoveHandler(event);  //stack cache를 담은다...
	let parent = this.parentElement;
	let id = parent.getAttribute('id');
	let sibling = this.nextElementSibling;
	while(sibling){ // 삭제후에 css를 remove
		let text = sibling.dataset.textName;
		let words = document.querySelectorAll('[data-text="'+text+'"]');  
		words.forEach(e=>{
			e.classList.remove('clickStyle');
			e.classList.remove('insertStyle'); 
		})
		sibling = sibling.nextElementSibling;  
	}
	cache.splice(id,1);  
	save();     
	this.removeEventListener('click',deleteBtnClickHandler); 
	parent.remove();          
} 

function stackMoveHandler(event){  
	let action = event.target.value;    
	let returnCache;   
	switch (action) {
	  case '1': returnCache = browserStack.backward(action);
	    break;
	  case '-1': returnCache = browserStack.forward(action);
	    break;
	  default: browserStack.move(action,cache);
	}
	 
	if(returnCache != null){
		document.getElementById('textchosen_container').innerHTML=''; 
		console.log('returnCache',returnCache);   
		initInsert(returnCache);   
		initCss(returnCache); 
		pushCacheArr();   
	}
}
