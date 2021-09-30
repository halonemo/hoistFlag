var hoistFlag = {
	bgStart:0,
	bgHeight:0,
	itemHeight:0,
	mainHeight:0,
	stop:false,
	destroy:false,
	flagHeight:0,
	flagMaxHeight:0,
	flagIndex:0,
	stepIndex: 0,
	microphone:false,
	siriIndex:0,
	siriOpen:0,
	mute:0,
	timeout:null,
	interval:null,
	animateStart:false,
	tipNum:0,
	recCallback: function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
		// bufferDuration+" / "+powerLevel;
		console.log('powerLevel' + powerLevel)
		// || powerLevel < 5 
		if(hoistFlag.stop || hoistFlag.destroy || powerLevel < 8  ){
			hoistFlag.mute = hoistFlag.mute + 1
			if(hoistFlag.mute === 20){
				hoistFlag.animateStart && hoistFlag.stopAnimate()
			}
			console.log('mute'+hoistFlag.mute)
			return 
		}else{
			hoistFlag.mute = 0
			console.log('mute'+hoistFlag.mute)
		}
		if(!hoistFlag.animateStart){
			hoistFlag.animate()
		}
		return false
	},
	stopAnimate(){
		hoistFlag.timeout && clearTimeout(hoistFlag.timeout)
		$(".dialog .close").show()
		$(".step-dialog").removeClass("scale")
		$(".animate2").addClass("stopAnimate")
		$(".bg-all").addClass("stopAnimate")
		if(hoistFlag.stepIndex === 0){
			$(".step-dialog").show()
			$(".dialog1").show().siblings("img").hide()
		}
		hoistFlag.interval && clearInterval(hoistFlag.interval)
		$(".siri img").eq(0).show().siblings().hide()
		hoistFlag.stop = true
	},
	animate(){
		hoistFlag.interval = setInterval(() => {
			hoistFlag.siriGif()
		}, 100);
		hoistFlag.animateStart = true
		hoistFlag.stepIndex = 0
		$(".flag-wrap").addClass("animate2")
		hoistFlag.timeout = setTimeout(() => {
			hoistFlag.stepIndex = 1
			$(".step-dialog").show()
			$(".dialog1").show().siblings("img").hide()
			// 埋点60001 用户成功进入城市上空
			hoistFlag.statistics("60001")
			$(".bgaudio")[0].volume = 1
			$(".bgaudio")[0].play()
			$(".bg-all").addClass("animateAll1")
			hoistFlag.timeout = setTimeout(() => {
				hoistFlag.stepIndex = 2
				$(".dialog2").show().siblings("img").hide()
				// 埋点60002 用户成功进入璀璨星空
				hoistFlag.statistics("60002")
				$(".bgaudio")[1].volume = 1
				$(".bgaudio")[1].play()
				$(".bg-all").addClass("animateAll2")
				hoistFlag.timeout = setTimeout(() => {
					hoistFlag.stepIndex = 3
					$(".dialog3").show().siblings("img").hide()
					// 埋点60003 用户成功进入浩瀚银河
					hoistFlag.statistics("60003")
					$(".bgaudio")[2].volume = 1
					$(".bgaudio")[2].play()
					$(".bg-all").addClass("animateAll3")
					hoistFlag.timeout = setTimeout(() => {
						hoistFlag.stepIndex = 4
						$(".dialog4").show().siblings("img").hide()
						// 埋点60004 用户成功进入无边宇宙
						hoistFlag.statistics("60004")
						$(".bgaudio")[3].volume = 1
						$(".bgaudio")[3].play()
						$(".bg-all").addClass("animateAll4")
						hoistFlag.stopAnimate()
						$(".dialog .close").show()
						$(".step-dialog").removeClass("scale")
					},7000)
				},7000)
			},7000)
		}, 2000);
	},
	close(){
		$(".loading-btn").show()
		$(".bg-all").attr("class",'bg-all')
		$(".step-dialog").hide()
		$(".loading-btn").show()
		$(".loading-dialog").show()
		$(".flag-wrap").height("50%").attr('class','flag-wrap')
		$(".dl").removeClass("transition").css("bottom",'0')
		$(".dialog .close").hide()
		$(".step-dialog").addClass("scale")
	},
	start(){
		$(".loadingaudio")[0].pause && $(".loadingaudio")[0].pause()
		if(hoistFlag.tipNum < 1){
			$(".bgaudio")[0].volume = 0
			$(".bgaudio")[0].play()
			$(".bgaudio")[0].pause()
			$(".bgaudio")[1].volume = 0
			$(".bgaudio")[1].play()
			$(".bgaudio")[1].pause()
			$(".bgaudio")[2].volume = 0
			$(".bgaudio")[2].play()
			$(".bgaudio")[2].pause()
			$(".bgaudio")[3].volume = 0
			$(".bgaudio")[3].play()
			$(".bgaudio")[3].pause()
			$(".touch-btn .tip").fadeIn()
		}
		hoistFlag.tipNum = hoistFlag.tipNum + 1
		setTimeout(() => {
			$(".touch-btn .tip").fadeOut()
		}, 4000);
		$(".dl").addClass("transition").css("bottom",'50vh')
		if(hoistFlag.microphone){
			$(".loading-dialog").hide()
			recStart()	
		}else{
			showDialog();
		}
		// 埋点50001 用户升起彩旗
		hoistFlag.statistics("50001")
		// hoistFlag.animate()
		hoistFlag.animateStart = false
		hoistFlag.mute = 0
		hoistFlag.stop = false
	},
	recStart(){
		recStart()	
	},
	flagGif(){
		if(hoistFlag.flagIndex >= 9){
			hoistFlag.flagIndex = 0
		}else{
			hoistFlag.flagIndex = hoistFlag.flagIndex + 1
		}
		$(".flag img").eq(hoistFlag.flagIndex).show().siblings().hide()
		setTimeout(() => {
			hoistFlag.flagGif()
		}, 100);
	},
	siriGif(){
		if(hoistFlag.siriIndex >= 69){
			hoistFlag.siriIndex = 0
		}else{
			hoistFlag.siriIndex = hoistFlag.siriIndex + 1
		}
		$(".siri img").eq(hoistFlag.siriIndex).show().siblings().hide()
	},
	dataInit: function(){
		hoistFlag.bgHeight = $("#basic-bg").height()
		hoistFlag.itemHeight = hoistFlag.bgHeight / 4
		hoistFlag.mainHeight = $(".main").height()
		hoistFlag.flagHeight = hoistFlag.mainHeight / 2
		hoistFlag.flagMaxHeight = hoistFlag.mainHeight * 0.75
		$(".flag-wrap").css('height',hoistFlag.flagHeight)
	},
	formatDate(date) { 
		function formatTen(num) { 
			return num > 9 ? (num + '') : ( '0' + num); 
	   	} 
		var year = date.getFullYear(); 
		var month = date.getMonth() + 1; 
		var day = date.getDate(); 
		var hour = date.getHours(); 
		var minute = date.getMinutes(); 
		var second = date.getSeconds(); 
		return year + '-' + formatTen(month) + '-' + formatTen(day)+ " " +formatTen(hour)+ ':' +formatTen(minute)+ ':' +formatTen(second); 
	},
	statistics(eventID,logMap){
		var date = new Date()
		var duid = ""
		var imei = ""
		try {
			var jsonStr = window.HeytapJsApi.getUserInfoSync()
			var json = JSON.parse(jsonStr)
			duid = json.clientId
			imei = json.imei
		} catch (error) {
			duid = ""
			imei = ""
		}
		var param = {
			head:{
				"imei":imei,
				"duid":duid,
				"postTime":parseInt(date.getTime() / 1000)
			},
			body:[{
				logTag: "20184_National_Day_game", //业务id
				eventID: eventID, //事件id
				appId: 20184,
				eventTime:hoistFlag.formatDate(date),
				logMap:JSON.stringify({
					url: window.location.href,
					time: parseInt(date.getTime() / 1000),
					imei: imei,
					duid: duid
				})
			}]
		}
		if(logMap){param.body.logMap = $.extends(param.body.logMap,logMap)}
		$.ajax({
			type:'post',
			url:"https://event.dc.oppomobile.com/stat/dcs",
			data:JSON.stringify(param),
			contentType:'json/application',
			success:function(){
				console.log('调用成功')
			}
		});
	},
	init: function(){
		hoistFlag.flagGif()
		recOpen()
		$(".main").show()
		$(".loading-btn").show()
		$(".progress").removeClass("animate")
		$(".progress").width("100%")
		hoistFlag.dataInit()
		$('body').on('reSize',function(){
			hoistFlag.dataInit()
		})
		var siri = ""
		for(let i = 1; i<= 69;i++){
			siri += '<img src="./src/images/siri/'+ i +'.png">'
		}
		$(".siri").append(siri).ready(function(){
			hoistFlag.siriOpen = true
		});
		hoistFlag.statistics("80001")
	}
}
hoistFlag.statistics("20011")
hoistFlag.startTime = (new Date()).getTime()
window.onbeforeunload = function(event) {
	hoistFlag.statistics("80002")
	var endTime = (new Date()).getTime() - hoistFlag.startTime 
	hoistFlag.statistics("80003",{duration:endTime})
 }
