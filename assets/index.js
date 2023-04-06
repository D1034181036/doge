window.onload = function() {
	const degree = 5;
	const correctSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑ ↑ ↓ ↓ ← → ← → B A
	const rawSequence = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];
	const img = document.querySelector("#image");
	const keyboardSequence = document.querySelector("#keyboard-sequence");
	let keySequence = [];
	let angle = 0;

	document.addEventListener("keyup", logKey);
	updateKeyboardSequence();

	function logKey(e) {
		keySequence.push(e.keyCode);
		
		if (correctSequence.length > 0) {
			checkSequence();
		}
	}

	function checkSequence() {
		for (let i = 0; i < keySequence.length; i++) {
			if (keySequence[i] !== correctSequence[i]) {
				keySequence = keySequence.slice(-1) == correctSequence[0] ? keySequence.slice(-1) : [];
			}
		}

		if (keySequence.length == correctSequence.length) {
			requestAnimationFrame(animate);
			keySequence = [];
		}

		updateKeyboardSequence();
	}
	
	function animate() {
		angle = Math.abs(angle + degree) < 360 ? angle + degree : 0;
		img.style.transform = `rotate(${angle}deg)`;
		if (angle != 0) {
			requestAnimationFrame(animate);
		}
	}

	function updateKeyboardSequence() {
		keyboardSequence.innerHTML = "";

		const pressedSpan = document.createElement("span");
		pressedSpan.innerText = rawSequence.slice(0, keySequence.length).join('');
		pressedSpan.classList.add("font-black");
		keyboardSequence.appendChild(pressedSpan);
	
		const notPressedSpan = document.createElement("span");
		notPressedSpan.innerText = rawSequence.slice(keySequence.length).join('');
		notPressedSpan.classList.add("font-white");
		keyboardSequence.appendChild(notPressedSpan);
	}
}