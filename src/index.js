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
	recCallback: function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
		// bufferDuration+" / "+powerLevel;
		console.log(powerLevel)
		hoistFlag.siriGif()
		if(hoistFlag.stop || hoistFlag.destroy || powerLevel < 5 ){
			return 
		}
		if(hoistFlag.flagHeight < hoistFlag.flagMaxHeight){
			var num = powerLevel < 30 ? 5 : powerLevel / 5
			hoistFlag.flagHeight = hoistFlag.flagHeight + num
			$(".flag-wrap").css('height',hoistFlag.flagHeight)
		}else{
			if(hoistFlag.stepIndex === 0){
				hoistFlag.stepIndex = 1
				hoistFlag.stop = true
				$(".step-dialog").show()
				$(".dialog1").show().siblings("img").hide()
				$("#audio")[0].volume = 1
				$("#audio")[0].play()
			}else if(hoistFlag.stepIndex === 1 && Math.abs(hoistFlag.bgStart) >= hoistFlag.itemHeight * 1){
				hoistFlag.stepIndex = 2
				hoistFlag.stop = true
				$(".step-dialog").show()
				$(".dialog2").show().siblings("img").hide()
				$("#audio")[0].play()
			}else if(hoistFlag.stepIndex === 2 && Math.abs(hoistFlag.bgStart) >= hoistFlag.itemHeight * 2){
				hoistFlag.stepIndex = 3
				hoistFlag.stop = true
				$(".step-dialog").show()
				$(".dialog3").show().siblings("img").hide()
				$("#audio")[0].play()
			}else if(hoistFlag.stepIndex === 3 && Math.abs(hoistFlag.bgStart) >= hoistFlag.itemHeight * 3){
				hoistFlag.stepIndex = 4
				hoistFlag.destroy = true
				recPause && recPause()
				$(".step-dialog").show()
				$(".dialog4").show().siblings("img").hide()
				$("#audio")[0].play()
			}else{
				var num = powerLevel < 40 ? 10 : powerLevel / 2
				hoistFlag.bgStart = hoistFlag.bgStart - num
				$(".bg-all").css('bottom',hoistFlag.bgStart)
				// $(".dl").css('bottom',hoistFlag.bgStart)
				// $(".galaxy-wrap").css('bottom',hoistFlag.bgStart)
			}
		}
	},
	close(){
		$(".step-dialog").hide()
		hoistFlag.stop = false
	},
	start(){
		$("#audio")[0].volume = 0
		$("#audio")[0].play()
		$("#audio")[0].pause()
		$(".dl").addClass("dl-animate")
		if(hoistFlag.microphone){
			$(".loading-dialog").hide()
			recStart()	
		}else{
			showDialog();
		}
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
		$(".touch-btn").append(siri).ready(function(){
			hoistFlag.siriOpen = true
		});
		// $(".touch-btn").on("touchstart",function(event){
		// 	// console.log(111)
		// 	event.preventDefault();
		// 	recStart()
		// })
		// $(".touch-btn").on("touchend",function(event){
		// 	// console.log(22)
		// 	event.preventDefault();
		// 	recPause()
		// })
	}
}