//http://html5demo.braincracking.org v0.1 by MadsenFr
/*******************************************************************************
 * Librairie de détection automatique du support HTML5 et autres.
 * N'est pas infaillible, car il existe des faux positifs ainsi que des faux négatifs.
 ******************************************************************************/
/*
 * Détecte le support d'une balise instanciée, par reconnaissance du type d'objet créé :
 *  tag : nom de la balise à tester qui doit être instanciée au préalable dans le document.
 */
function isTagSupported(tag){
	eltTag = document.getElementsByTagName(tag)[0];
//	alert(tag+" :\n\n"+eltTag);	// Débug.
	if (eltTag == "[object HTMLUnknownElement]" || eltTag == null){
		document.write('<br/><br/><span id="'+tag+'"></span>');
 		eltMsg = document.getElementById(tag);
		eltMsg.innerHTML = "&lt;" + tag + "&gt; non supportée par votre navigateur !";
		eltMsg.className = "ko";
	}
}
/*
 * Détecte le support d'un attribut, par interrogation des attributs possibles pour une balise instanciée :
 *  tag : nom de la balise.
 *  attr : nom de l'attribut à tester.
 */
function isAttributeSupported(tag, attr){
	eltTag = document.getElementsByTagName(tag)[0];
//	for (i in eltTag) document.write("<br/>"+i);	// Débug.
	if (!(attr in eltTag)){
		document.write('<br/><br/><span id="'+attr+'"></span>');
 		eltMsg = document.getElementById(attr);
		eltMsg.innerHTML = attr + " non supporté par votre navigateur !";
		eltMsg.className = "ko";
	}
}
/*
 * Détecte le support d'un attribut spécifié dans une balise instanciée, par interrogation de la valeur de l'objet créé :
 *  id_name : id/name de la balise.
 *  attr : nom de l'attribut à tester.
 * [ref] : valeur à laquel l'attribut a été initialisé (valeur de retour attendu de "eval", utilisé pour <input>).
 */
function isAttributeSpecified(id_name, attr, ref){
	try{
		attrVal = eval("document.getElementById(\""+id_name+"\")."+attr);
	}catch(e){
		attrVal = eval("document.getElementsByName(\""+id_name+"\")[0]."+attr);
	}
//	alert(attr+"/"+id_name+" :\n\n"+attrVal);	// Débug.
	if (!ref) {
		sup = attr;
		ref = attrVal;
	}
	else
		sup = attr + "=" + ref;
	if (!attrVal || attrVal != ref){
		document.write('<br/><br/><span id="'+attr+ref+'"></span>');
 		eltMsg = document.getElementById(attr+ref);
		eltMsg.innerHTML = sup + " non supporté par votre navigateur !";
		eltMsg.className = "ko";
	}
}
/*
 * Détecte le support d'un item (objet ou methode) JavaScript :
 *  item : objet/fonction à tester.
 * [isFunc] : booleen pour indiquer si c'est une fonction (true) ou un object (false, par defaut).
 * [ref] : valeur à laquel l'objet à été initialisé (valeur de retour attendu de "eval", utilisé pour designMode).
 */
function isItemSupported(item, isFunc, ref){
	value = eval(item);
//	alert(item+" :\n\n"+value);		// Débug.
	if (!ref)
		ref = value;
	if (!value || value != ref){
		document.write('<br/><br/><span id="'+item+'"></span>');
 		eltMsg = document.getElementById(item);
		eltMsg.innerHTML = item.slice(item.lastIndexOf('.')+1) + (isFunc?"()":"")
			+ " non supporté" + (isFunc?"e":"") + " par votre navigateur !";
		eltMsg.className = "ko";
	}
}