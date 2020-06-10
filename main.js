String.prototype.isLastCharEqualTo = function(char) {
	return this.slice(-1) === char ? true : false;
}
String.prototype.removeLastChar = function() {
	return this.slice(0, this.length - 1);
}

function isEmpty(obj) {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}

function print(meteo) {
	for (const prop in meteo) {
		if (meteo.hasOwnProperty(prop)) {
			const p = document.createElement("p");
			text = document.createTextNode(`${prop} est à ${meteo[prop]}°C`);
			p.appendChild(text);
			document.body.appendChild(p);
		}
	}
}

function Verif() {
	this.meteo = {};

	let nb;
	let pair;
	let secured;
	let str;
	
	while (true) {
		pair = window.prompt(`Entrez le nom de la ville espacé de deux points ":" de sa température.
	Finissez par "!" pour verrouiller la température et la rendre immodifiable.
	Arrêter : "stop".`
		).trim();
		
		if (pair !== "stop") {
			let counter = 0;
			for (const char of pair) {

				if (char === ":") {
					counter++;
				}
			}

			if (counter === 1) {
				[str, nb] = pair.split(":");
				str = str.trim();
				nb = nb.trim();

				if (nb.substring(nb.length - 1) === "!") {
					nb = nb.slice(0, -1);
					nb = nb.trim();
					secured = true;
				}

				if (str && isNaN(str)) {
					str = str.charAt(0).toUpperCase() + str.slice(1);

					if (!isNaN(Number(nb))) {
						nb = Number(nb);

						if (!this.meteo[str]) {
							this.meteo[str] = nb;

							if (secured) {
								Object.defineProperty(this.meteo, str, {
									writable: false
								});
							}
						}
						else {
							alert(`Vous ne pouvez enregistrer qu'une température par ville`);
						}
					}
					else {
						alert(`Vous devez entrer une température en chiffre(s) après les deux points`);
					}
				}
				else {
					alert(`Vous devez entrer un nom de ville avant les deux points`);
				}
			}
			else if (counter === 0) {
				alert(`Vous devez espacer la ville et la température par le signe "deux points" (:)
					sur votre clavier en haut à droite de la touche "espace"`);
			}
			else if (counter > 1) {
				alert(`Les deux points (:) ne doivent être présents qu'une seule fois,
				entre le nom de la ville et sa température`);
			}
		}
		else if (Object.keys(this.meteo).length < 2) {
			alert(`Vous devez entrez au moins deux villes avec nom et température.
			Vous en avez entré ${Object.keys(this.meteo).length}`);
		}
		else {
			break;
		}
	}
}

const loaded = new Verif();

if(!isEmpty(loaded.meteo)) {
	print(loaded.meteo);
}
