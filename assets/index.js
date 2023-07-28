window.onload = function() {
	// ====== Parameters ======
	const degree = 5;
	const correctSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	const rawSequence = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];
	let keySequence = [];
	let angle = 0;
	const buttonCodeMaps = {
	    buttonUp: 38,
	    buttonDown: 40,
	    buttonLeft: 37,
	    buttonRight: 39,
	    buttonA: 65,
	    buttonB: 66,
	};

	// ====== Elements ======
	const img = document.querySelector("#image");
	const pressedSpan = document.querySelector("#text-black");
	const notPressedSpan = document.querySelector("#text-white");
	const screenButtons = document.querySelectorAll('#screen-keyboard button');

	// ====== Listeners ======
	document.addEventListener("keyup", logKey);

	screenButtons.forEach(button => {
		button.addEventListener('click', () => {
			const keyupEvent = new KeyboardEvent('keyup', {keyCode: buttonCodeMaps[button.id]});
			document.dispatchEvent(keyupEvent);
		});
	});

	// ====== Initial Keyboard Sequence ======
	updateKeyboardSequence();

	// ====== Functions ======
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