/**
 * 
 */
class BrowserStack { 
  constructor(start){
	  this.prev = [];     // prev 스택을 담을 배열
	  this.next = [];     // next 스택을 담을 배열
	  this.cur = start;   // 현재 페이지를 담을 문자열
  }
  // 실행취소
  backward(action){
	  if(action == '1' && this.next.length !==0) { 
	    	console.log('재실행');  
	    	this.prev.push(this.cur);
	    	this.cur = this.next.pop();
	    	return this.cur; 
	    }else{
	    	return null;
	    } 
  }
  
  // 재실행
  forward(action){
	  if (action == '-1' && this.prev.length !==0) { 
	    	console.log('취소했을때');
	    	this.next.push(this.cur);
	    	this.cur = this.prev.pop(); 
	    	return this.cur;  
	    }else{
	    	return null;
	    }
  }
  
  // 저장이나 삭제 클릭시
   move(action,data) {
      console.log('추가'); 
      this.prev.push(this.cur);
      this.cur = data; 
      this.next = []; 
  }
   
}
