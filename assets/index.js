window.onload = function() {
	const degree = 5;
	const correctSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑ ↑ ↓ ↓ ← → ← → B A
	const rawSequence = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];
	let keySequence = [];
	let angle = 0;

	const img = document.querySelector("#image");
	const keyboardSequence = document.querySelector("#keyboard-sequence");
	const pressedSpan = document.querySelector("#keyboard-sequence .font-black");
	const notPressedSpan = document.querySelector("#keyboard-sequence .font-white");

	// Listener
	document.addEventListener("keyup", logKey);

	// Initial Keyboard Sequence
	updateKeyboardSequence();

	function logKey(e) {
		keySequence.push(e.keyCode);
		checkSequence();
	}

	function checkSequence() {
		for (let i = 0; i < keySequence.length; i++) {
			if (keySequence[i] !== correctSequence[i]) {
				keySequence = keySequence.slice(-1) == correctSequence[0] ? keySequence.slice(-1) : [];
				break;
			}
		}

		if (keySequence.length == correctSequence.length) {
			keySequence = [];
			requestAnimationFrame(animate);
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
		pressedSpan.innerText = rawSequence.slice(0, keySequence.length).join('');
		notPressedSpan.innerText = rawSequence.slice(keySequence.length).join('');
	}
}