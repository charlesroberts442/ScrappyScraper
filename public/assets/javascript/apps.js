/***********************************************************************
 * Copyright (c) 2017 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/
 
 function mouseOverWhurzIt(event)
 {
 	$('#app_text').val("WhurzIt is a simple personal inventory system.  Items \
and places are defined and then items can be assigned to places.  All WhurzIt data \
is encrypted and stored in the cloud so the inventory information is available \
from any device with an internet connection.");

 	$(this).css("cursor", "pointer");
 }

function mouseOverPcTran(event)
{
	$('#app_text').val("PC-Tran is a percent code translator.  \
URLs containing certain characters will display and link incorrectly unless \
those characters are percent-encoded.  More information on percent encoding \
can be found at Wikipedia's Percent-encoding Webpage.\n\nClick the PC-Tran logo \
to open the PC-Tran Webpage");
	$(this).css("cursor", "pointer");
}

function mouseOveriNeed2(event)
{
	$('#app_text').val("iNeed2 is a web application for PCs.  iNeed2 will provide independent todo \
lists for each and every directory where the iNeed2 Webpage is copied to and placed.\n\niNeed2 to do lists \
also offer extensive customizations of calculating priorities of tasks.  The final feature of iNeed2 \
todo lists is that they are encrypted.\n\nClick on the iNeed2 logo to read more about this application.");
	$(this).css("cursor", "pointer");

}

function mouseOverTopHeader(event)
{
	$('#app_text').val("Firefox and Chrome are the preferred browsers to view web pages on Charles.Roberts.org.  \
\n\nMove the mouse over the application to read information about that application; click on the application logo \
be taken taken to the application.\n\nMoving the cursor over the \"Web Applications\" Heading will display this \
message.");
}

 // A $( document ).ready() block.
$( document ).ready(function() {

    console.log( "ready!" );

$('#app_text').val("Firefox and Chrome are the preferred browsers to view web pages on Charles.Roberts.org.  \
\n\nMove the mouse over the application to read information about that application; click on the application logo \
be taken taken to the application.\n\nMoving the cursor over the \"Web Applications\" Heading will display this message.");

$("#pc-tran_logo").mouseover(mouseOverPcTran);
$("#iNeed2_logo").mouseover(mouseOveriNeed2);
$("#topHeader").mouseover(mouseOverTopHeader);
$("#WhurzIt_logo").mouseover(mouseOverWhurzIt);



    });