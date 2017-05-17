//http://html5demo.braincracking.org v0.1 by MadsenFr
/*******************************************************************************
 * Librairie de d�tection automatique du support HTML5 et autres.
 * N'est pas infaillible, car il existe des faux positifs ainsi que des faux n�gatifs.
 ******************************************************************************/
/*
 * D�tecte le support d'une balise instanci�e, par reconnaissance du type d'objet cr�� :
 *  tag : nom de la balise � tester qui doit �tre instanci�e au pr�alable dans le document.
 */
function isTagSupported(tag){
	eltTag = document.getElementsByTagName(tag)[0];
//	alert(tag+" :\n\n"+eltTag);	// D�bug.
	if (eltTag == "[object HTMLUnknownElement]" || eltTag == null){
		document.write('<br/><br/><span id="'+tag+'"></span>');
 		eltMsg = document.getElementById(tag);
		eltMsg.innerHTML = "&lt;" + tag + "&gt; non support�e par votre navigateur !";
		eltMsg.className = "ko";
	}
}
/*
 * D�tecte le support d'un attribut, par interrogation des attributs possibles pour une balise instanci�e :
 *  tag : nom de la balise.
 *  attr : nom de l'attribut � tester.
 */
function isAttributeSupported(tag, attr){
	eltTag = document.getElementsByTagName(tag)[0];
//	for (i in eltTag) document.write("<br/>"+i);	// D�bug.
	if (!(attr in eltTag)){
		document.write('<br/><br/><span id="'+attr+'"></span>');
 		eltMsg = document.getElementById(attr);
		eltMsg.innerHTML = attr + " non support� par votre navigateur !";
		eltMsg.className = "ko";
	}
}
/*
 * D�tecte le support d'un attribut sp�cifi� dans une balise instanci�e, par interrogation de la valeur de l'objet cr�� :
 *  id_name : id/name de la balise.
 *  attr : nom de l'attribut � tester.
 * [ref] : valeur � laquel l'attribut a �t� initialis� (valeur de retour attendu de "eval", utilis� pour <input>).
 */
function isAttributeSpecified(id_name, attr, ref){
	try{
		attrVal = eval("document.getElementById(\""+id_name+"\")."+attr);
	}catch(e){
		attrVal = eval("document.getElementsByName(\""+id_name+"\")[0]."+attr);
	}
//	alert(attr+"/"+id_name+" :\n\n"+attrVal);	// D�bug.
	if (!ref) {
		sup = attr;
		ref = attrVal;
	}
	else
		sup = attr + "=" + ref;
	if (!attrVal || attrVal != ref){
		document.write('<br/><br/><span id="'+attr+ref+'"></span>');
 		eltMsg = document.getElementById(attr+ref);
		eltMsg.innerHTML = sup + " non support� par votre navigateur !";
		eltMsg.className = "ko";
	}
}
/*
 * D�tecte le support d'un item (objet ou methode) JavaScript :
 *  item : objet/fonction � tester.
 * [isFunc] : booleen pour indiquer si c'est une fonction (true) ou un object (false, par defaut).
 * [ref] : valeur � laquel l'objet � �t� initialis� (valeur de retour attendu de "eval", utilis� pour designMode).
 */
function isItemSupported(item, isFunc, ref){
	value = eval(item);
//	alert(item+" :\n\n"+value);		// D�bug.
	if (!ref)
		ref = value;
	if (!value || value != ref){
		document.write('<br/><br/><span id="'+item+'"></span>');
 		eltMsg = document.getElementById(item);
		eltMsg.innerHTML = item.slice(item.lastIndexOf('.')+1) + (isFunc?"()":"")
			+ " non support�" + (isFunc?"e":"") + " par votre navigateur !";
		eltMsg.className = "ko";
	}
}