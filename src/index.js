var hoistFlag = {
	bgStart:0,
	bgHeight:0,
	itemHeight:0,
	mainHeight:0,
	stop:false,
	destroy:false,
	flagHeight:0,
	flagMaxHeight:0,
	stepIndex: 0,
	recCallback: function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
		// bufferDuration+" / "+powerLevel;
		console.log(powerLevel)
		if(hoistFlag.stop || hoistFlag.destroy || powerLevel < 5){
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
				recPause && recPause()
				$(".step-dialog").show()
				$(".dialog1").show().siblings("img").hide()
			}else if(hoistFlag.stepIndex === 1 && Math.abs(hoistFlag.bgStart) >= hoistFlag.itemHeight * 1){
				hoistFlag.stepIndex = 2
				hoistFlag.stop = true
				recPause && recPause()
				$(".step-dialog").show()
				$(".dialog2").show().siblings("img").hide()
			}else if(hoistFlag.stepIndex === 2 && Math.abs(hoistFlag.bgStart) >= hoistFlag.itemHeight * 2){
				hoistFlag.stepIndex = 3
				hoistFlag.stop = true
				recPause && recPause()
				$(".step-dialog").show()
				$(".dialog3").show().siblings("img").hide()
			}else if(hoistFlag.stepIndex === 3 && Math.abs(hoistFlag.bgStart) >= hoistFlag.itemHeight * 3){
				hoistFlag.stepIndex = 4
				hoistFlag.destroy = true
				recPause && recPause()
				$(".step-dialog").show()
				$(".dialog4").show().siblings("img").hide()
			}else{
				var num = powerLevel < 40 ? 10 : powerLevel / 3
				hoistFlag.bgStart = hoistFlag.bgStart - num
				$(".starry-bg").css('bottom',hoistFlag.bgStart)
			}
		}
	},
	close(){
		$(".step-dialog").hide()
		hoistFlag.stop = false
	},
	start(){
		$(".loading-dialog").hide()
		$(".touch-btn").show()
		recOpen()
	},
	dataInit: function(){
		hoistFlag.bgHeight = $(".starry-bg").height()
		hoistFlag.itemHeight = hoistFlag.bgHeight / 4
		hoistFlag.mainHeight = $(".main").height()
		hoistFlag.flagHeight = hoistFlag.mainHeight / 2
		hoistFlag.flagMaxHeight = hoistFlag.mainHeight * 0.75
		$(".flag-wrap").css('height',hoistFlag.flagHeight)
	},
	init: function(){
		$(".progress").addClass("animate")
		setTimeout(() => {
			$(".progress").width("100%")
			$(".loading-btn").show()
		}, 3000);
		hoistFlag.dataInit()
		$('body').on('reSize',function(){
			hoistFlag.dataInit()
		})
		$(".touch-btn").on("touchstart",function(event){
			// console.log(111)
			event.preventDefault();
			recStart()
		})
		$(".touch-btn").on("touchend",function(event){
			// console.log(22)
			event.preventDefault();
			recPause()
		})
	}
}