const ball = document.getElementById('ball')
console.log(ball)

let key = 'nowhere';
zPos = 500;
ballY = 50;
let jumping = false;
const animate = () => {
	let ballStyle = window.getComputedStyle(ball)
	let ballLeft = ballStyle.getPropertyValue("left").replace("px","")
	let ballTop = ballStyle.getPropertyValue('top').replace('px','')
	let ballTransform = ballStyle.getPropertyValue('transform')
	switch(key){
		case 'ArrowRight':
			ball.style.left = (Number(ballLeft) + 1) + 'px'
			break
		case 'ArrowLeft':
			ball.style.left = (Number(ballLeft) - 1) + 'px'
			break
		case 'ArrowUp':
			//console.log(ballTransform)
			//ball.style.top = (Number(ballTop) + 1) + 'px'
			//let transformMatrix = ballTransform.toString().substring(ballTransform.toString().indexOf('(') + 1,ballTransform.toString().indexOf(')')).split(',').map(i=>Number(i))
			//console.log(transformMatrix)
			//Convert matrix to 4x4 if needed
			//let cssTransformMatrix;

			//if(transformMatrix.length <= 6){
			//	let newTransformMatrix = Object.assign([],transformMatrix)
			//	newTransformMatrix = [...transformMatrix.slice(0,3),0,...transformMatrix.slice(3,transformMatrix.length)]
			//	newTransformMatrix = [...newTransformMatrix.slice(0,6),0,...newTransformMatrix.slice(6,newTransformMatrix.length)]
			//	newTransformMatrix = [...newTransformMatrix,0 , 0 , 1, 0 ]
			//	newTransformMatrix = [...newTransformMatrix,0 , 0 , 0, 1 ]
			//	//console.log('New Transform Matrix:' + newTransformMatrix)
			//	newTransformMatrix[8] += 1
			//	cssTransformMatrix = "matrix3d(" + newTransformMatrix.reduce((a,b)=>`${a},${b}`) + ")"
			//	//console.log(transformMatrix)
				//console.log(cssTransformMatrix)
			//}else{
			//	transformMatrix[8] += 1
			//	cssTransformMatrix = "matrix3d(" + transformMatrix.reduce((a,b)=>`${a},${b}`) + ")"
			//	//console.log(cssTransformMatrix)
			//}
			console.log(ballTransform)
			ball.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50,${ballY}, ${zPos -= 1}, 1)`
			break
		case 'ArrowDown':	
			console.log(ballTransform)
			ball.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50,${ballY}, ${zPos += 1}, 1)`
			break
		case ' ':
			if(!jumping){
				jumping = true;
			}
			break;
		default:
			console.log("Not moving")
			break
	}
	
	if(jumping){
		console.log("JUMPING")
		ball.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50,${ballY-=1}, ${zPos}, 1)`
		setTimeout(()=>{
			jumping = false
		},1000)
	}

	if(!jumping && ballY < 50){
		ball.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0 ,50,${ballY+=1}, ${zPos}, 1)`
	}

	requestAnimationFrame(animate)
}

(()=>{
	animate()
})()

window.addEventListener('keydown',(e)=>{
	e.preventDefault()
	console.log(e.key)
	key = e.key
})

window.addEventListener('keyup',(e)=>{
	e.preventDefault()
	key = null
})
