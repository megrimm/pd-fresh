if type(window) ~= "userdata" then
  window = ofWindow()
end

local canvas = ofCanvas(this)
local clock = ofClock(this, "setup")
local videoPlayer = ofVideoPlayer()

local filmW = 840
local filmH = 640
local posX = 0
local posY = 0

function M.bang()
	ofWindow.addListener("setup", this)
	ofWindow.addListener("update", this)
	ofWindow.addListener("draw", this)
	ofWindow.addListener("exit", this)
	window:setPosition(50, 100)
	window:setSize(800 + 40, 600 + 40)
	if type(window) ~= "userdata" then
		window = ofWindow()
	end
	window:create();
		if ofWindow.exists then;
		clock:delay(0);
	end
end

function M.free()
	window:destroy()
	ofWindow.removeListener("setup", this)
	ofWindow.removeListener("update", this)
	ofWindow.removeListener("draw", this)
	ofWindow.removeListener("exit", this)
end

function M.setup()
	ofSetWindowTitle("Video Player")
	ofBackground(0, 0, 0, 255)
end

function M.open(path);
	videoPlayer:load(path);
	videoPlayer:setLoopState(OF_LOOP_NONE);
	videoPlayer:setPaused(true);
	ofWindow.addListener("setup", this)
	ofWindow.addListener("update", this)
	ofWindow.addListener("draw", this)
	ofWindow.addListener("exit", this)
end

function M.setSpeed(f)
	videoPlayer:setSpeed(f / 100)
end

function M.play()
	videoPlayer:play()
end

function M.stop()
	videoPlayer:setFrame(0)
	videoPlayer:setPaused(true)
end

function M.setPaused(f)
	if f == 1 then pause = true
	else pause = false
	end
	videoPlayer:setPaused(pause)
end

function M.setLoopState(f)
	if f == 0 then loop = OF_LOOP_NONE
	elseif f == 1 then loop = OF_LOOP_NORMAL
	elseif f == 2 then loop = OF_LOOP_PALINDROME
	else loop = OF_LOOP_NONE
	end
	videoPlayer:setLoopState(loop)
end

function M.setFrame(f)
	videoPlayer:setFrame(f)
end

function M.setPosition(f)
	videoPlayer:setPosition(f)
end

function M.setVolume(f)
	videoPlayer:setVolume(f / 100)
end

function M.update()
	videoPlayer:update()
end

function M.draw()
	ofSetHexColor(0xFFFFFF)
	function M.filmWidth(f)
		filmW = f
		return filmW
	end
	function M.filmHeight(f)
		filmH = f
		return filmH
	end
	function M.positionX(f)
		posX = f
		return posX
	end
	function M.positionY(f)
		posY = f
		return posY
	end
	videoPlayer:draw(posX, posY, filmW, filmH)
	local outputList = {}
	outputList[1] = videoPlayer:getWidth()
	outputList[2] = videoPlayer:getHeight()
	outputList[3] = videoPlayer:getTotalNumFrames()
	outputList[4] = videoPlayer:getPosition()
	outputList[5] = videoPlayer:getCurrentFrame()
	outputList[6] = videoPlayer:getIsMovieDone()
	return outputList
end

function M.exit()
	videoPlayer:close()
end
