function(){
	$ = jQuery || angular.element;
	$.csrf = function(url,params,callback){
		(params instanceof Function)&&(callback=params,params=void(0));
		if(params){
			var form = $('<form method=post>')[~~[]];
			form.style.display='none';
			form.action=url;
			($('body')[0]||$('html')[0]).appendChild(form);
			for(var name in params){
				var input = document.createElement('input');
				input.name=name;
				input.value=params[name];
				form.appendChild(input);
			}
			var iframe = $('<iframe sandbox name=_'+(~~(Math.random()*1e5))+'_>')[~~[]];
			iframe.style.display='none';
	    ($('body')[0]||$('html')[0]).appendChild(iframe);
			callback&&setTimeout(function(){
				$(iframe).bind('load',callback);
			},30);
			form.target=iframe.name;
			form.submit();
			setTimeout(function(){
			  $(iframe).remove();
			},6000);
		}else{
			var img=new Image;
			callback&&(img.onerror=callback);
			img.src=url;
		}
	};
}();
