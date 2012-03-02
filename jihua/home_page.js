$(document).ready(function(){
	bind_location_selector();
	create_calendar(document.URL);
	if(signed_in) {
		load_alert_box();
		$('#need_to_do_box').load("/need_to_do_box", function (){});
	}
	
	configure_load_more("home", null);
	//recommended user stuff
	$('#recommended_users li:first .detail_desc').show();
	$('#recommended_users li:first .more').toggleClass('more_up');
	
	$('a.user_desc').click(function(){
		$(this).parents('li').find('.detail_desc').toggle();
		$(this).children('.more').toggleClass('more_up');
	});	

	if($("#basic_tutorial").html() == "0") {
		do_tutorial();		
	}	
});

function do_tutorial() {

	$.post("/function_end_tutorial");
	var next_button = {name: "下一步", onclick: guiders.next}
	var step = 1
	
	guiders.createGuider({
		buttons: [{name: "不用了", onclick: guiders.hideAll, classString: 'secondary-button'}, {name: "好", onclick: guiders.next}],
		description: "让我们花30秒来了解一下这个网站吧",
		id: "step" + step,
		next: "step" + (step+1),
		overlay: true,
		title: "欢迎来到计划FM"
	}).show();

	step+=1;
	
	guiders.createGuider({
		attachTo: "#friend_tab",
		buttons: [next_button],
		description: "这里的朋友是你在计划FM上关注的人，“朋友的计划”里有他们要去的活动和喜欢的计划。",
		id: "step" + step,
		next: "step" + (step+1),
		position: 3,
		title: "这里可以查看朋友的计划"
	});
	step+=1;
	
	var first_button = $(".follow_wish_button:first");
	if(first_button != null && first_button.length !== 0) {
		first_button.click(function() {
			guiders.next();
		});
		
		guiders.createGuider({
			attachTo: first_button,
			buttons: [next_button],
			description: "看到感兴趣的计划，可以点击“参加”按钮，关注你的人会收到通知。",
			id: "step" + step,
			next: "step" + (step+1),
			position: 9,
			title: "怎样参加计划？",
			width: 500
		});
		step+=1;
	}

	var first_like = $(".like_wish_button:first");

	if (first_like != null && first_like.length !== 0) {
		first_like.click(function() {
			guiders.next();
		});
	
		guiders.createGuider({
			attachTo: first_like,
			buttons: [next_button],
			description: "当你对一个计划感兴趣，却不能立即决定是否能参加，你可以按 '喜欢' 将它保留在自己的计划流下。",
			id: "step" + step,
			next: "step" + (step+1),
			position: 9,
			title: "什么是喜欢?",
			width: 500
		});
		step+=1;
	}

	var create_plan_button = $("#create_plan_button");
	create_plan_button.click(function() {
		guiders.next();
	});
	
	guiders.createGuider({
		attachTo: create_plan_button,
		buttons: [next_button],
		description: "你也可以自己发布计划，通过邮件或微博邀请站内外的朋友参加。",
		id: "step" + step,
		next: "step" + (step+1),
		title: "发布计划",
		position: 6,
		width: 550
	});

	step+=1;
	
	guiders.createGuider({
		buttons: [{name: "明白了", classString: "primary-button", onclick: guiders.hideAll}],
		description: "找活动，发计划。Life is too short to be bored!",
		id: "step" + step,
		overlay: true,
		title: "现在开始吧",
		width: 500
	});
}